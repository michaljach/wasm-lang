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
  type: StatementType.NumberLiteral | StatementType.Nop;
  lineNumber: number;
  body: number;
}

export interface Statement {
  type: StatementType.ReturnExpression;
  lineNumber: number;
  body: Expression;
}

export interface FunctionDeclaration {
  type: StatementType.FunctionDeclaration;
  returnType: Type;
  fileIndex: number;
  name: string;
  lineNumber: number;
  body: Statement[];
}

export enum StatementType {
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
