import { expect } from 'chai';
import { SimpleTokenizer } from 'js-search';
import { AsciiEmojiRecognisingTokenizer } from '../../src/search/AsciiEmojiRecognisingTokenizer';


describe('AsciiEmojiRecognisingTokenizer', () => {

  const tokenizer = new AsciiEmojiRecognisingTokenizer(new SimpleTokenizer());

  it('should not tokenize a string containing only an ascii emoji', () => {
    const smile = ':-)';
    expect(tokenizer.tokenize(smile)[0]).to.equal(smile);

    const laugh = ':D';
    expect(tokenizer.tokenize(laugh)[0]).to.equal(laugh);

    const ok = '*\\0/*';
    expect(tokenizer.tokenize(ok)[0]).to.equal(ok);
  });

  it('should tokenize a string containing ascii emoji and other text', () => {
    expect(tokenizer.tokenize(':-) monkey trousers')).to.deep.equal(['-', 'monkey', 'trousers']);
  });

  it('should tokenize a string which is not an ascii emoji', () => {
    expect(tokenizer.tokenize('monkey trousers')).to.deep.equal(['monkey','trousers']);
  });

  it('should not tokenize a string representing an array of emoji', () => {
    expect(tokenizer.tokenize(':-),<3,</3')).to.deep.equal([':-)','<3','</3']);
  });

  it('should tokenize a string with commas but not all emoji', () => {
    expect(tokenizer.tokenize('abc,:-),def')).to.deep.equal(['abc','-','def']);
  });

});
