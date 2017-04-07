import { expect } from 'chai';

import { getAtlassianEmojis, getEmojiRepository, getGrinEmoji, getEvilburnsEmoji, getStandardEmojis } from './TestData';

describe('#test data', () => {
  it('expected standard emojis', () => {
    expect(getStandardEmojis().length, '80 Standard Emoji').to.equal(80);
  });

  it('expected atlassian emojis', () => {
    expect(getAtlassianEmojis().length, '10 Atlassian Emoji').to.equal(10);
  });

  it('expected grin emoji', () => {
    const emoji = getGrinEmoji();
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('1f601');
      expect(emoji.shortName, 'shortName').to.equal(':grin:');
    }
  });

  it('expected evilburns emojis', () => {
    const emoji = getEvilburnsEmoji();
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('atlassian-evilburns');
      expect(emoji.shortName, 'shortName').to.equal(':evilburns:');
    }
  });

  it('expected grin emoji', () => {
    const emoji = getEmojiRepository().findById('1f601');
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('1f601');
      expect(emoji.shortName, 'shortName').to.equal(':grin:');
    }
  });

  it('expected evilburns emojis', () => {
    const emoji = getEmojiRepository().findById('atlassian-evilburns');
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('atlassian-evilburns');
      expect(emoji.shortName, 'shortName').to.equal(':evilburns:');
    }
  });
});
