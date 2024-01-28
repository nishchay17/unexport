const findFilesMatchingRegex = require("./utils/getFiles");
const getImportExport = require("./utils/getImportExport");

(async () => {
  try {
    const files: string[] = await findFilesMatchingRegex();
    files.forEach(async (it) => {
      const dep = await getImportExport(it);
      console.log(JSON.stringify(dep));
    });
  } catch (error) {
    console.log(error);
  }
})();
