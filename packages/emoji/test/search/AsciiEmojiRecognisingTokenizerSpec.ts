import { expect } from 'chai';
import { SimpleTokenizer } from 'js-search';
import { AsciiEmojiRecognisingTokenizer } from '../../src/search/AsciiEmojiRecognisingTokenizer';


describe('AsciiEmojiRecognisingTokenizer', () => {

  const tokenizer = new AsciiEmojiRecognisingTokenizer(new SimpleTokenizer());

  it('should not tokenize a string containing only an ascii emoji', () => {
    const smile = ':-)';
    expect(tokenizer.tokenize(smile)).to.equal(smile);

    const laugh = ':D';
    expect(tokenizer.tokenize(laugh)).to.equal(laugh);

    const ok = '*\\0/*';
    expect(tokenizer.tokenize(ok)).to.equal(ok);
  });

  it('should tokenize a string containing ascii emoji and other text', () => {
    expect(tokenizer.tokenize(':-) monkey trousers')).to.deep.equal([':-)', 'monkey', 'trousers']);
  });

  it('should not tokenize a string which is not an ascii emoji', () => {
    expect(tokenizer.tokenize('monkey trousers')).to.deep.equal(['monkey','trousers']);
  });
});
