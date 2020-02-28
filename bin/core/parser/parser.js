"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
exports.parse = (tokens) => {
    const tokenIterator = tokens[Symbol.iterator]();
    let currentToken = tokenIterator.next().value;
    let nextToken = tokenIterator.next().value;
    const eatToken = (value) => {
        if (value && value !== currentToken.value) {
            throw new error_1.ParserError(`Unexpected token value, expected ${value}, received ${currentToken.value}`, currentToken);
        }
        currentToken = nextToken;
        nextToken = tokenIterator.next().value;
    };
    const parsePrintStatement = () => {
        eatToken('print');
        return {
            type: 'printStatement',
            expression: parseExpression(),
        };
    };
    const parseNumberLiteral = () => {
        const node = {
            type: 'numberLiteral',
            value: Number(currentToken.value),
        };
        eatToken();
        return node;
    };
    const parseExpression = () => {
        switch (currentToken.type) {
            case 'number':
                return parseNumberLiteral();
            default:
                eatToken();
                throw new error_1.ParserError(`Unexpected token type ${currentToken.type}`, currentToken);
        }
    };
    const parseStatement = () => {
        if (currentToken.type === 'keyword') {
            switch (currentToken.value) {
                case 'print':
                    return parsePrintStatement();
                default:
                    eatToken();
                    throw new error_1.ParserError(`Unexpected token type ${currentToken.type}`, currentToken);
            }
        }
    };
    const nodes = [];
    while (currentToken) {
        nodes.push(parseStatement());
    }
    return nodes;
};
