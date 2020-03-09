import binaryen, { Module } from 'binaryen';
import { FunctionDeclaration, Type, Expression, pickType, StatementType, Statement } from './types';
import tokenize from './tokenizer';

export const ast: FunctionDeclaration[] = [];
export const blocks: string[] = [];

const parseExpression = (wasmModule: Module, expression: Expression): { value: number; rawValue: number | string } => {
  switch (expression.type) {
    case StatementType.NumberLiteral: {
      const value = wasmModule.i32.const(Number(expression.body));
      return { value, rawValue: expression.body };
    }
    default:
      return { value: wasmModule.nop(), rawValue: -1 };
  }
};

const parseReturnStatement = (
  wasmModule: Module,
  returnType: Type,
  returnExpression: Statement,
): { moduleReturn: number; value?: number } => {
  if (returnType !== Type.VOID) {
    if (!returnExpression.body) {
      throw Error(`Function with return type ${returnType} expects a proper type return.`);
    }

    const { value } = parseExpression(wasmModule, returnExpression.body);
    return { moduleReturn: wasmModule.return(value), value };
  }

  return { moduleReturn: wasmModule.return() };
};

const parseFunctionDeclaration = (block: FunctionDeclaration, wasmModule: Module): void => {
  const returnStatement = block.body.filter(expression => expression.type === StatementType.ReturnExpression)[0];
  if (block.returnType !== Type.VOID && !returnStatement) {
    throw Error(`Function with return type ${block.returnType} expects a proper type return.`);
  }
  const { moduleReturn, value } = parseReturnStatement(wasmModule, block.returnType, returnStatement);
  const params = binaryen.createType([]);
  const func = wasmModule.addFunction(block.name, params, pickType(block.returnType), [], moduleReturn);

  if (value) {
    wasmModule.setDebugLocation(func, value, block.fileIndex, returnStatement.lineNumber, 1);
  }
  wasmModule.addFunctionExport(block.name, block.name);
};

const parseAbstractSyntaxTree = (wasmModule: Module): void => {
  ast.forEach((block: FunctionDeclaration) => {
    switch (block.type) {
      case StatementType.FunctionDeclaration:
        parseFunctionDeclaration(block, wasmModule);
        break;

      default:
        break;
    }
  });
};

const statementMatchers = [
  { functionDeclarationMatcher: /function (.*)\(\): (.*) {/g },
  { returnExpressionMatcher: /return (.*)/g },
  { closingBlockMatcher: /}/g },
];

const parse = (wasmModule: Module, fileIndex: number, source: string): void => {
  source.split('\n').forEach((line, lineNumber) => {
    statementMatchers.forEach(matcher => {
      const [type, regexp] = Object.entries(matcher)[0];

      if (regexp) {
        const match = [...line.matchAll(regexp)][0];
        if (match) {
          tokenize(lineNumber, fileIndex, type, match);
        }
      } else {
        throw Error('Matcher does not exist.');
      }
    });
  });
  parseAbstractSyntaxTree(wasmModule);
};

export default parse;
