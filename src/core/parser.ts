import binaryen from 'binaryen';
import path from 'path';
import { log, MessageCode } from '../utils/logger';
import { Args } from './io';

export interface Binary {
  binary: Uint8Array;
  sourceMap: string | null;
}

export const parse = (argv: Args): Binary => {
  // START OF TEMPORARY WASM GEN CODE
  const wasmModule = new binaryen.Module();
  const fileIndex = wasmModule.addDebugInfoFileName(path.basename(`${argv.f}`));
  const left = wasmModule.local.get(0, binaryen.i32);
  const right = wasmModule.local.get(1, binaryen.i32);
  const add = wasmModule.i32.add(left, right);
  const ret = wasmModule.return(add);
  const ii = binaryen.createType([binaryen.i32, binaryen.i32]);
  const func = wasmModule.addFunction('adder', ii, binaryen.i32, [], ret);
  wasmModule.setDebugLocation(func, left, fileIndex, 1, 1);
  wasmModule.addFunctionExport('adder', 'adder');
  // END OF TEMPORARY WASM GEN CODE

  wasmModule.optimize();

  const sourceMapFileUrl = argv.s ? 'http://localhost:5000/index.wasm.map' : null;

  if (!wasmModule.validate()) {
    log(MessageCode.NOT_VALID);
  }

  return wasmModule.emitBinary(sourceMapFileUrl);
};
