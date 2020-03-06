import fs from 'fs';
import yargs from 'yargs';

export interface Args {
  [x: string]: unknown;
  f: string;
}

export const { argv }: { argv: Args } = yargs.options({
  f: { type: 'string', demandOption: true, alias: 'file', nargs: 1, description: 'Path to source file to be compiled' },
  o: { type: 'string', demandOption: true, alias: 'output', nargs: 1, description: 'Path to result file to be saved' },
  s: { type: 'boolean', alias: 'sourceMaps', description: 'Generate sourceMaps for debugging' },
  t: { type: 'string', alias: 'textFormat', nargs: 1, description: 'Generate WebAssembly Text Format (wat) file' },
});

export const read = (filename: string): string => {
  return fs.readFileSync(filename).toString();
};

export const save = (fileName: string, buffer: string | Uint8Array): void => {
  fs.writeFileSync(fileName, buffer);
};
