import { StatementType, Type } from './types';
import { ast, blocks } from './parser';

const tokenize = (lineNumber: number, fileIndex: number, type: string, match: RegExpMatchArray): void => {
  switch (type) {
    case 'functionDeclarationMatcher': {
      const [, name, returnType] = match;
      blocks.push(StatementType.FunctionDeclaration);
      ast.push({
        type: StatementType.FunctionDeclaration,
        name,
        fileIndex,
        returnType: returnType as Type,
        lineNumber: lineNumber + 1,
        body: [],
      });
      break;
    }
    case 'returnExpressionMatcher': {
      const test = match[1].match(/^[0-9]+/g);

      if (test) {
        const latestBlock = [...ast].pop();
        if (latestBlock && latestBlock.type === StatementType.FunctionDeclaration) {
          latestBlock.body.push({
            type: StatementType.ReturnExpression,
            lineNumber: lineNumber + 1,
            body: { type: StatementType.NumberLiteral, body: Number(test[0]), lineNumber: lineNumber + 1 },
          });
        } else {
          throw Error('Syntax error on return');
        }
      }
      break;
    }
    case 'closingBlockMatcher':
      if (blocks.length) {
        blocks.pop();
        break;
      }

      throw Error('Syntax error in closing block');
    default:
      break;
  }
};

export default tokenize;
