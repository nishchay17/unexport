import _traverse from "@babel/traverse";
const traverse = _traverse.default;

import getAST from "./getAST.js";

export default function getImportExport(filePath) {
    const ast = getAST(filePath);
    const exports = new Set();
    const imports = new Set();

    traverse(ast, {
        ExportNamedDeclaration(path) {
            if (path.node.declaration) {
                const declaration = path.node.declaration;
                if (declaration.id) {
                    exports.add(declaration.id.name);
                } else if (declaration.declarations) {
                    declaration.declarations.forEach((decl) => {
                        exports.add(decl.id.name);
                    });
                }
            } else if (path.node.specifiers) {
                path.node.specifiers.forEach((specifier) => {
                    exports.add(specifier?.exported?.name);
                });
            }
        },
        ExportDefaultDeclaration(path) {
            if (path.node.declaration) {
                const declaration = path.node.declaration;
                if (declaration.id) {
                    exports.add(declaration.id.name);
                } else if (declaration.name) {
                    exports.add(declaration.name);
                }
            }
        },
        ImportDeclaration(path) {
            const importInfo = {
                source: path.node.source.value,
                specifiers: [],
            };
            path.node.specifiers.forEach((specifier) => {
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
        file: filePath,
        imports: Array.from(imports),
        exports: Array.from(exports),
    };
}