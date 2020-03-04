import binaryen, { Module } from 'binaryen';

export enum Type {
  VOID = 'void',
  INT = 'int',
}

const matchers = [/function (.*)\(\): (.*) {\n+(.*|^})*\n+}/g];

const pickType = (type: Type): number => {
  switch (type) {
    case Type.INT:
      return binaryen.i64;
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

export const tokenize = (module: Module, fileIndex: number, source: string): void => {
  matchers.forEach(matcher => {
    const matches = [...source.matchAll(matcher)];

    matches.forEach(match => {
      const [full, name, returnType, body] = match;
      parseFunctionDeclaration(module, fileIndex, full, name, returnType as Type, body);
    });
  });
};
