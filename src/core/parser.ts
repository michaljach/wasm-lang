import { StatementType, FunctionDeclaration, Statement } from './types';

const parse = (tokens: (FunctionDeclaration | Statement | null)[]): any => {
  return tokens.map((elem, index, data): any => {
    switch (elem?.type) {
      case StatementType.ReturnExpression: {
        const prev = data[index - 1];
        if (prev) {
          if (prev.type === StatementType.FunctionDeclaration) {
            prev.body.push(elem);
            return null;
          }
          throw Error('Unexp');
        } else {
          throw Error('Unexp');
        }
      }
      default:
        return elem;
    }
  });
};

export default parse;
