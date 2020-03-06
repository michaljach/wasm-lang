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
  type: string;
  lineNumber: number;
  body: number;
}

export interface ReturnExpression {
  returnType: Type;
  lineNumber: number;
  body: Expression;
}

export interface FunctionDeclaration {
  type: 'functionDeclaration';
  returnExpression: ReturnExpression;
  fileIndex: number;
  name: string;
  lineNumber: number;
  body: Expression[];
}
