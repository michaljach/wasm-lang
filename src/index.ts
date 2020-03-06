#!/usr/bin/env node

import { argv, save } from './core/io';
import { parse } from './core/parser';
import { log, MessageCode } from './utils/logger';

const binary = parse(argv);

if (binary.sourceMap) {
  save(`${argv.o}.map`, binary.sourceMap);
  log(MessageCode.SOURCEMAPS_COMPILED);
}

if (argv.t) {
  save(`${argv.t}`, binary.textFormat);
}

save(`${argv.o}`, binary.binary);
log(MessageCode.COMPILED_SUCCESSFULLY);
