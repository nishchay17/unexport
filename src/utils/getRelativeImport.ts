import path from 'path';

export default function resolveImportPath(
  currentFilePath: string,
  importPath: string,
): string {
  const absolutePath = path.resolve(path.dirname(currentFilePath), importPath);
  const relativePath = path.relative(process.cwd(), absolutePath);
  return relativePath.replace(/\\/g, '/');
}
