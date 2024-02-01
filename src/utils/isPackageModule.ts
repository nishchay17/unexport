import getInstalledPackages from './getPackageDependencies';

export async function isPackageModule(pkg: string): Promise<boolean> {
  const packages = await getInstalledPackages();
  return packages.includes(pkg);
}
