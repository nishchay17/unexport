import { readFile } from 'fs/promises';

import { ConfigError } from '../errors/ConfigError';

async function fetchConfig() {
  try {
    const packageJsonContent = await readFile('upexport.json', 'utf-8');
    return JSON.parse(packageJsonContent);
  } catch (error) {
    if ((error as Error).message.includes('ENOENT')) {
      console.error('upexport.json not found');
      process.exit(1);
    }
    throw new ConfigError('Error reading upexport.json');
  }
}

function getConfig() {
  let config!: { [key: string]: string | string[] };
  return async () => {
    if (!config) {
      config = await fetchConfig();
    }
    return config;
  };
}

export default getConfig();
