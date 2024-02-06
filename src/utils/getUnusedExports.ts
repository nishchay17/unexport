import { ImportExportData } from '../type';

function getUnusedInstalledPackage(
  importExportData: ImportExportData[],
  installedPackages: string[],
) {
  const imports = importExportData.map((it) => it.source);
  return installedPackages.filter((it) => !imports.includes(it));
}

function getUnusedFileExports(
  allExports: ImportExportData[],
  allImports: ImportExportData[],
) {
  const usedExports = {};

  allImports.forEach((importStatement) => {
    const { source, type, name } = importStatement;
    const matchingExport = allExports.find(
      (exportItem) =>
        exportItem.source === source &&
        exportItem.type === type &&
        (exportItem.type === 'default' ? true : exportItem.name === name),
    );
    if (matchingExport) {
      usedExports[matchingExport.file] = usedExports[matchingExport.file] || [];
      usedExports[matchingExport.file].push(matchingExport.name);
    }
  });

  return allExports
    .map((exportItem) => {
      if (
        !usedExports[exportItem.file] ||
        !usedExports[exportItem.file].includes(exportItem.name)
      ) {
        return {
          name: exportItem.name,
          file: exportItem.file,
          type: exportItem.type,
        };
      }
      return null;
    })
    .filter((it) => it !== null);
}

export default async function getUnusedExports(
  importExportData: {
    file: string;
    imports: ImportExportData[];
    exports: ImportExportData[];
  }[],
  installedPackages: string[],
) {
  const allImports = importExportData.map((it) => it.imports).flat();
  const allExports = importExportData.map((it) => it.exports).flat();

  const unusedInstalledPackages = getUnusedInstalledPackage(
    allImports,
    installedPackages,
  );

  const allImportsWithoutInstalledPackages = allImports.filter(
    (it) => !installedPackages.includes(it.source),
  );
  const unusedExports = getUnusedFileExports(
    allExports,
    allImportsWithoutInstalledPackages,
  );

  return {
    unusedInstalledPackages,
    unusedExports,
  };
}
