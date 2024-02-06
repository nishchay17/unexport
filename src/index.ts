import print from './print';
import createConfig from './utils/createConfig';
import { findFilesMatchingRegex } from './utils/getFiles';
import { getImportExport } from './utils/getImportExport';
import getInstalledPackages from './utils/getPackageDependencies';
import getUnusedExports from './utils/getUnusedExports';

export async function start(onlyPackages?: boolean, onlyFile?: boolean) {
  try {
    const files = await findFilesMatchingRegex();
    const fileImportExportData = await Promise.all(
      files.map(async (it) => await getImportExport(it)),
    );
    const installedPackages = await getInstalledPackages();
    const resExport = await getUnusedExports(
      fileImportExportData,
      installedPackages,
    );
    print(resExport, { onlyPackages, onlyFile });
  } catch (error) {
    console.log(error);
  }
}

export async function init() {
  createConfig();
}
