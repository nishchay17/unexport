import fs from 'fs';
import * as parser from '@babel/parser';

export default function getAST(filePath: string): any {
  const code = fs.readFileSync(filePath, 'utf-8');
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
}
