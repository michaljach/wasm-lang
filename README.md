![Build](https://github.com/rapidlang/compiler/workflows/Build/badge.svg) [![npm version](https://img.shields.io/npm/v/rapid-lang.svg?style=flat)](https://www.npmjs.com/package/rapid-lang) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rapidlang/compiler/blob/master/LICENSE)

# RAPID compiler

Compiles `RAPID` sources to [WebAssembly](https://webassembly.org/) `wasm` binary module file. It can dynamically create and output sourcemaps for debugging.

### Install

`npm i rapid-lang -g`

### API

```
Commands:
  rapid source  Path to source file to be compiled

Options:
  -o, --output      Path to result file to be saved          [string] [required]
  -h, --help        Show help                                          [boolean]
  -v, --version     Show version number                                [boolean]
  -s, --sourceMaps  Generate sourceMaps for debugging                  [boolean]
  -t, --textFormat  Generate WebAssembly Text Format (wat) file         [string]
```

Example:

`rapid dummy/test.rapid -o dummy/test.wasm -s`

### Language Documentation

Full documentation is available on https://rapid-lang.org page.

### Development

Use start script to start the server, watch changes and auto re-compile sources.

`yarn start`

Example:

`yarn start dummy/test.rapid -o dummy/test.wasm`

### Changelog

See `CHANGELOG` file for list of recent changes.

### License

See `LICENSE` file for more information.
