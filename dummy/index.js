WebAssembly.instantiate(
  Uint8Array.from([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    8,
    2,
    96,
    0,
    0,
    96,
    1,
    125,
    0,
    2,
    13,
    1,
    3,
    101,
    110,
    118,
    5,
    112,
    114,
    105,
    110,
    116,
    0,
    1,
    3,
    2,
    1,
    0,
    7,
    7,
    1,
    3,
    114,
    117,
    110,
    0,
    1,
    10,
    11,
    1,
    9,
    0,
    67,
    0,
    0,
    95,
    67,
    16,
    0,
    11,
  ]),
  { env: { print: console.log } },
).then(obj => obj.instance.exports.run());