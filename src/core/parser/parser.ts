import { Token } from '../tokenizer/tokenizer';
import { ParserError } from './error';
import { SourceNode } from 'source-map';

interface ParserStep<T extends ProgramNode> {
  (): T;
}

export const parse = (tokens: Token[]) => {
  const tokenIterator = tokens[Symbol.iterator]();
  let currentToken: Token = tokenIterator.next().value;
  let nextToken = tokenIterator.next().value;

  const eatToken = (value?: string) => {
    if (value && value !== currentToken.value) {
      throw new ParserError(`Unexpected token value, expected ${value}, received ${currentToken.value}`, currentToken);
    }
    currentToken = nextToken;
    nextToken = tokenIterator.next().value;
  };

  const parsePrintStatement: ParserStep<PrintStatementNode> = () => {
    eatToken('print');
    return {
      type: 'printStatement',
      expression: parseExpression(),
    };
  };

  const parseNumberLiteral: ParserStep<NumberLiteralNode> = () => {
    const node: NumberLiteralNode = {
      type: 'numberLiteral',
      value: Number(currentToken.value),
    };

    eatToken();
    return node;
  };

  const parseExpression: ParserStep<ExpressionNode> = () => {
    switch (currentToken.type) {
      case 'number':
        return parseNumberLiteral();
      default:
        eatToken();
        throw new ParserError(`Unexpected token type ${currentToken.type}`, currentToken);
    }
  };

  const parseStatement: ParserStep<StatementNode> = () => {
    if (currentToken.type === 'keyword') {
      switch (currentToken.value) {
        case 'print':
          return parsePrintStatement();
        default:
          eatToken();
          throw new ParserError(`Unexpected token type ${currentToken.type}`, currentToken);
      }
    }
  };

  const nodes: StatementNode[] = [];

  while (currentToken) {
    nodes.push(parseStatement());
  }

  return nodes;
};
