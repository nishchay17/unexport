const { glob } = require("glob");

const { ConfigError } = require("../errors/ConfigError");
const getConfig = require("./getConfig");

async function findFilesMatchingRegex() {
  try {
    const config = await getConfig();
    return await glob(config.include, { ignore: config.exclude });
  } catch (error) {
    if (!(error instanceof ConfigError)) {
      console.error(
        "Error while searching for files:",
        (error as Error)?.message
      );
    }
    throw error;
  }
}

module.exports = findFilesMatchingRegex;
