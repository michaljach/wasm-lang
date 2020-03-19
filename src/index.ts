#!/usr/bin/env node

import { argv, read, save } from './core/io';
import log, { MessageCode } from './utils/logger';
import tokenize from './core/tokenizer';
import parse from './core/parser';
import emit from './core/emitter';

const source = read(argv.f);
const tokens = tokenize(source);
const ast = parse(tokens);
const { sourceMap, textFormat, binary } = emit(ast, argv);

if (sourceMap) {
  save(`${argv.o}.map`, sourceMap);
  log(MessageCode.SOURCEMAPS_COMPILED);
}

if (textFormat) {
  save(`${argv.t}`, textFormat);
}

save(`${argv.o}`, binary);
log(MessageCode.COMPILED_SUCCESSFULLY);
