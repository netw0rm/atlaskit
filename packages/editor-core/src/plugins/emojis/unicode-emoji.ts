import * as twemoji from 'twemoji';

/**
 * Get the id of the Unicode emoji represented by the supplied text. Undefined will be
 * returned if the text does not represent an emoji.
 *
 * @param text the text to check for a native emoji
 * @return the id of the native emoji if found in text; otherwise undefined
 */
export function getIdForUnicodeEmoji(text: string) : string | undefined {
  let emojiId;

  // Use twemoji.replace to understand the String but not to actually do anything to the inserted text.
  twemoji.replace(text, function(rawText, offset, fullStr) {
    // only convert if a single emoji is represented. If somehow a String containing more than just a
    // single emoji gets through do nothing as a safe fallback.
    // (Alternative is to lose entered content which is not desirable.)
    if (rawText !== fullStr) {
      return rawText;
    }

    emojiId = twemoji.convert.toCodePoint(rawText.includes(String.fromCharCode(0x200D)) ? rawText : rawText.replace(/\uFE0F/g, ''));
    return rawText;
  });

  return emojiId;
}

// TODO probably don't use so remove
export type EmojiIdAtPosition = { emojiId: number, position: number };
// TODO probably don't use so remove
export function getEmojiAndPositions(text: string): EmojiIdAtPosition[] {
  let positions: EmojiIdAtPosition[] = [];

  twemoji.replace(text, function(rawText, offset, fullStr) {
    let emojiId = twemoji.convert.toCodePoint(rawText.includes(String.fromCharCode(0x200D)) ? rawText : rawText.replace(/\uFE0F/g, ''));
    // TODO test with multi-byte characters.
    positions.push({ emojiId: emojiId, position: offset})
    return rawText;
  });

  return positions;
}

export type EmojiOrText = {
  emojiId?: number,
  text: string
};

/**
 * Split a supplied string into a number of parts split on each emoji encountered. The emojis
 * themselves are also returned in the result array. As an example the original text abc😀def😬ghj
 * should become: 'abc', 1F600, 'def', 1F62C, 'ghj'.
 *
 * @param text The string to split
 * @return an array of text and emoji in the order they are encountered
 */
export function splitToEmojiAndText(text: string) : EmojiOrText[] {
  let parts: EmojiOrText[] = [];

  let lastPos = 0;
  twemoji.replace(text, function(rawText, offset, fullStr) {
    parts.push({ text: fullStr.substring(lastPos, offset)});
    lastPos = offset + rawText.length;
    let emojiId = twemoji.convert.toCodePoint(rawText.includes(String.fromCharCode(0x200D)) ? rawText : rawText.replace(/\uFE0F/g, ''));
    parts.push({ emojiId: emojiId, text: rawText });
  });

  if (lastPos == 0) {
    // no emoji found, so return empty array
    return parts;
  }

  // Capture any text following the final emoji in the string
  if (lastPos < text.length) {
    parts.push({ text: text.substring(lastPos) });
  }

  return parts;
}
