import findFilesMatchingRegex from './utils/getFiles.js';
import getImportExport from './utils/getImportExport.js';

try {
    const files = await findFilesMatchingRegex();
    files.forEach(async (it) => {
        const dep = await getImportExport(it);
        console.log(JSON.stringify(dep));
    })
} catch (error) {
    console.log(error);
}
