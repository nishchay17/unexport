import fs from 'fs/promises';

import config, { clearConfig } from '../src/utils/getConfig';

describe('config related tests', () => {
  beforeAll(() => {
    jest.mock('fs/promises');
    const mockReadFile = jest.spyOn(fs, 'readFile');
    mockReadFile.mockImplementation(() =>
      Promise.resolve('{"include": [], "exclude": []}'),
    );
  });

  afterAll(() => {
    clearConfig();
  });

  it('config should have read correct file', async () => {
    await config();
    expect(fs.readFile).toHaveBeenCalled();
  });
  it('config should have correct properties', async () => {
    const _config = await config();
    expect(_config).toHaveProperty('include');
    expect(_config).toHaveProperty('exclude');
  });
  it('config should use cache', async () => {
    await config();
    await config();
    expect(fs.readFile).toHaveBeenCalledTimes(1);
  });
});
