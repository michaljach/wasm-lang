![Build](https://github.com/rapidlang/compiler/workflows/Build/badge.svg) [![npm version](https://img.shields.io/npm/v/@rapid-lang/compiler.svg?style=flat)](https://www.npmjs.com/package/@rapid-lang/compiler) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rapidlang/compiler/blob/master/LICENSE)

# RAPID compiler

Compiles `RAPID` sources to [WebAssembly](https://webassembly.org/) `wasm` binary module file. It can dynamically create and output sourcemaps for debugging.

### Install

`npm i @rapid-lang/compiler -g`

### API

```
Commands:
  rapid-compiler source  Path to source file to be compiled

Options:
  -o, --output      Path to result file to be saved          [string] [required]
  -h, --help        Show help                                          [boolean]
  -v, --version     Show version number                                [boolean]
  -s, --sourceMaps  Generate sourceMaps for debugging                  [boolean]
  -t, --textFormat  Generate WebAssembly Text Format (wat) file         [string]
  -p, --port        Sourcemaps default port                             [number]
```

Example:

`rapid-compiler dummy/test.rapid -o dummy/test.wasm -s`

### Language Documentation

Full documentation is available on https://rapid-lang.org page.

### Development

Run `yarn debug` with parameters to watch, compile and debug files, for example:

`yarn debug dummy/test.rapid -o dummy/test.wasm -s`

Follow [Github Flow](https://guides.github.com/introduction/flow/) and [Conventional Commits](https://www.conventionalcommits.org/) via `yarn commit` command. Do linting with `yarn lint` and build project with `yarn build`.

### Changelog

See `CHANGELOG` file for list of recent changes.

### License

See `LICENSE` file for more information.
