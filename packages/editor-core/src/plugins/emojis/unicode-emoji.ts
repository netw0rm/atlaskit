import * as twemoji from 'twemoji';
import { Mark, Node, Schema } from '../../prosemirror';

/**
 * Get the id of the Unicode emoji represented by the supplied text. Undefined will be
 * returned if the text does not represent an emoji.
 *
 * @param text the text to check for a native emoji
 * @return the id of the native emoji if found in text; otherwise undefined
 */
export function getIdForUnicodeEmoji(text: string): string | undefined {
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

export class EmojiOrText {
  text: string;
  emojiId?: string;

  constructor(text: string, emojiId?: string) {
    this.text = text;
    this.emojiId = emojiId;
  }

  isEmoji() {
    return this.emojiId !== undefined;
  }

  createNode(schema: Schema<any,any>, marks: Mark[]): Node {
    if (this.isEmoji()) {
      return schema.nodes.emoji.create({ id: this.emojiId, text: this.text }, marks);
    } else {
      return schema.text(this.text, marks);
    }
  }
}

/**
 * Split a supplied string into a number of parts split on each emoji encountered. The emojis
 * themselves are also returned in the result array. As an example the original text abc😀def😬ghj
 * should become: 'abc', 1F600, 'def', 1F62C, 'ghj'.
 *
 * @param text The string to split
 * @return an array of text and emoji in the order they are encountered or undefined if there are no emoji in the text
 */
export function splitToEmojiAndText(text: string): EmojiOrText[] | undefined {
  let parts: EmojiOrText[] = [];

  let lastPos = 0;
  twemoji.replace(text, function(rawText, offset, fullStr) {
    if (offset !== lastPos) {
      // there was text before we encountered this emoji
      parts.push(new EmojiOrText(fullStr.substring(lastPos, offset)));
    }
    lastPos = offset + rawText.length; // move lastPos beyond the emoji we have just found
    let emojiId = twemoji.convert.toCodePoint(rawText.includes(String.fromCharCode(0x200D)) ? rawText : rawText.replace(/\uFE0F/g, ''));
    parts.push(new EmojiOrText(rawText, emojiId));
  });

  if (lastPos === 0) {
    return undefined; // no emoji found
  }

  // Capture any text following the final emoji in the string
  if (lastPos < text.length) {
    parts.push(new EmojiOrText(text.substring(lastPos)));
  }

  return parts;
}
