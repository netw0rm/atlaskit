import { EmojiDescription, EmojiId, toEmojiId } from '@atlaskit/emoji';
import { emoji as emojiData } from '@atlaskit/util-data-test';

const emojiRepository = emojiData.emojiTestData.emojiRepository;

export const grinningId: EmojiId = toEmojiId(emojiRepository.findByShortName(':grinning:') as EmojiDescription);
export const laughingId: EmojiId = toEmojiId(emojiRepository.findByShortName(':laughing:') as EmojiDescription);
export const thumbsupId: EmojiId = toEmojiId(emojiRepository.findByShortName(':thumbsup:') as EmojiDescription);
export const grinId: EmojiId = toEmojiId(emojiRepository.findByShortName(':grin:') as EmojiDescription);
export const smileyId: EmojiId = toEmojiId(emojiRepository.findByShortName(':smiley:') as EmojiDescription);

