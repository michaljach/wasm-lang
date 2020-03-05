import binaryen, { Module } from 'binaryen';

export enum Type {
  VOID = 'void',
  INT = 'int',
}

const functionDeclarationMatcher = /function (.*)\(\): (.*) {/g;

const pickType = (type: Type): number => {
  switch (type) {
    case Type.INT:
      return binaryen.i32;
    default:
      return binaryen.none;
  }
};

export const parseFunctionDeclaration = (
  module: Module,
  lineNumber: number,
  fileIndex: number,
  name: string,
  returnType: Type,
  body: string,
): void => {
  const returnFunction = module.return();
  const params = binaryen.createType([]);
  const func = module.addFunction(name, params, pickType(returnType), [], returnFunction);
  module.setDebugLocation(func, returnFunction, fileIndex, lineNumber + 1, 1);
  module.addFunctionExport(name, name);
};

export const tokenize = (module: Module, fileIndex: number, source: string): void => {
  source.split('\n').forEach((line, lineNumber) => {
    const matches = [...line.matchAll(functionDeclarationMatcher)];
    if (matches.length) {
      const [, name, returnType, body] = matches[0];
      parseFunctionDeclaration(module, lineNumber, fileIndex, name, returnType as Type, body);
    }
  });
};
