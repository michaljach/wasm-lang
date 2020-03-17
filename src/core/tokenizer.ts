import { StatementType, Type } from './types';
import { ast, blocks } from './parser';

const expressionMatchers = [{ numberLiteralMatcher: /^[0-9]+/g }, { stringLiteralMatcher: /'(.*)'/g }];

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
      expressionMatchers.forEach(matcher => {
        const [expressionType, regexp] = Object.entries(matcher)[0];

        if (regexp) {
          const test = match[1].match(regexp);

          if (test) {
            const latestBlock = [...ast].pop();
            if (latestBlock && latestBlock.type === StatementType.FunctionDeclaration) {
              switch (expressionType) {
                case 'numberLiteralMatcher':
                  latestBlock.body.push({
                    type: StatementType.ReturnExpression,
                    lineNumber: lineNumber + 1,
                    body: { type: StatementType.NumberLiteral, body: Number(test[0]), lineNumber: lineNumber + 1 },
                  });
                  break;

                case 'stringLiteralMatcher':
                  latestBlock.body.push({
                    type: StatementType.ReturnExpression,
                    lineNumber: lineNumber + 1,
                    body: { type: StatementType.StringLiteral, body: String(test[0]), lineNumber: lineNumber + 1 },
                  });
                  break;

                default:
                  break;
              }
            }
          }
        }
      });
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
