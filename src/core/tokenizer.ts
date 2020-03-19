import { FunctionDeclaration, Type, StatementType, Statement, Token } from './types';

const statementMatchers = [
  { type: 'functionDeclarationMatcher', regexp: /function (.*)\(\): (.*) {/ },
  { type: 'returnExpressionMatcher', regexp: /return (.*)/ },
  { type: 'closingBlockMatcher', regexp: /}/ },
];

export const blocks: string[] = [];

const expressionMatchers = [
  { type: 'numberLiteralMatcher', regexp: /^[0-9]+/g },
  { type: 'stringLiteralMatcher', regexp: /'(.*)'/g },
];

const parseToken = ({ type, match, lineNumber }: Token): FunctionDeclaration | Statement | null => {
  switch (type) {
    case 'functionDeclarationMatcher': {
      const [, name, returnType] = match;

      blocks.push(StatementType.FunctionDeclaration);
      return {
        type: StatementType.FunctionDeclaration,
        name,
        returnType: returnType as Type,
        lineNumber: lineNumber + 1,
        body: [],
      };
    }
    case 'returnExpressionMatcher': {
      const value = expressionMatchers
        .flatMap(matcher => ({ match: match[1].match(matcher.regexp), type: matcher.type }))
        .filter(elem => elem.match)[0];

      return {
        type: StatementType.ReturnExpression,
        lineNumber: lineNumber + 1,
        body: { type: StatementType.NumberLiteral, body: Number(value.match![0]), lineNumber: lineNumber + 1 },
      };
    }
    case 'closingBlockMatcher':
      if (blocks.length) {
        blocks.pop();
        return null;
      }

      throw Error('Syntax error in closing block');
    default:
      return null;
  }
};

const tokenize = (source: string): (FunctionDeclaration | Statement | null)[] => {
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
