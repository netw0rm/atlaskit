const toneEmojiShortName = ':raised_back_of_hand:';

const byShortcut = (emojis, shortcut) => emojis.filter(emoji => emoji.shortcut === shortcut)[0];

const toneEmoji = emojis => byShortcut(emojis, toneEmojiShortName);

export default {
  byShortcut,
  toneEmoji,
};
