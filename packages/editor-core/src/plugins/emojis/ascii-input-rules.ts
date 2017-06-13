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

interface AsciiEmojiMatch {
  emoji: EmojiDescription;
  startsWithWhitespace: boolean;
  endsWithWhitespace: boolean;
}

class AsciiEmojiMatcher {
  static REGEX = /(^| )([^: ]+\S{1,3}|:\S{1,3} )$/;

  private static REGEX_FULL_CAPTURE_INDEX = 0;
  private static REGEX_PREFIX_CAPTURE_INDEX = 1;
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
    return this.state.schema.text(AsciiEmojiTransactionCreator.SPACE);
  }
}

export const stateKey = new PluginKey('asciiEmojiPlugin');

const plugins = (schema: Schema<any, any>, emojiProvider: Promise<EmojiProvider> | undefined) => {
  return [inputRulePlugin(schema, emojiProvider)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
