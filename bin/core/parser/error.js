"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParserError extends Error {
    constructor(message, token) {
        super(message);
        this.token = token;
    }
}
exports.ParserError = ParserError;
