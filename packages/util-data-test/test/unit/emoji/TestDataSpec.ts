import { atlassianEmojis, emojiRepository, grinEmoji, evilburnsEmoji, standardEmojis } from '../../../src/emoji/test-data';

describe('#test data', () => {
  it('expected standard emojis', () => {
    expect(standardEmojis.length).toBe(80);
  });

  it('expected atlassian emojis', () => {
    expect(atlassianEmojis.length).toBe(10);
  });

  it('expected grin emoji', () => {
    const emoji = grinEmoji;
    expect(emoji).not.toBe(undefined);
    if (emoji) {
      expect(emoji.id).toBe('1f601');
      expect(emoji.shortName).toBe(':grin:');
    }
  });

  it('expected evilburns emojis', () => {
    const emoji = evilburnsEmoji;
    expect(emoji).not.toBe(undefined);
    if (emoji) {
      expect(emoji.id).toBe('atlassian-evilburns');
      expect(emoji.shortName).toBe(':evilburns:');
    }
  });

  it('expected grin emoji', () => {
    const emoji = emojiRepository.findById('1f601');
    expect(emoji).not.toBe(undefined);
    if (emoji) {
      expect(emoji.id).toBe('1f601');
      expect(emoji.shortName).toBe(':grin:');
    }
  });

  it('expected evilburns emojis', () => {
    const emoji = emojiRepository.findById('atlassian-evilburns');
    expect(emoji).not.toBe(undefined);
    if (emoji) {
      expect(emoji.id).toBe('atlassian-evilburns');
      expect(emoji.shortName).toBe(':evilburns:');
    }
  });
});
