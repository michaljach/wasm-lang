"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("./encoding");
const flatten = (arr) => [].concat.apply([], arr);
// https://webassembly.github.io/spec/core/binary/modules.html#sections
var Section;
(function (Section) {
    Section[Section["custom"] = 0] = "custom";
    Section[Section["type"] = 1] = "type";
    Section[Section["import"] = 2] = "import";
    Section[Section["func"] = 3] = "func";
    Section[Section["table"] = 4] = "table";
    Section[Section["memory"] = 5] = "memory";
    Section[Section["global"] = 6] = "global";
    Section[Section["export"] = 7] = "export";
    Section[Section["start"] = 8] = "start";
    Section[Section["element"] = 9] = "element";
    Section[Section["code"] = 10] = "code";
    Section[Section["data"] = 11] = "data";
})(Section || (Section = {}));
// https://webassembly.github.io/spec/core/binary/types.html
var Valtype;
(function (Valtype) {
    Valtype[Valtype["i32"] = 127] = "i32";
    Valtype[Valtype["f32"] = 125] = "f32";
})(Valtype || (Valtype = {}));
// https://webassembly.github.io/spec/core/binary/instructions.html
var Opcodes;
(function (Opcodes) {
    Opcodes[Opcodes["end"] = 11] = "end";
    Opcodes[Opcodes["call"] = 16] = "call";
    Opcodes[Opcodes["get_local"] = 32] = "get_local";
    Opcodes[Opcodes["f32_const"] = 67] = "f32_const";
    Opcodes[Opcodes["f32_add"] = 146] = "f32_add";
})(Opcodes || (Opcodes = {}));
// http://webassembly.github.io/spec/core/binary/modules.html#export-section
var ExportType;
(function (ExportType) {
    ExportType[ExportType["func"] = 0] = "func";
    ExportType[ExportType["table"] = 1] = "table";
    ExportType[ExportType["mem"] = 2] = "mem";
    ExportType[ExportType["global"] = 3] = "global";
})(ExportType || (ExportType = {}));
// http://webassembly.github.io/spec/core/binary/types.html#function-types
const functionType = 0x60;
const emptyArray = 0x0;
// https://webassembly.github.io/spec/core/binary/modules.html#binary-module
const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
const moduleVersion = [0x01, 0x00, 0x00, 0x00];
// https://webassembly.github.io/spec/core/binary/conventions.html#binary-vec
// Vectors are encoded with their length followed by their element sequence
const encodeVector = (data) => [encoding_1.unsignedLEB128(data.length), ...flatten(data)];
// https://webassembly.github.io/spec/core/binary/modules.html#sections
// sections are encoded by their type followed by their vector contents
const createSection = (sectionType, data) => [sectionType, ...encodeVector(data)];
const codeFromAst = (ast) => {
    const code = [];
    const emitExpression = (node) => {
        switch (node.type) {
            case 'numberLiteral':
                code.push(Opcodes.f32_const);
                code.push(...encoding_1.ieee754(node.value));
                break;
        }
    };
    ast.forEach(statement => {
        switch (statement.type) {
            case 'printStatement':
                emitExpression(statement.expression);
                code.push(Opcodes.call);
                code.push(...encoding_1.unsignedLEB128(0));
                break;
        }
    });
    return code;
};
exports.emitter = (ast) => {
    // Function types are vectors of parameters and return types. Currently
    // WebAssembly only supports single return values
    const voidVoidType = [functionType, emptyArray, emptyArray];
    const floatVoidType = [functionType, ...encodeVector([Valtype.f32]), emptyArray];
    // the type section is a vector of function types
    const typeSection = createSection(Section.type, encodeVector([voidVoidType, floatVoidType]));
    // the function section is a vector of type indices that indicate the type of each function
    // in the code section
    const funcSection = createSection(Section.func, encodeVector([0x00 /* type index */]));
    // the import section is a vector of imported functions
    const printFunctionImport = [
        ...encoding_1.encodeString('env'),
        ...encoding_1.encodeString('print'),
        ExportType.func,
        0x01,
    ];
    const importSection = createSection(Section.import, encodeVector([printFunctionImport]));
    // the export section is a vector of exported functions
    const exportSection = createSection(Section.export, encodeVector([[...encoding_1.encodeString('run'), ExportType.func, 0x01 /* function index */]]));
    // the code section contains vectors of functions
    const functionBody = encodeVector([emptyArray /** locals */, ...codeFromAst(ast), Opcodes.end]);
    const codeSection = createSection(Section.code, encodeVector([functionBody]));
    return Uint8Array.from([
        ...magicModuleHeader,
        ...moduleVersion,
        ...typeSection,
        ...importSection,
        ...funcSection,
        ...exportSection,
        ...codeSection,
    ]);
};
