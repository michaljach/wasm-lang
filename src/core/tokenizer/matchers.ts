import { keywords } from './keywords';
import { TokenType } from './tokenizer';

const regexMatcher = (regex: string, type: TokenType) => (input: string, index: number) => {
  const match = input.substring(index).match(regex);
  return (
    match && {
      type,
      value: match[0],
    }
  );
};

export const matchers = [
  regexMatcher('^[.0-9]+', 'number'),
  regexMatcher(`^${keywords.join('|')}`, 'keyword'),
  regexMatcher('^\\s+', 'whitespace'),
];
