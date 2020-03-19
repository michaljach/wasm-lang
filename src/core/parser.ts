import { StatementType, BlockType, Node } from './types';

const parse = (tokens: Node[]): Node[] => {
  return tokens.map(
    (elem, index, data): Node => {
      switch (elem?.type) {
        case StatementType.ReturnStatement: {
          const prev = data[index - 1];
          if (prev) {
            if (prev.type === BlockType.FunctionDeclaration) {
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
    },
  );
};

export default parse;
