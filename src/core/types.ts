import binaryen from 'binaryen';

export interface Binary {
  binary: Uint8Array;
  sourceMap: string | null;
  textFormat: string;
}

export enum Type {
  VOID = 'void',
  INT = 'int',
}

export interface Expression {
  type: Line.NumberLiteral | Line.Nop;
  lineNumber: number;
  body: number;
}

export interface ReturnExpression {
  type: Line.ReturnExpression;
  lineNumber: number;
  body: Expression;
}

export interface FunctionDeclaration {
  type: Line.FunctionDeclaration;
  returnExpression: ReturnExpression;
  returnType: Type;
  fileIndex: number;
  name: string;
  lineNumber: number;
  body: Expression[];
}

export enum Line {
  FunctionDeclaration = 'functionDeclaration',
  ReturnExpression = 'returnExpression',
  NumberLiteral = 'numberLiteral',
  Nop = '',
}

export const pickType = (type: Type): number => {
  switch (type) {
    case Type.INT:
      return binaryen.i32;
    default:
      return binaryen.none;
  }
};
