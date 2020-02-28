"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenizerError extends Error {
    constructor(message, index) {
        super(message);
        this.index = index;
    }
}
exports.TokenizerError = TokenizerError;
