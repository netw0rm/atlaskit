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
