import { readFile } from 'fs/promises';

import { ConfigError } from '../errors/ConfigError';

async function fetchConfig() {
  try {
    const packageJsonContent = await readFile('upexport.json', 'utf-8');
    console.log(packageJsonContent);
    return JSON.parse(packageJsonContent);
  } catch (error) {
    console.log(error);
    if ((error as Error).message.includes('ENOENT')) {
      throw new ConfigError('upexport.json not found');
    }
    throw new ConfigError('Error reading upexport.json');
  }
}

function _getConfig() {
  let config!: { [key: string]: string | string[] };
  return [
    async () => {
      if (!config) {
        config = await fetchConfig();
      }
      return config;
    },
    () => (config = undefined),
  ];
}

const [getConfig, clearConfig] = _getConfig();
export { clearConfig };
export default getConfig;
