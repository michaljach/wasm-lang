import fs from 'fs';
import yargs from 'yargs';

export interface Args {
  _: string[];
  o: string;
  t?: string;
  p?: number;
  s?: boolean;
}

export const getArgs = (): Args => {
  const { argv }: { argv: Args } = yargs
    .options({
      o: {
        type: 'string',
        demandOption: true,
        alias: 'output',
        nargs: 1,
        description: 'Path to result file to be saved',
      },
      h: { alias: 'help' },
      v: { alias: 'version' },
      s: { type: 'boolean', alias: 'sourceMaps', description: 'Generate sourceMaps for debugging' },
      t: { type: 'string', alias: 'textFormat', nargs: 1, description: 'Generate WebAssembly Text Format (wat) file' },
      p: { type: 'number', alias: 'port', nargs: 1, description: 'Sourcemaps default port' },
    })
    .demandCommand(1)
    .command('source', 'Path to source file to be compiled');

  return argv;
};

export const read = (filename: string): string => {
  return fs.readFileSync(filename).toString();
};

export const save = (fileName: string, buffer: string | Uint8Array): void => {
  fs.writeFileSync(fileName, buffer);
};
