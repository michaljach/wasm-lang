import fs from 'fs';
import yargs from 'yargs';

export interface Args {
  [x: string]: unknown;
  f: string;
}

export const { argv }: { argv: Args } = yargs.options({
  f: { type: 'string', demandOption: true, alias: 'file', nargs: 1 },
  o: { type: 'string', demandOption: true, alias: 'output', nargs: 1 },
  s: { type: 'boolean', alias: 'sourceMaps' },
});

export const save = (fileName: string, buffer: string | Uint8Array): void => {
  fs.writeFileSync(fileName, buffer);
};
