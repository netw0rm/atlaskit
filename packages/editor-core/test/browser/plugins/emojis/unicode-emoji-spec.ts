import { EmojiOrText, getIdForUnicodeEmoji, splitToEmojiAndText } from '../../../../src/plugins/emojis/unicode-emoji';
import * as chai from 'chai';
const { expect } = chai;

describe('unicodeEmojis', () => {

  describe('getIdForUnicodeEmoji', () => {
    it('should return an id for a unicode emoji', () => {
      expect(getIdForUnicodeEmoji('😁')).to.equal('1f601');
    });

    it('should return an undefined when not a unicode emoji', () => {
      expect(getIdForUnicodeEmoji('a')).to.equal(undefined);
    });

    it('should return undefined when text has more than just an emoji', () => {
      expect(getIdForUnicodeEmoji('😘z')).to.equal(undefined);
    });

    it('should return id for keycap emoji', () => {
      expect(getIdForUnicodeEmoji('8️⃣')).to.equal('38-20e3');
    });

    it('should return id for flag emoji', () => {
      expect(getIdForUnicodeEmoji('🇦🇺')).to.equal('1f1e6-1f1fa');
    });

    it('should return id for emoji with skintone modifier', () => {
      expect(getIdForUnicodeEmoji('👶🏻')).to.equal('1f476-1f3fb');
    });

  it('should return id for family group emoji', () => {
      expect(getIdForUnicodeEmoji('👨‍👨‍👧‍👧')).to.equal('1f468-200d-1f468-200d-1f467-200d-1f467');
    });
  });

  describe('splitToEmojiAndText', () => {
    it('should return undefined on empty text', () => {
      const result = splitToEmojiAndText('');
      expect(result).to.equal(undefined);
    });

    it('should return undefined when no emoji in text', () => {
      const result = splitToEmojiAndText('abc def ÷ ghi ∅ jkl mno');
      expect(result).to.equal(undefined);
    });

    it('should return undefined when no emoji on text with line breaks', () => {
      const result = splitToEmojiAndText(
      `abc
      def
      ghi
      jkl`);

      expect(result).to.equal(undefined);
    });

    it('should split when emoji is only content', () => {
      const split = splitToEmojiAndText('🍏🍋🍓');

      expect(split).to.not.equal(undefined);

      // stops typescript compiler complaining that split may be undefined later
      if (split === undefined) {
        return;
      }

      expect(split.length).to.equal(3);
      expect(split[0]).to.deep.equal(new EmojiOrText('🍏', '1f34f'));
      expect(split[1]).to.deep.equal(new EmojiOrText('🍋', '1f34b'));
      expect(split[2]).to.deep.equal(new EmojiOrText('🍓', '1f353'));
    });

    it('should split when emoji is start of content', () => {
      const split = splitToEmojiAndText('🍉abc def');

      expect(split).to.not.equal(undefined);

      // stops typescript compiler complaining that split may be undefined later
      if (split === undefined) {
        return;
      }

      expect(split.length).to.equal(2);
      expect(split[0]).to.deep.equal(new EmojiOrText('🍉', '1f349'));
      expect(split[1]).to.deep.equal(new EmojiOrText('abc def'));
    });

    it('should split when emoji is at the end of the content', () => {
      const split = splitToEmojiAndText('abc def 🍉');

      expect(split).to.not.equal(undefined);

      // stops typescript compiler complaining that split may be undefined later
      if (split === undefined) {
        return;
      }

      expect(split.length).to.equal(2);
      expect(split[0]).to.deep.equal(new EmojiOrText('abc def '));
      expect(split[1]).to.deep.equal(new EmojiOrText('🍉', '1f349'));
    });

    it('should split when multiple emoji throughout the content', () => {
      const split = splitToEmojiAndText('abc🍉def🍉ghi');

      expect(split).to.not.equal(undefined);

      // stops typescript compiler complaining that split may be undefined later
      if (split === undefined) {
        return;
      }

      expect(split.length).to.equal(5);
      expect(split[0]).to.deep.equal(new EmojiOrText('abc'));
      expect(split[1]).to.deep.equal(new EmojiOrText('🍉','1f349'));
      expect(split[2]).to.deep.equal(new EmojiOrText('def'));
      expect(split[3]).to.deep.equal(new EmojiOrText('🍉','1f349'));
      expect(split[4]).to.deep.equal(new EmojiOrText('ghi'));
    });

    it('should split when multiple emoji at end and start of lines in content with linebreaks', () => {
      const split = splitToEmojiAndText(
      `abc🍉
      def
      🍉ghi
      🍉
      jkl`);

      expect(split).to.not.equal(undefined);

      // stops typescript compiler complaining that split may be undefined later
      if (split === undefined) {
        return;
      }

      expect(split.length).to.equal(7);
      expect(split[0]).to.deep.equal(new EmojiOrText('abc'));
      expect(split[1]).to.deep.equal(new EmojiOrText('🍉','1f349'));
      expect(split[2]).to.deep.equal(new EmojiOrText(`
      def
      `));
      expect(split[3]).to.deep.equal(new EmojiOrText('🍉','1f349'));
      expect(split[4]).to.deep.equal(new EmojiOrText(`ghi
      `));
      expect(split[5]).to.deep.equal(new EmojiOrText('🍉','1f349'));
      expect(split[6]).to.deep.equal(new EmojiOrText(`
      jkl`));
    });


    it('should split when emoji at start and end of the content', () => {
      const split = splitToEmojiAndText('🍉 abc def🍉');

      expect(split).to.not.equal(undefined);

      // stops typescript compiler complaining that split may be undefined later
      if (split === undefined) {
        return;
      }

      expect(split.length).to.equal(3);
      expect(split[0]).to.deep.equal(new EmojiOrText('🍉', '1f349'));
      expect(split[1]).to.deep.equal(new EmojiOrText(' abc def'));
      expect(split[2]).to.deep.equal(new EmojiOrText('🍉', '1f349'));
    });
  });
});
