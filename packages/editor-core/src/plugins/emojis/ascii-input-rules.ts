import { EditorState, Transaction, Plugin, PluginKey, inputRules, Schema, Node } from '../../prosemirror';
import { createInputRule } from '../utils';
import { isMarkTypeAllowedAtCurrentPosition } from '../../utils';
import { EmojiProvider, EmojiDescription } from '@atlaskit/emoji';

let matcher: AsciiEmojiMatcher;

export function inputRulePlugin(schema: Schema<any, any>, emojiProvider: Promise<EmojiProvider> | undefined): Plugin | undefined {
  if (schema.nodes.emoji && emojiProvider) {
    initMatcher(emojiProvider);
    const asciiEmojiRule = createInputRule(AsciiEmojiMatcher.REGEX, inputRuleHandler);
    return inputRules({
      rules: [asciiEmojiRule]
    });
  }
}

function initMatcher(emojiProvider: Promise<EmojiProvider>) {
  emojiProvider.then(provider => {
    provider.getAsciiMap().then(map => {
      matcher = new AsciiEmojiMatcher(map);
    });
  });
}

function inputRuleHandler(state: EditorState<Schema<any, any>>, matchParts: [string], start: number, end: number): Transaction | undefined {
  if (!isEnabled(state)) { return undefined; }
  if (!matcher) { return undefined; }

  const match = matcher.match(matchParts);
  if (match) {
    const transactionCreator = new AsciiEmojiTransactionCreator(state, match, start, end);
    return transactionCreator.create();
  }
  return undefined;
}

function isEnabled(state: EditorState<Schema<any, any>>) {
  return isMarkTypeAllowedAtCurrentPosition(state.schema.marks.emojiQuery, state);
}

type AsciiEmojiMatch = {
  emoji: EmojiDescription;
  startsWithWhitespace: boolean;
  endsWithWhitespace: boolean;
};

class AsciiEmojiMatcher {
  /**
   * This regex matches 2 scenarios:
   * 1. an emoticon starting with a colon character (e.g. :D => 😃)
   * 2. an emoticon not starting with a colon character (e.g. 8-D => 😎)
   *
   * The following describes the different parts of the regex from left to right:
   *   (^| )
   *     must be preceded by a space or the start of a line, regardless of scenario #1 or #2
   *
   *   ([^: ]\S{1,3}|:\S{1,3} )
   *     alternation between scenario #1 and #2
   *       #1 - `[^: ]\S{1,3}`
   *         must not start with a colon and any additional space is ignored (space is already matched by previous capture)
   *         following characters must be non-whitespace
   *         only matches emoticons that are between 2 and 4 characters long
   *       #2 - :\S{1,3}
   *         must start with a colon character
   *         following characters must be non-whitespace
   *         only matches emoticons that are between 2 and 4 characters long
   *         must be trailed by a space character
   *
   *    $
   *      anchors the end of the match to the cursor position
   */
  static REGEX = /(^| )([^: ]\S{1,3}|:\S{1,3} )$/;

  private static REGEX_FULL_CAPTURE_INDEX = 0;
  private static REGEX_PREFIX_CAPTURE_INDEX = 1;
  private static REGEX_WORD_CAPTURE_INDEX = 2;

  private asciiToEmojiMap: Map<string, EmojiDescription>;

  /**
   *
   * @param asciiToEmojiMap
   */
  constructor(asciiToEmojiMap: Map<string, EmojiDescription>) {
    this.asciiToEmojiMap = asciiToEmojiMap;
  }

  match(matchParts: string[]): AsciiEmojiMatch | undefined {
    let emoji = this.getEmoji(matchParts);
    if (emoji) {
      return {
        emoji: emoji,
        startsWithWhitespace: AsciiEmojiMatcher.startsWithWhitespace(matchParts),
        endsWithWhitespace: AsciiEmojiMatcher.endsWithWhitespace(matchParts),
      };
    }
  }

  private getEmoji(match: string[]): EmojiDescription | undefined {
    let ascii = match[AsciiEmojiMatcher.REGEX_WORD_CAPTURE_INDEX].trim();
    if (ascii) {
      return this.asciiToEmojiMap.get(ascii);
    }
    return undefined;
  }

  private static startsWithWhitespace(match: string[]): boolean {
    return match[AsciiEmojiMatcher.REGEX_PREFIX_CAPTURE_INDEX] === ' ';
  }

  private static endsWithWhitespace(match: string[]): boolean {
    const lastCharPos = match[AsciiEmojiMatcher.REGEX_FULL_CAPTURE_INDEX].length - 1;
    return match[AsciiEmojiMatcher.REGEX_FULL_CAPTURE_INDEX].charAt(lastCharPos) === ' ';
  }
}

class AsciiEmojiTransactionCreator {
  private state: EditorState<Schema<any, any>>;
  private match: AsciiEmojiMatch;
  private start: number;
  private end: number;

  constructor(state: EditorState<Schema<any, any>>, match: AsciiEmojiMatch, start: number, end: number) {
    this.state = state;
    this.match = match;
    this.start = start;
    this.end = end;
  }

  create(): Transaction {
    return this.state.tr.replaceWith(
      this.from,
      this.to,
      this.createNodes()
    );
  }

  private get from(): number {
    return this.match.startsWithWhitespace ? this.start + 1 : this.start;
  }

  private get to(): number {
    return this.end;
  }

  private createNodes(): Node[] {
    const nodes = [this.createEmojiNode()];
    if (this.match.endsWithWhitespace) {
      nodes.push(this.createSpaceTextNode());
    }
    return nodes;
  }

  private createEmojiNode(): Node {
    const { emoji: emojiTypeNode } = this.state.schema.nodes;
    return emojiTypeNode.create(this.getEmojiNodeAttrs());
  }

  private getEmojiNodeAttrs() {
    const emoji = this.match.emoji;
    return {
      id: emoji.id,
      shortName: emoji.shortName,
      text: emoji.fallback || emoji.shortName
    };
  }

  private createSpaceTextNode(): Node {
    return this.state.schema.text(' ');
  }
}

export const stateKey = new PluginKey('asciiEmojiPlugin');

const plugins = (schema: Schema<any, any>, emojiProvider: Promise<EmojiProvider> | undefined) => {
  return [inputRulePlugin(schema, emojiProvider)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
