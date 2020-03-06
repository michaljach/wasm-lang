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
  type: 'returnExpression';
  lineNumber: number;
  body: Expression;
}

export interface FunctionDeclaration {
  type: 'functionDeclaration';
  returnExpression: ReturnExpression;
  returnType: Type;
  fileIndex: number;
  name: string;
  lineNumber: number;
  body: Expression[];
}
