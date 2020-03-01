"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = __importStar(require("chalk"));
var MessageCode;
(function (MessageCode) {
    MessageCode[MessageCode["NOT_VALID"] = 0] = "NOT_VALID";
    MessageCode[MessageCode["COMPILED_SUCCESSFULLY"] = 1] = "COMPILED_SUCCESSFULLY";
    MessageCode[MessageCode["SOURCEMAPS_COMPILED"] = 2] = "SOURCEMAPS_COMPILED";
})(MessageCode = exports.MessageCode || (exports.MessageCode = {}));
var messages = (_a = {},
    _a[MessageCode.NOT_VALID] = chalk.red('Error :: Module is not valid'),
    _a[MessageCode.SOURCEMAPS_COMPILED] = '📍 Source maps generated successfully!',
    _a[MessageCode.COMPILED_SUCCESSFULLY] = chalk.green('🚀 Compiled successfully!'),
    _a);
exports.log = function (errorCode) {
    var statement = messages[errorCode];
    console.log(statement); // eslint-disable-line no-console
};
