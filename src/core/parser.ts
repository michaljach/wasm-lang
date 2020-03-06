import binaryen from 'binaryen';
import path from 'path';
import { log, MessageCode } from '../utils/logger';
import { Args, read } from './io';
import tokenize from './tokenizer';

export interface Binary {
  binary: Uint8Array;
  sourceMap: string | null;
  textFormat: string;
}

export const parse = (argv: Args): Binary => {
  const wasmModule = new binaryen.Module();
  const basenameInput = path.basename(`${argv.f}`);
  const basenameOutput = path.basename(`${argv.o}`);
  const fileIndex = wasmModule.addDebugInfoFileName(basenameInput);
  const sourceMapFileUrl = argv.s ? `http://localhost:5000/${basenameOutput}.map` : null;

  tokenize(wasmModule, fileIndex, read(`${argv.f}`));

  if (!wasmModule.validate()) {
    log(MessageCode.NOT_VALID);
  }

  wasmModule.optimize();

  return { textFormat: wasmModule.emitText(), ...wasmModule.emitBinary(sourceMapFileUrl) };
};
