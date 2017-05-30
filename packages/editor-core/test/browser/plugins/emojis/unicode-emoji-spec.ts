import { getIdForUnicodeEmoji } from '../../../../src/plugins/emojis/unicode-emoji';
import * as chai from 'chai';
const { expect } = chai;

describe('unicodeEmojis', () => {
  it('should return an id for a unicode emoji', () => {
    expect(getIdForUnicodeEmoji('😁')).to.equal('1f601');
  });

  it('should return an undefined when not a unicode emoji', () => {
    expect(getIdForUnicodeEmoji('a')).to.be.undefined;
  });

  it('should return undefined when text has more than just an emoji', () => {
    expect(getIdForUnicodeEmoji('😘z')).to.be.undefined;
  });
});
