"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchers_1 = require("./matchers");
const error_1 = require("./error");
const locationForIndex = (input, index) => ({
    char: index - input.lastIndexOf('\n', index) - 1,
    line: input.substring(0, index).split('\n').length - 1,
});
exports.tokenize = (input) => {
    const tokens = [];
    let index = 0;
    while (index < input.length) {
        const location = locationForIndex(input, index);
        const matches = matchers_1.matchers.map(m => m(input, index)).filter(f => f);
        if (matches.length > 0) {
            const match = matches[0];
            if (match.type !== 'whitespace') {
                tokens.push({ ...match, ...location });
            }
            index += match.value.length;
        }
        else {
            throw new error_1.TokenizerError(`Unexpected token '${input.substring(index, index + 1)}' on line ${location.line + 1}, character ${location.char}`, index);
        }
    }
    return tokens;
};
