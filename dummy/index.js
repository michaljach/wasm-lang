WebAssembly.instantiateStreaming(fetch('index.wasm'), { print: console.log }).then(results => {
  console.log(results.instance.exports.adder(1.2, 2));
});
