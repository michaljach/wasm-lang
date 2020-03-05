import binaryen, { Module } from 'binaryen';

export enum Type {
  VOID = 'void',
  INT = 'int',
}

interface FunctionDeclaration {
  type: 'functionDeclaration';
  return: {
    returnType: Type;
    expression: any;
  };
  fileIndex: number;
  name: string;
  lineNumber: number;
  body: any[];
}

const ast: any = [];
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

const parseReturnStatement = (
  wasmModule: Module,
  fileIndex: number,
  lineNumber: number,
  returnExpression: any,
): { moduleReturn: number; value?: number } => {
  if (returnExpression.returnType !== Type.VOID) {
    if (!returnExpression.expression) {
      throw Error(`Function with type ${returnExpression.returnType} expects a return.`);
    }
    const { body } = returnExpression.expression;
    switch (body.type) {
      case 'numberLiteral': {
        const value = wasmModule.i32.const(body.value);
        return { moduleReturn: wasmModule.return(value), value };
      }
      default:
        return { moduleReturn: wasmModule.return() };
    }
  } else {
    return { moduleReturn: wasmModule.return() };
  }
};

const parseFunctionDeclaration = (block: FunctionDeclaration, wasmModule: Module): void => {
  const { moduleReturn, value } = parseReturnStatement(wasmModule, block.fileIndex, block.lineNumber, block.return);
  const params = binaryen.createType([]);
  const func = wasmModule.addFunction(block.name, params, pickType(block.return.returnType), [], moduleReturn);
  if (value) {
    wasmModule.setDebugLocation(func, value, block.fileIndex, block.return.expression.lineNumber, 1);
  }
  wasmModule.addFunctionExport(block.name, block.name);
};

const parseAbstractSyntaxTree = (wasmModule: Module): any => {
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

export const tokenize = (module: Module, fileIndex: number, source: string): void => {
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
        return: {
          returnType,
        },
        lineNumber: lineNumber + 1,
        body: [],
      });
    } else if (returnExpressionMatch.length) {
      const match = returnExpressionMatch[0][1].match(numberLiteralMatcher);
      if (match) {
        if ([...ast].pop().type === 'functionDeclaration') {
          [...ast].pop().return.expression = {
            type: 'returnExpression',
            lineNumber: lineNumber + 1,
            body: { type: 'numberLiteral', value: Number(match[0]) },
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
