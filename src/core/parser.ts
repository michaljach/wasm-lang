import binaryen, { Module } from 'binaryen';
import { FunctionDeclaration, Type, ReturnExpression, Expression } from './types';

const ast: FunctionDeclaration[] = [];
const blocks: string[] = [];

const functionDeclarationMatcher = /function (.*)\(\): (.*) {/g;
const returnExpressionMatcher = /return (.*)/g;
const numberLiteralMatcher = /^[0-9]+/g;
const closingBlockMatcher = /}/g;

const pickType = (type: Type): number => {
  switch (type) {
    case Type.INT:
      return binaryen.i32;
    default:
      return binaryen.none;
  }
};

const parseExpression = (wasmModule: Module, expression: Expression): { value: number; rawValue: number } => {
  switch (expression.type) {
    case 'numberLiteral': {
      const value = wasmModule.i32.const(expression.body);
      return { value, rawValue: expression.body };
    }
    default:
      return { value: wasmModule.nop(), rawValue: 0 };
  }
};

const parseReturnStatement = (
  wasmModule: Module,
  returnType: Type,
  returnExpression: ReturnExpression,
): { moduleReturn: number; value?: number } => {
  if (returnType !== Type.VOID) {
    if (!returnExpression.body) {
      throw Error(`Function with type ${returnType} expects a return.`);
    }

    const { value } = parseExpression(wasmModule, returnExpression.body);
    return { moduleReturn: wasmModule.return(value), value };
  }

  return { moduleReturn: wasmModule.return() };
};

const parseFunctionDeclaration = (block: FunctionDeclaration, wasmModule: Module): void => {
  const { moduleReturn, value } = parseReturnStatement(wasmModule, block.returnType, block.returnExpression);
  const params = binaryen.createType([]);
  const func = wasmModule.addFunction(block.name, params, pickType(block.returnType), [], moduleReturn);

  if (value) {
    wasmModule.setDebugLocation(func, value, block.fileIndex, block.returnExpression.lineNumber, 1);
  }
  wasmModule.addFunctionExport(block.name, block.name);
};

const parseAbstractSyntaxTree = (wasmModule: Module): void => {
  ast.forEach((block: FunctionDeclaration) => {
    switch (block.type) {
      case 'functionDeclaration':
        parseFunctionDeclaration(block, wasmModule);
        break;

      default:
        break;
    }
  });
};

const parse = (module: Module, fileIndex: number, source: string): void => {
  source.split('\n').forEach((line, lineNumber) => {
    const functionDeclarationMatch = [...line.matchAll(functionDeclarationMatcher)];
    const returnExpressionMatch = [...line.matchAll(returnExpressionMatcher)];
    const closingBlockMatch = [...line.matchAll(closingBlockMatcher)];

    if (functionDeclarationMatch.length) {
      const [, name, returnType] = functionDeclarationMatch[0];
      blocks.push('functionDeclaration');
      ast.push({
        type: 'functionDeclaration',
        name,
        fileIndex,
        returnType: returnType as Type,
        returnExpression: {
          type: 'returnExpression',
          lineNumber: lineNumber + 1,
          body: {
            lineNumber: -1,
            body: -1,
            type: '',
          },
        },
        lineNumber: lineNumber + 1,
        body: [],
      });
    } else if (returnExpressionMatch.length) {
      const match = returnExpressionMatch[0][1].match(numberLiteralMatcher);
      if (match) {
        const latestBlock = [...ast].pop();
        if (latestBlock && latestBlock.type === 'functionDeclaration') {
          latestBlock.returnExpression = {
            type: 'returnExpression',
            lineNumber: lineNumber + 1,
            body: { type: 'numberLiteral', body: Number(match[0]), lineNumber: lineNumber + 1 },
          };
        }
      }
    } else if (closingBlockMatch.length) {
      if (blocks.length) {
        blocks.pop();
      } else {
        throw Error('Syntax error in closing block');
      }
    }
  });
  parseAbstractSyntaxTree(module);
};

export default parse;
