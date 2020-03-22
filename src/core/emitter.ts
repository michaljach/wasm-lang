import binaryen, { Module } from 'binaryen';
import path from 'path';
import log, { MessageCode } from '../utils/logger';
import { Args } from './io';
import {
  Binary,
  FunctionBlock,
  StatementType,
  Expression,
  Type,
  pickType,
  ExpressionType,
  BlockType,
  Node,
} from './types';

const parseExpression = (wasmModule: Module, expression: Expression): { value: number; rawValue: number | string } => {
  switch (expression.type) {
    case ExpressionType.NumberLiteral: {
      const value = wasmModule.i32.const(Number(expression.body));
      return { value, rawValue: expression.body };
    }
    default:
      return { value: wasmModule.nop(), rawValue: -1 };
  }
};

const parseReturnStatement = (
  wasmModule: Module,
  returnExpression: Expression,
): { moduleReturn: number; value?: number } => {
  const { value } = parseExpression(wasmModule, returnExpression);
  return { moduleReturn: wasmModule.return(value), value };
};

const parseFunctionDeclaration = (block: FunctionBlock, wasmModule: Module, fileIndex: number): void => {
  const returnStatement = block.body.filter(expression => expression.type === StatementType.ReturnStatement)[0];
  if (block.returnType !== Type.VOID && !returnStatement) {
    throw Error(`Function with return type '${block.returnType}' expects return statement.`);
  }
  const { moduleReturn, value } = parseReturnStatement(wasmModule, returnStatement.body);
  const blockScoped = wasmModule.block(`${block.name}.block`, [moduleReturn]);
  const params = binaryen.createType([]);
  const func = wasmModule.addFunction(block.name, params, pickType(block.returnType), [], blockScoped);

  if (value) {
    wasmModule.setDebugLocation(func, value, fileIndex, returnStatement.lineNumber, 1);
  }

  wasmModule.addFunctionExport(block.name, block.name);
};

const parseAst = (wasmModule: Module, fileIndex: number, ast: Node[]): void => {
  ast.forEach(node => {
    switch (node?.type) {
      case BlockType.FunctionDeclaration:
        parseFunctionDeclaration(node, wasmModule, fileIndex);
        break;

      default:
        break;
    }
  });
};

const emit = (ast: Node[], argv: Args): Binary => {
  const wasmModule = new binaryen.Module();
  const basenameInput = path.basename(`${argv._[0]}`);
  const basenameOutput = path.basename(`${argv.o}`);
  const fileIndex = wasmModule.addDebugInfoFileName(basenameInput);
  const sourceMapFileUrl = argv.s ? `http://localhost:5000/${basenameOutput}.map` : null;

  parseAst(wasmModule, fileIndex, ast);

  if (!wasmModule.validate()) {
    log(MessageCode.NOT_VALID);
  }

  wasmModule.optimize();

  return { textFormat: wasmModule.emitText(), ...wasmModule.emitBinary(sourceMapFileUrl) };
};

export default emit;
