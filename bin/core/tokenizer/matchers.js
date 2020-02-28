"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keywords_1 = require("./keywords");
const regexMatcher = (regex, type) => (input, index) => {
    const match = input.substring(index).match(regex);
    return (match && {
        type,
        value: match[0],
    });
};
exports.matchers = [
    regexMatcher('^[.0-9]+', 'number'),
    regexMatcher(`^${keywords_1.keywords.join('|')}`, 'keyword'),
    regexMatcher('^\\s+', 'whitespace'),
];
