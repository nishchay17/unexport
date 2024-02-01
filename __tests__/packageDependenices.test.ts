import fs from 'fs/promises';

import getInstalledPackages, {
  clearPackage,
} from '../src/utils/getPackageDependencies';

describe('getInstalledPackages related tests', () => {
  beforeAll(() => {
    jest.mock('fs/promises');
    const mockReadFile = jest.spyOn(fs, 'readFile');
    mockReadFile.mockImplementation(() => Promise.resolve('{}'));
  });

  afterAll(() => {
    clearPackage();
  });

  it('config should use cache', async () => {
    await getInstalledPackages();
    await getInstalledPackages();
    expect(fs.readFile).toHaveBeenCalledTimes(1);
  });
});
