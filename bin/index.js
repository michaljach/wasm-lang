const fs = require('fs');
const binaryen = require('binaryen');
const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .alias('s', 'sourceMaps')
    .nargs('sourceMaps', 0)
    .describe('sourceMaps', 'generates wasm sourceMap files for debugging')
    .alias('f', 'file')
    .nargs('file', 1)
    .describe('file', 'path to source file to be compiled')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2020').argv;
const utils = require('./utils');
// START OF TEMPORARY WASM CODE
var wasmModule = new binaryen.Module();
var fileIndex = wasmModule.addDebugInfoFileName(utils.getFileName(argv.file));
var left = wasmModule.local.get(0, binaryen.i32);
var right = wasmModule.local.get(1, binaryen.i32);
var add = wasmModule.i32.add(left, right);
var ret = wasmModule.return(add);
var ii = binaryen.createType([binaryen.i32, binaryen.i32]);
var func = wasmModule.addFunction('adder', ii, binaryen.i32, [], ret);
wasmModule.setDebugLocation(func, left, fileIndex, 1, 1);
wasmModule.addFunctionExport('adder', 'adder');
wasmModule.optimize();
const sourceMapFileUrl = argv.sourceMaps ? 'http://localhost:5000/index.wasm.map' : null;
var binary = wasmModule.emitBinary(sourceMapFileUrl);
// END OF TEMPORARY WASM CODE
if (!wasmModule.validate()) {
    console.log('Error :: Module is not valid');
}
wasmModule.dispose();
fs.writeFile('./dummy/index.wasm', binary.binary, function (err) {
    if (err)
        throw err;
    console.log('Info :: Compiled successfully!');
    console.log(`Info :: Binary size: ${binary.binary.length} bytes.`);
    if (argv.sourceMaps) {
        fs.writeFile('./dummy/index.wasm.map', binary.sourceMap, function (err) {
            if (err)
                throw err;
            console.log('Info :: Source maps generated successfully!');
        });
    }
});
