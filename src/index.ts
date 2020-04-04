#!/usr/bin/env node

import { getArgs, read, save, Args } from './core/io';
import log, { MessageCode } from './utils/logger';
import tokenize from './core/tokenizer';
import parse from './core/parser';
import emit from './core/emitter';

const compile = (args: Args = getArgs()): void => {
  const source = read(args._[0]);
  const tokens = tokenize(source);
  const ast = parse(tokens);
  const { sourceMap, textFormat, binary } = emit(ast, args);

  if (sourceMap) {
    save(`${args.o}.map`, sourceMap);
    log(MessageCode.SOURCEMAPS_COMPILED);
  }

  if (args.t) {
    save(`${args.t}`, textFormat);
  }

  save(`${args.o}`, binary);
  log(MessageCode.COMPILED_SUCCESSFULLY);
};

if (require.main === module) {
  compile();
}

export default compile;
