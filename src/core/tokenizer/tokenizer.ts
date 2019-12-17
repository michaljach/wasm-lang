import { matchers } from './matchers';
import { TokenizerError } from './error';

export type TokenType = 'number' | 'keyword' | 'whitespace';

export interface Token {
  type: TokenType;
  value: string;
  line?: number;
  char?: number;
}

const locationForIndex = (input: string, index: number) => ({
  char: index - input.lastIndexOf('\n', index) - 1,
  line: input.substring(0, index).split('\n').length - 1,
});

export const tokenize = (input: string) => {
  const tokens: Token[] = [];
  let index = 0;
  while (index < input.length) {
    const location = locationForIndex(input, index);
    const matches = matchers.map(m => m(input, index)).filter(f => f);

    if (matches.length > 0) {
      const match = matches[0];
      if (match.type !== 'whitespace') {
        tokens.push({ ...match, ...location });
      }
      index += match.value.length;
    } else {
      throw new TokenizerError(
        `Unexpected token '${input.substring(index, index + 1)}' on line ${location.line + 1}, character ${
          location.char
        }`,
        index,
      );
    }
  }
  return tokens;
};
