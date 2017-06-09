import { ISanitizer, ITokenizer } from 'js-search';

// TODO PAC write a more complete set of tests for this

// See https://github.com/emojione/emojione/blob/master/lib/js/emojione.js
// This should be included as a dependency, but it's massive, containing all the images, etc. So copied for now.
export const asciiEmojiRegexp = '(\\*\\\\0\\/\\*|\\*\\\\O\\/\\*|\\-___\\-|\\:\'\\-\\)|\'\\:\\-\\)|\'\\:\\-D|\\>\\:\\-\\)|>\\:\\-\\)|\'\\:\\-\\(|\\>\\:\\-\\(|>\\:\\-\\(|\\:\'\\-\\(|O\\:\\-\\)|0\\:\\-3|0\\:\\-\\)|0;\\^\\)|O;\\-\\)|0;\\-\\)|O\\:\\-3|\\-__\\-|\\:\\-Þ|\\:\\-Þ|\\<\\/3|<\\/3|\\:\'\\)|\\:\\-D|\'\\:\\)|\'\\=\\)|\'\\:D|\'\\=D|\\>\\:\\)|>\\:\\)|\\>;\\)|>;\\)|\\>\\=\\)|>\\=\\)|;\\-\\)|\\*\\-\\)|;\\-\\]|;\\^\\)|\'\\:\\(|\'\\=\\(|\\:\\-\\*|\\:\\^\\*|\\>\\:P|>\\:P|X\\-P|\\>\\:\\[|>\\:\\[|\\:\\-\\(|\\:\\-\\[|\\>\\:\\(|>\\:\\(|\\:\'\\(|;\\-\\(|\\>\\.\\<|>\\.<|#\\-\\)|%\\-\\)|X\\-\\)|\\\\0\\/|\\\\O\\/|0\\:3|0\\:\\)|O\\:\\)|O\\=\\)|O\\:3|B\\-\\)|8\\-\\)|B\\-D|8\\-D|\\-_\\-|\\>\\:\\\\|>\\:\\\\|\\>\\:\\/|>\\:\\/|\\:\\-\\/|\\:\\-\\.|\\:\\-P|\\:Þ|\\:Þ|\\:\\-b|\\:\\-O|O_O|\\>\\:O|>\\:O|\\:\\-X|\\:\\-#|\\:\\-\\)|\\(y\\)|\\<3|<3|\\:D|\\=D|;\\)|\\*\\)|;\\]|;D|\\:\\*|\\=\\*|\\:\\(|\\:\\[|\\=\\(|\\:@|;\\(|D\\:|\\:\\$|\\=\\$|#\\)|%\\)|X\\)|B\\)|8\\)|\\:\\/|\\:\\\\|\\=\\/|\\=\\\\|\\:L|\\=L|\\:P|\\=P|\\:b|\\:O|\\:X|\\:#|\\=X|\\=#|\\:\\)|\\=\\]|\\=\\)|\\:\\])';

const asciiRegexp = '^' + asciiEmojiRegexp + '$';

/**
 * A combined Tokenizer and Sanitizer to avoid needing to run regexs in two separate parts of the indexing and
 * searching 'pipeline'.
 */
export class AsciiEmojiRecognisingTokenizerAndSanitizer implements ITokenizer  {

  private delegateTokenizer: ITokenizer;
  private delegateSanitizer: ISanitizer;

  constructor(tokenizer: ITokenizer, sanitizer: ISanitizer) {
    this.delegateTokenizer = tokenizer;
    this.delegateSanitizer = sanitizer;
  }

  /**
   * If text is recognised as an ASCII emoji then do not tokenize it. Otherwise
   * use the delegateTokenizer to tokenize. This is tailored for index time and therefore
   * also understands arrays of ascii emoji, where they appear comma separated.
   *
   * @param text the text to be tokenized
   */
  tokenize(text: string): Array<string> {
    const parts = text.split(',');
    for (let index = 0; index < parts.length; index++) {
      if (!isAsciiEmoji(parts[index])) {
        // if any part is not an emoji then delegate
        return this.tokenizeNonEmojiText(text);
      }
    }

    console.log('PAC: AsciiEmojiRecognisingTokenizer tokenizing one or more emoji| ' + text + ' |leave it untouched.');
    return parts;
  }

  /**
   * If an ascii representation of an emoji is recognised then return it unprocessed, but also include
   * any additional tokens extracted from the string by the delegateTokenizer and delegateSanitizer.
   * Unlike the tokenize method this method does not give any special recognition to arrays.
   *
   * The first token in a returned array will be the ascii emoji if one was recognised.
   *
   * @param text the text to be tokenized
   */
  tokenizeAndPreserveEmoji(text: string): Array<string> {
    const parts: string[] = [];
    if (isAsciiEmoji(text)) {
      parts.push(text);
    }

    return parts.concat(this.tokenizeNonEmojiText(text));
  }

  private tokenizeNonEmojiText(text: string): Array<string> {
    return this.delegateTokenizer.tokenize(this.delegateSanitizer.sanitize(text));
  }
}

export class NoOpSanitizer implements ISanitizer {
  sanitize(text : string) : string {
    return text;
  }
}

export function isAsciiEmoji(text: string): boolean {
    return text.match(asciiRegexp) != null;
};
