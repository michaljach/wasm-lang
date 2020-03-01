#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_1 = require("./core/io");
var parser_1 = require("./core/parser");
var logger_1 = require("./utils/logger");
var binary = parser_1.parse(io_1.argv);
if (binary.sourceMap) {
    io_1.save(io_1.argv.o + ".map", binary.sourceMap);
    logger_1.log(logger_1.MessageCode.SOURCEMAPS_COMPILED);
}
io_1.save("" + io_1.argv.o, binary.binary);
logger_1.log(logger_1.MessageCode.COMPILED_SUCCESSFULLY);
