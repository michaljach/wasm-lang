import { Type, StatementType, Token, BlockType, ExpressionType, Node } from './types';

const statementMatchers = [
  { type: BlockType.FunctionDeclaration, regexp: /function (.*)\(\): (.*) {/ },
  { type: StatementType.ReturnStatement, regexp: /return (.*)/ },
  { type: BlockType.Closure, regexp: /}/ },
];

const expressionMatchers = [{ type: ExpressionType.NumberLiteral, regexp: /^[0-9]+/g }];

export const blocks: string[] = [];

const parseToken = ({ type, match, lineNumber }: Token): Node => {
  switch (type) {
    case BlockType.FunctionDeclaration: {
      const [, name, returnType] = match;

      blocks.push(BlockType.FunctionDeclaration);
      return {
        type: BlockType.FunctionDeclaration,
        name,
        returnType: returnType as Type,
        lineNumber: lineNumber + 1,
        body: [],
      };
    }
    case StatementType.ReturnStatement: {
      const value = expressionMatchers
        .flatMap(matcher => ({ match: match[1].match(matcher.regexp), type: matcher.type }))
        .filter(elem => elem.match)[0];

      return {
        type: StatementType.ReturnStatement,
        lineNumber: lineNumber + 1,
        body: { type: ExpressionType.NumberLiteral, body: Number(value.match![0]), lineNumber: lineNumber + 1 },
      };
    }
    case BlockType.Closure:
      if (blocks.length) {
        blocks.pop();
        return null;
      }

      throw Error('Syntax error in closing block');
    default:
      return null;
  }
};

const tokenize = (source: string): Node[] => {
  return source
    .split('\n')
    .flatMap((line, lineNumber) =>
      statementMatchers.map(matcher => ({ type: matcher.type, lineNumber, match: line.match(matcher.regexp) })),
    )
    .filter(elem => elem.match !== null)
    .map(elem => ({ lineNumber: elem.lineNumber, type: elem.type, match: elem.match! }))
    .map(token => parseToken(token));
};

export default tokenize;
