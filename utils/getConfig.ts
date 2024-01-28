const { readFile } = require("fs/promises");

const { ConfigError } = require("../errors/ConfigError");

async function fetchConfig() {
  try {
    const packageJsonContent = await readFile("upexport.json", "utf-8");
    return JSON.parse(packageJsonContent);
  } catch (error) {
    if ((error as Error).message.includes("ENOENT")) {
      throw new ConfigError("upexport.json not found");
    }
    throw new ConfigError("Error reading upexport.json");
  }
}

function getConfig() {
  let config!: { [key: string]: any };
  return async () => {
    if (!config) {
      config = await fetchConfig();
    }
    return config;
  };
}

module.exports = getConfig();
