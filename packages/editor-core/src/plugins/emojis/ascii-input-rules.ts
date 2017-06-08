import { EditorState, Transaction, Plugin, PluginKey, inputRules, Schema, Node } from '../../prosemirror';
import { createInputRule } from '../utils';
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
  const match = matcher.match(matchParts);
  if (match) {
    const transactionCreator = new AsciiEmojiTransactionCreator(state, match, start, end);
    return transactionCreator.create();
  }
  return undefined;
}

interface AsciiEmojiMatch {
  emoji: EmojiDescription;
  hasWhitespacePrefix: boolean;
}

class AsciiEmojiMatcher {
  static REGEX = /(^|\s)(\S+)\s$/;
  private static WHITESPACE_PREFIX_REGEX = /^\s$/;

  private static REGEX_FULL_CAPTURE_INDEX = 0;
  private static REGEX_WORD_CAPTURE_INDEX = 2;

  private asciiToEmojiMap: Map<string, EmojiDescription>;

  constructor(asciiToEmojiMap: Map<string, EmojiDescription>) {
    this.asciiToEmojiMap = asciiToEmojiMap;
  }

  match(matchParts: string[]): AsciiEmojiMatch | undefined {
    let emoji = this.getEmoji(matchParts);
    if (emoji) {
      return {
        emoji: emoji,
        hasWhitespacePrefix: AsciiEmojiMatcher.startsWithWhitespace(matchParts),
      };
    }
  }

  private getEmoji(match: string[]): EmojiDescription | undefined {
    let ascii = match[AsciiEmojiMatcher.REGEX_WORD_CAPTURE_INDEX];
    if (ascii) {
      return this.asciiToEmojiMap.get(ascii);
    }
    return undefined;
  }

  private static startsWithWhitespace(match: string[]): boolean {
    const prefix = match[AsciiEmojiMatcher.REGEX_FULL_CAPTURE_INDEX].substring(0, 1);
    return AsciiEmojiMatcher.WHITESPACE_PREFIX_REGEX.test(prefix);
  }
}

class AsciiEmojiTransactionCreator {
  private static SPACE = ' ';

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
    return this.match.hasWhitespacePrefix ? this.start + 1 : this.start;
  }

  private get to(): number {
    return this.end;
  }

  private createNodes(): [Node] {
    return [this.createEmojiNode(), this.createSpaceTextNode()];
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
    return this.state.schema.text(AsciiEmojiTransactionCreator.SPACE);
  }
}

export const stateKey = new PluginKey('asciiEmojiPlugin');

const plugins = (schema: Schema<any, any>, emojiProvider: Promise<EmojiProvider> | undefined) => {
  return [inputRulePlugin(schema, emojiProvider)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
