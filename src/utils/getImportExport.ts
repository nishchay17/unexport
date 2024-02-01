import traverse from '@babel/traverse';

import getAST from './getAST';

export function getImportExport(filePath: string) {
  const ast = getAST(filePath);
  const exports = new Set();
  const imports = new Set();

  traverse(ast, {
    ExportNamedDeclaration(path: any) {
      if (path.node.declaration) {
        const declaration = path.node.declaration;
        if (declaration.id) {
          exports.add({
            localName: declaration.id.name,
            type: 'named',
          });
        } else if (declaration.declarations) {
          declaration.declarations.forEach((decl: any) => {
            exports.add({
              localName: decl.id.name,
              type: 'named',
            });
          });
        }
      } else if (path.node.specifiers) {
        path.node.specifiers.forEach((specifier: any) => {
          exports.add({
            localName: specifier.exported.name,
            type: 'named',
          });
        });
      }
    },
    ExportDefaultDeclaration(path: any) {
      if (path.node.declaration) {
        const declaration = path.node.declaration;
        if (declaration.id) {
          exports.add({
            localName: declaration.id.name,
            type: 'default',
          });
        } else if (declaration.name) {
          exports.add({
            localName: declaration.name,
            type: 'default',
          });
        }
      }
    },
    ImportDeclaration(path: any) {
      const importInfo: {
        source: string;
        specifiers: {
          type: string;
          localName: string;
          importedName?: string;
        }[];
      } = {
        source: path.node.source.value,
        specifiers: [],
      };
      path.node.specifiers.forEach((specifier: any) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          importInfo.specifiers.push({
            type: 'default',
            localName: specifier.local.name,
          });
        } else if (specifier.type === 'ImportNamespaceSpecifier') {
          importInfo.specifiers.push({
            type: 'namespace',
            localName: specifier.local.name,
          });
        } else if (specifier.type === 'ImportSpecifier') {
          importInfo.specifiers.push({
            type: 'named',
            importedName: specifier.imported.name,
            localName: specifier.local.name,
          });
        }
      });
      imports.add(importInfo);
    },
  });

  return {
    file: filePath.replace(/\\/g, '/'),
    imports: Array.from(imports),
    exports: Array.from(exports),
  };
}
