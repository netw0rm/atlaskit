import { ISanitizer, ITokenizer } from 'js-search';

// See https://github.com/emojione/emojione/blob/master/lib/js/emojione.js
// This should be included as a dependency, but it's massive, containing all the images, etc. So copied for now.
export const asciiEmojiRegexp = '(\\*\\\\0\\/\\*|\\*\\\\O\\/\\*|\\-___\\-|\\:\'\\-\\)|\'\\:\\-\\)|\'\\:\\-D|\\>\\:\\-\\)|>\\:\\-\\)|\'\\:\\-\\(|\\>\\:\\-\\(|>\\:\\-\\(|\\:\'\\-\\(|O\\:\\-\\)|0\\:\\-3|0\\:\\-\\)|0;\\^\\)|O;\\-\\)|0;\\-\\)|O\\:\\-3|\\-__\\-|\\:\\-Þ|\\:\\-Þ|\\<\\/3|<\\/3|\\:\'\\)|\\:\\-D|\'\\:\\)|\'\\=\\)|\'\\:D|\'\\=D|\\>\\:\\)|>\\:\\)|\\>;\\)|>;\\)|\\>\\=\\)|>\\=\\)|;\\-\\)|\\*\\-\\)|;\\-\\]|;\\^\\)|\'\\:\\(|\'\\=\\(|\\:\\-\\*|\\:\\^\\*|\\>\\:P|>\\:P|X\\-P|\\>\\:\\[|>\\:\\[|\\:\\-\\(|\\:\\-\\[|\\>\\:\\(|>\\:\\(|\\:\'\\(|;\\-\\(|\\>\\.\\<|>\\.<|#\\-\\)|%\\-\\)|X\\-\\)|\\\\0\\/|\\\\O\\/|0\\:3|0\\:\\)|O\\:\\)|O\\=\\)|O\\:3|B\\-\\)|8\\-\\)|B\\-D|8\\-D|\\-_\\-|\\>\\:\\\\|>\\:\\\\|\\>\\:\\/|>\\:\\/|\\:\\-\\/|\\:\\-\\.|\\:\\-P|\\:Þ|\\:Þ|\\:\\-b|\\:\\-O|O_O|\\>\\:O|>\\:O|\\:\\-X|\\:\\-#|\\:\\-\\)|\\(y\\)|\\<3|<3|\\:D|\\=D|;\\)|\\*\\)|;\\]|;D|\\:\\*|\\=\\*|\\:\\(|\\:\\[|\\=\\(|\\:@|;\\(|D\\:|\\:\\$|\\=\\$|#\\)|%\\)|X\\)|B\\)|8\\)|\\:\\/|\\:\\\\|\\=\\/|\\=\\\\|\\:L|\\=L|\\:P|\\=P|\\:b|\\:O|\\:X|\\:#|\\=X|\\=#|\\:\\)|\\=\\]|\\=\\)|\\:\\])';
// Go on Sylvain, put it in your InputRule! ^^^^

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

  tokenize(text : string) : Array<string> {
    const parts = text.split(',');
    for (let index = 0; index < parts.length; index++) {
      if (!this.isAsciiEmoji(parts[0])) {
        // if any part is not an emoji then delegate
        return this.delegateTokenizer.tokenize(this.delegateSanitizer.sanitize(text));
      }
    }

    console.log('PAC: AsciiEmojiRecognisingTokenizer tokenizing one or more emoji| ' + text + ' |leave it untouched.');
    return parts;
  }


  private isAsciiEmoji(text: string): boolean {
    return text.match(asciiRegexp) != null;
  }
}

export class NoOpSanitizer implements ISanitizer {
  sanitize(text : string) : string {
    return text;
  }
}
