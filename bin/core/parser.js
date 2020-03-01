"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var binaryen_1 = __importDefault(require("binaryen"));
var path_1 = __importDefault(require("path"));
var logger_1 = require("../utils/logger");
exports.parse = function (argv) {
    // START OF TEMPORARY WASM GEN CODE
    var wasmModule = new binaryen_1.default.Module();
    var fileIndex = wasmModule.addDebugInfoFileName(path_1.default.basename("" + argv.f));
    var left = wasmModule.local.get(0, binaryen_1.default.i32);
    var right = wasmModule.local.get(1, binaryen_1.default.i32);
    var add = wasmModule.i32.add(left, right);
    var ret = wasmModule.return(add);
    var ii = binaryen_1.default.createType([binaryen_1.default.i32, binaryen_1.default.i32]);
    var func = wasmModule.addFunction('adder', ii, binaryen_1.default.i32, [], ret);
    wasmModule.setDebugLocation(func, left, fileIndex, 1, 1);
    wasmModule.addFunctionExport('adder', 'adder');
    // END OF TEMPORARY WASM GEN CODE
    wasmModule.optimize();
    var sourceMapFileUrl = argv.s ? 'http://localhost:5000/index.wasm.map' : null;
    if (!wasmModule.validate()) {
        logger_1.log(logger_1.MessageCode.NOT_VALID);
    }
    return wasmModule.emitBinary(sourceMapFileUrl);
};
