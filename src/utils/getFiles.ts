import { glob } from 'glob';

import { ConfigError } from '../errors/ConfigError';
import { getConfig } from './getConfig';

export async function findFilesMatchingRegex() {
  try {
    const config = await getConfig()();
    return await glob(config.include, { ignore: config.exclude });
  } catch (error) {
    if (!(error instanceof ConfigError)) {
      console.error(
        'Error while searching for files:',
        (error as Error)?.message,
      );
    }
    throw error;
  }
}
