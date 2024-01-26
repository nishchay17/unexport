import fs from 'fs';
import parser from '@babel/parser';

export default function getAST(filePath) {
    const code = fs.readFileSync(filePath, 'utf-8');
    return parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
}