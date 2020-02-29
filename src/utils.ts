const path = require('path');

export const getFileName = (url: string) => {
  return path.basename(url);
};
