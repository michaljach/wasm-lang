![Build](https://github.com/rapidlang/compiler/workflows/Build/badge.svg) [![npm version](https://img.shields.io/npm/v/rapid-lang.svg?style=flat)](https://www.npmjs.com/package/rapid-lang) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rapidlang/compiler/blob/master/LICENSE)

# RAPID compiler

Compiles `RAPID` sources to [WebAssembly](https://webassembly.org/) `wasm` binary module file. It can dynamically create and output sourcemaps for debugging.

### Install

`npm i rapid-lang -g`

### API

```

Options:

--help Show help [boolean]
--version Show version number [boolean]
-f, --file Path to source file to be compiled [string] [required]
-o, --output Path to result file to be saved [string] [required]
-s, --sourceMaps Generate sourceMaps for debugging [boolean]
-t, --textFormat  Generate WebAssembly Text Format (wat) file [string]

```

Example:

`rapid -f dummy/test.rapid -o dummy/test.wasm -s`

### Language Documentation

Full documentation is available on https://michaljach.gitbook.io/rapid/ page.

### Development

Use start script to start the server, watch changes and auto re-compile sources.

`yarn start`

Example:

`yarn start -f dummy/test.rapid -o dummy/test.wasm`

### Changelog

See `CHANGELOG` file for list of recent changes.

### License

See `LICENSE` file for more information.
