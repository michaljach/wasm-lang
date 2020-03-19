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
  type: ExpressionType;
  lineNumber: number;
  body: number | string;
}

export interface Statement {
  type: StatementType;
  lineNumber: number;
  body: Expression;
}

export interface Block {
  type: BlockType;
  lineNumber: number;
  body: Statement[];
}

export interface FunctionBlock extends Block {
  type: BlockType.FunctionDeclaration;
  returnType: Type;
  name: string;
}

export type Node = FunctionBlock | Statement | null;

export enum BlockType {
  FunctionDeclaration = 'functionDeclaration',
  Closure = 'closure',
}

export enum StatementType {
  ReturnStatement = 'returnStatement',
}

export enum ExpressionType {
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
