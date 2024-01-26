import fs from 'fs/promises';

import { ConfigError } from '../errors/ConfigError.js';

async function fetchConfig() {
    try {
        const packageJsonContent = await fs.readFile("upexport.json", 'utf-8');
        return JSON.parse(packageJsonContent);
    } catch (error) {
        if (error.code === "ENOENT") {
            throw new ConfigError("upexport.json not found");
        }
        throw new ConfigError("Error reading upexport.json");
    }
}

function getConfig() {
    let config = null;
    return async () => {
        if (!config) {
            config = await fetchConfig();
        }
        return config;
    }
}

export default getConfig();