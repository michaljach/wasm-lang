import { emitter } from './emitter';
import { tokenize } from './tokenizer/tokenizer';
import { parse } from './parser/parser';

export const runtime = async (src: string, env: any): Promise<any> => {
  const tokens = tokenize(src);
  const ast = parse(tokens);
  const wasm = emitter(ast);
  const result = await WebAssembly.instantiate(wasm, { env });
  return result.instance.exports.run;
};
