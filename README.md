![Build](https://github.com/michaljach/wasm-lang/workflows/Build/badge.svg)

# wasm-lang [needs name] compiler

Compiles `[langname]` sources to WebAssembly `wasm` binary module file. It can dynamically create and output sourcemaps for debugging.

### Install

`npm i wasm-lang -g`

### API

```
Options:

--help  Show help  [boolean]
--version Show version number  [boolean]
-f, --file  Path to source file to be compiled [string] [required]
-o, --output  Path to result file to be saved  [string] [required]
-s, --sourceMaps  Generate sourceMaps for debugging  [boolean]
```

Example:
`wasm-lang -f dummy/test.x -o dummy/test.wasm -s`

### Changelog

See `CHANGELOG` file for list of recent changes.

### License

See `LICENSE` file for more information.
