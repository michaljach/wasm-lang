"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emitter_1 = require("./emitter");
const tokenizer_1 = require("./tokenizer/tokenizer");
const parser_1 = require("./parser/parser");
const compile = (src, env) => {
    const tokens = tokenizer_1.tokenize(src);
    const ast = parser_1.parse(tokens);
    const wasm = emitter_1.emitter(ast);
    return wasm;
};
exports.default = compile;
