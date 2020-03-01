"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var yargs = __importStar(require("yargs"));
exports.argv = yargs.options({
    f: { type: 'string', demandOption: true, alias: 'file', nargs: 1 },
    o: { type: 'string', demandOption: true, alias: 'output', nargs: 1 },
    s: { type: 'boolean', alias: 'sourceMaps' },
}).argv;
// export const { argv }: { argv: Args } = yargs
//   .usage('Usage: $0 <command> [options]')
//   .alias('s', 'sourceMaps')
//   .alias('o', 'output')
//   .nargs('sourceMaps', 0)
//   .nargs('output', 1)
//   .describe('sourceMaps', 'generates wasm sourceMap files for debugging')
//   .describe('output', 'path for output file')
//   .alias('f', 'file')
//   .nargs('file', 1)
//   .describe('file', 'path to source file to be compiled')
//   .demandOption(['f', 'o'])
//   .help('h')
//   .alias('h', 'help')
//   .epilog('copyright 2020');
exports.save = function (fileName, buffer) {
    fs.writeFileSync(fileName, buffer);
};
