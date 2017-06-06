import * as twemoji from 'twemoji';
import { Node, Schema } from '../../prosemirror';

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

// TODO documentation
export function splitTextNodeToEmojiAndTextNodes(textNode: Node, schema: Schema<any,any>) : Node[] {
  if (!textNode.isText) {
    return [textNode];
  }

  const emojiOrText = splitToEmojiAndText(textNode.textContent);
  if (!emojiOrText) {
    return [schema.text(textNode.textContent, textNode.marks)];
  }

  const nodes: Node[] = [];
  emojiOrText.forEach(eot => {
    if (eot.emojiId) {
      nodes.push(schema.nodes.emoji.create({ id: eot.emojiId, text: eot.text }));
    } else {
      nodes.push(schema.text(eot.text, textNode.marks));
    }
  });

  return nodes;
}
