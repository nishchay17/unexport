import { writeFile } from 'fs/promises';

export default async function createConfig() {
  console.log("Creating default config, with name 'upexport.json'");
  await writeFile(
    'upexport.json',
    JSON.stringify({
      $schema:
        'https://cdn.jsdelivr.net/gh/nishchay17/unexport@main/schema.json',
      exclude: ['./node_modules/**', 'build/**'],
      include: ['**/*.ts'],
    }),
  );
}
