import { expect } from 'chai';

import { atlassianEmojis, emojiService, grinEmoji, areyoukiddingmeEmoji, standardEmojis } from './TestData';

describe('#test data', () => {
  it('expected standard emojis', () => {
    expect(standardEmojis.length, '88 Standard Emoji').to.equal(88);
  });

  it('expected atlassian emojis', () => {
    expect(atlassianEmojis.length, '11 Atlassian Emoji').to.equal(11);
  });

  it('expected grin emoji', () => {
    const emoji = grinEmoji;
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('1f601');
      expect(emoji.shortcut, 'shortcut').to.equal('grin');
    }
  });

  it('expected areyoukiddingme emojis', () => {
    const emoji = areyoukiddingmeEmoji;
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('atlassian-areyoukiddingme');
      expect(emoji.shortcut, 'shortcut').to.equal('areyoukiddingme');
    }
  });

  it('expected grin emoji', () => {
    const emoji = emojiService.findById({ id: '1f601' });
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('1f601');
      expect(emoji.shortcut, 'shortcut').to.equal('grin');
    }
  });

  it('expected areyoukiddingme emojis', () => {
    const emoji = emojiService.findById({ id: 'atlassian-areyoukiddingme' });
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('atlassian-areyoukiddingme');
      expect(emoji.shortcut, 'shortcut').to.equal('areyoukiddingme');
    }
  });
});
