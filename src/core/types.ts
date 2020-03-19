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

export interface Token {
  lineNumber: number;
  type: string;
  match: RegExpMatchArray;
}

export interface Expression {
  type: StatementType.NumberLiteral | StatementType.StringLiteral | StatementType.Nop;
  lineNumber: number;
  body: number | string;
}

export interface Statement {
  type: StatementType.ReturnExpression;
  lineNumber: number;
  body: Expression;
}

export interface FunctionDeclaration {
  type: StatementType.FunctionDeclaration;
  returnType: Type;
  name: string;
  lineNumber: number;
  body: Statement[];
}

export enum StatementType {
  FunctionDeclaration = 'functionDeclaration',
  ReturnExpression = 'returnExpression',
  NumberLiteral = 'numberLiteral',
  StringLiteral = 'stringLiteral',
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
