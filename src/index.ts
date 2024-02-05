import createConfig from './utils/createConfig';
import { findFilesMatchingRegex } from './utils/getFiles';
import { getImportExport } from './utils/getImportExport';
import getUnusedExports from './utils/getUnusedExports';

export async function start() {
  try {
    const files: string[] = await findFilesMatchingRegex();
    const res = await Promise.all(
      files.map(async (it) => await getImportExport(it)),
    );
    const resExport = await getUnusedExports(res);
    console.log(resExport);
  } catch (error) {
    console.log(error);
  }
}

export async function init() {
  createConfig();
}
