import chalk from 'chalk';

export enum MessageCode {
  NOT_VALID,
  COMPILED_SUCCESSFULLY,
  SOURCEMAPS_COMPILED,
}

const messages = {
  [MessageCode.NOT_VALID]: chalk.red('Error :: Module is not valid'),
  [MessageCode.SOURCEMAPS_COMPILED]: '📍 Source maps generated successfully!',
  [MessageCode.COMPILED_SUCCESSFULLY]: chalk.green('🚀 Compiled successfully!'),
};

const log = (errorCode: MessageCode): void => {
  const statement = messages[errorCode];
  console.log(statement); // eslint-disable-line no-console
};

export default log;
