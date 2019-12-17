import { runtime } from './core/compiler';

runtime(`print 56`, {
  print: console.log,
}).then(s => s());
