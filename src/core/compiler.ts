import { emitter } from './emitter';
import { tokenize } from './tokenizer/tokenizer';
import { parse } from './parser/parser';

const compile = (src: string, env: any): Uint8Array => {
  const tokens = tokenize(src);
  const ast = parse(tokens);
  const wasm = emitter(ast);
  return wasm;
};

export default compile;
