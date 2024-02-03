import { findFilesMatchingRegex } from './utils/getFiles';
import { getImportExport } from './utils/getImportExport';
import getUnusedExports from './utils/getUnusedExports';

export async function start() {
  try {
    const files: string[] = await findFilesMatchingRegex();
    const res = await Promise.all(
      files.map(async (it) => await getImportExport(it)),
    );
    console.log(JSON.stringify(getUnusedExports(res)));
  } catch (error) {
    console.log(error);
  }
}
