import binaryen, { Module } from 'binaryen';

export enum Type {
  VOID = 'void',
}

const pickType = (type: Type): number => {
  switch (type) {
    case Type.VOID:
      return binaryen.none;
    default:
      return binaryen.none;
  }
};

export const parseFunctionDeclaration = (
  module: Module,
  fileIndex: number,
  full: string,
  name: string,
  returnType: Type,
  body: string,
): void => {
  const ret = module.return();
  const params = binaryen.createType([]);
  const func = module.addFunction(name, params, pickType(returnType), [], ret);
  module.setDebugLocation(func, ret, fileIndex, 1, 1);
  module.addFunctionExport(name, name);
};

export const tokenize = (module: Module, fileIndex: number, source: string): any => {
  const functionDeclaration = source.match(/function (.*)\(\): (.*) {((.|\n)*)}/);
  if (functionDeclaration) {
    const [full, name, returnType, body] = functionDeclaration;
    parseFunctionDeclaration(module, fileIndex, full, name, returnType as Type, body);
  } else {
    throw Error('Syntax error near function declaration');
  }
};
