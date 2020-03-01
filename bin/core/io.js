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
exports.save = function (fileName, buffer) {
    fs.writeFileSync(fileName, buffer);
};
