import { glob } from 'glob';

import getConfig from './getConfig';

export async function findFilesMatchingRegex() {
  try {
    const config = await getConfig();
    return await glob(config.include, { ignore: config.exclude });
  } catch (error) {
    console.log((error as Error).message);
    process.exit(1);
  }
}
