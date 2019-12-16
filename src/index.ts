import { runtime } from './core/compiler';
const fs = require('fs');

const hrstart = process.hrtime();

fs.readFile(process.argv[2], 'utf8', function(err: any, data: string) {
  if (err) throw err;

  runtime(data, {
    print: console.log,
  })
    .then(s => s())
    .then(() => {
      const hrend = process.hrtime(hrstart);
      console.info('Compile time (hr): %dms', hrend[1] / 1000000);
    });
});
