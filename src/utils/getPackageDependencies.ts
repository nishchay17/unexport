import fs from 'fs/promises';

import { PackageError } from '../errors/PackageError';

async function helper(packageJsonPath) {
  try {
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    return Object.keys(packageJson.dependencies ?? {});
  } catch (error) {
    if ((error as Error).message.includes('ENOENT')) {
      throw new PackageError('Package.json not found');
    }
    throw new PackageError('Error reading package.json');
  }
}

function _getInstalledPackages(packageJsonPath = 'package.json') {
  let pkg!: string[];
  return [
    async () => {
      if (!pkg) {
        pkg = await helper(packageJsonPath);
      }
      return pkg;
    },
    () => (pkg = undefined),
  ];
}

const [getInstalledPackages, clearPackage] = _getInstalledPackages();

export { clearPackage };
export default getInstalledPackages;
