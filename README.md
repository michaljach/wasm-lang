![Build](https://github.com/michaljach/wasm-lang/workflows/Build/badge.svg) [![npm version](https://img.shields.io/npm/v/wasm-lang.svg?style=flat)](https://www.npmjs.com/package/wasm-lang) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/michaljach/wasm-lang/blob/master/LICENSE)

# wasm-lang [needs name] compiler

Compiles `[langname]` sources to [WebAssembly](https://webassembly.org/) `wasm` binary module file. It can dynamically create and output sourcemaps for debugging.

### Install

`npm i wasm-lang -g`

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

`wasm-lang -f dummy/test.x -o dummy/test.wasm -s`

### Language Documentation

- #### Function declaration

```
function [name]([param_name]: <type>, ...): <type> {
  return [expression]
}
```

Example:

```
function show(): int {
  return 12
}
```

### Changelog

See `CHANGELOG` file for list of recent changes.

### License

See `LICENSE` file for more information.
