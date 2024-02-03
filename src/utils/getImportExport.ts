import traverse from '@babel/traverse';

import getAST from './getAST';
import getInstalledPackages from './getPackageDependencies';
import resolveImportPath from './getRelativeImport';
import { isNodeCoreModule } from './isNodeCoreModule';
import { ImportExportData } from '../type';

export async function getImportExport(filePath: string) {
  const ast = getAST(filePath);
  const installedPackages = await getInstalledPackages();

  const exports = new Set<string>();
  const imports = new Set<string>();

  traverse(ast, {
    ExportNamedDeclaration(path: any) {
      if (path.node.declaration) {
        const declaration = path.node.declaration;
        if (declaration.id) {
          exports.add(
            JSON.stringify({
              name: declaration.id.name,
              type: 'named',
              source: filePath.replace(/\\/g, '/'),
            }),
          );
        } else if (declaration.declarations) {
          declaration.declarations.forEach((decl: any) => {
            exports.add(
              JSON.stringify({
                name: decl.id.name,
                type: 'named',
                source: filePath.replace(/\\/g, '/'),
              }),
            );
          });
        }
      } else if (path.node.specifiers) {
        path.node.specifiers.forEach((specifier: any) => {
          exports.add(
            JSON.stringify({
              name: specifier.exported.name,
              type: 'named',
              source: filePath.replace(/\\/g, '/'),
            }),
          );
        });
      }
    },
    ExportDefaultDeclaration(path: any) {
      if (path.node.declaration) {
        const declaration = path.node.declaration;
        if (declaration.id) {
          exports.add(
            JSON.stringify({
              name: declaration.id.name,
              type: 'default',
              source: filePath.replace(/\\/g, '/'),
            }),
          );
        } else if (declaration.name) {
          exports.add(
            JSON.stringify({
              name: declaration.name,
              type: 'default',
              source: filePath.replace(/\\/g, '/'),
            }),
          );
        }
      }
    },
    ImportDeclaration(path: any) {
      if (isNodeCoreModule(path.node.source.value)) {
        return;
      }
      const source = installedPackages.includes(path.node.source.value)
        ? path.node.source.value
        : resolveImportPath(filePath, path.node.source.value);
      let importInfo: ImportExportData;

      path.node.specifiers.forEach((specifier: any) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          importInfo = {
            type: 'default',
            name: specifier.local.name,
            source,
          };
        } else if (specifier.type === 'ImportNamespaceSpecifier') {
          importInfo = {
            type: 'namespace',
            name: specifier.local.name,
            source,
          };
        } else if (specifier.type === 'ImportSpecifier') {
          importInfo = {
            type: 'named',
            name: specifier.imported.name,
            source,
          };
        }
      });
      imports.add(JSON.stringify(importInfo));
    },
  });

  return {
    file: filePath.replace(/\\/g, '/'),
    imports: Array.from(imports).map((it) =>
      JSON.parse(it),
    ) as ImportExportData[],
    exports: Array.from(exports).map((it) =>
      JSON.parse(it),
    ) as ImportExportData[],
  };
}
