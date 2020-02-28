const fs = require('fs');
import compile from './core/compiler';

const source = fs.readFileSync(process.argv[2], 'utf8');
const bytes = compile(source, { print: console.log });
console.log(bytes);
