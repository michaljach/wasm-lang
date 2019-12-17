import { Token } from '../tokenizer/tokenizer';

export class ParserError extends Error {
  token: Token;
  constructor(message: string, token: Token) {
    super(message);
    this.token = token;
  }
}
