"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const compiler_1 = require("./core/compiler");
const source = fs.readFileSync(process.argv[2], 'utf8');
const bytes = compiler_1.default(source, { print: console.log });
console.log(bytes);
