import { findFilesMatchingRegex } from './utils/getFiles';
import { getImportExport } from './utils/getImportExport';

(async () => {
  try {
    const files: string[] = await findFilesMatchingRegex();
    const res = await Promise.all(
      files.map(async (it) => await getImportExport(it)),
    );
    console.log(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
})();
