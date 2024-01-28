const fs = require("fs/promises");

const { PackageError } = require("../errors/PackageError");

async function getInstalledPackages(packageJsonPath = "package.json") {
  try {
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);
    return Object.keys(packageJson.dependencies ?? {});
  } catch (error) {
    if ((error as Error).message.includes("ENOENT")) {
      throw new PackageError("Package.json not found");
    }
    throw new PackageError("Error reading package.json");
  }
}

module.exports = getInstalledPackages;
