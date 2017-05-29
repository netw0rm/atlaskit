import { EmojiId, EmojiProvider } from '@atlaskit/emoji';
import * as commands from '../../commands';
import * as twemoji from 'twemoji';
import {
  EditorState,
  EditorView,
  Schema,
  Plugin,
  PluginKey,
  TextSelection,
} from '../../prosemirror';
import { isMarkAllowedAtPosition } from '../../utils';
import { inputRulePlugin } from './input-rules';
import keymapPlugin from './keymap';
import ProviderFactory from '../../providerFactory';

export type StateChangeHandler = (state: EmojiState) => any;

export interface Options {
  emojiProvider: Promise<EmojiProvider>;
}

export class EmojiState {
  emojiProvider: Promise<EmojiProvider>;
  query?: string;
  enabled = true;
  queryActive = false;
  anchorElement?: HTMLElement;

  onSelectPrevious = (): boolean => false;
  onSelectNext = (): boolean => false;
  onSelectCurrent = (): boolean => false;
  onTrySelectCurrent = (): boolean => false;

  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;
  private view: EditorView;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(state: EditorState<any>) {
    this.state = state;

    if (!this.emojiProvider) {
      return;
    }

    const { emojiQuery } = state.schema.marks;
    const { doc, selection } = state;
    const { from, to } = selection;

    let dirty = false;

    const newEnabled = this.canAddEmojiToActiveNode();
    if (newEnabled !== this.enabled) {
      this.enabled = newEnabled;
      dirty = true;
    }

    if (doc.rangeHasMark(from - 1, to, emojiQuery)) {
      if (!this.queryActive) {
        dirty = true;
        this.queryActive = true;
      }

      const { nodeBefore, /*nodeAfter*/ } = selection.$from;
      const newQuery = (nodeBefore && nodeBefore.textContent || '').substr(1); // + (nodeAfter && nodeAfter.textContent || '');

      if (this.query !== newQuery) {
        dirty = true;
        this.query = newQuery;
      }
    } else if (this.queryActive) {
      dirty = true;
      this.dismiss();
      return;
    }

    const newAnchorElement = this.view.dom.querySelector('[data-emoji-query]') as HTMLElement;
    if (newAnchorElement !== this.anchorElement) {
      dirty = true;
      this.anchorElement = newAnchorElement;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  dismiss(): boolean {
    this.queryActive = false;
    this.query = undefined;

    const { state, view } = this;

    if (state) {
      const { schema } = state;
      const { tr } = state;
      const markType = schema.mark('emojiQuery');

      view.dispatch(
        tr
          .removeMark(0, state.doc.nodeSize - 2, markType)
          .removeStoredMark(markType)
      );
    }

    return true;
  }

  emojiDisabled() {
    const { schema, selection } = this.state;
    const { emojiQuery } = schema.marks;
    return isMarkAllowedAtPosition(emojiQuery, selection);
  }

  private canAddEmojiToActiveNode(): boolean {
    const { emojiQuery } = this.state.schema.marks;
    return !!emojiQuery && commands.toggleMark(emojiQuery)(this.state);
  }

  private findEmojiQueryMark() {
    const { state } = this;
    const { doc, schema, selection } = state;
    const { to, from } = selection;
    const { emojiQuery } = schema.marks;

    let start = from;
    let node = doc.nodeAt(start);

    while (start > 0 && (!node || !emojiQuery.isInSet(node.marks))) {
      start--;
      node = doc.nodeAt(start);
    }

    let end = start;

    if (node && emojiQuery.isInSet(node.marks)) {
      const resolvedPos = doc.resolve(start);
      // -1 is to include : in replacement
      // resolvedPos.depth + 1 to make emoji work inside other blocks e.g. "list item" or "blockquote"
      start = resolvedPos.start(resolvedPos.depth + 1) - 1;
      end = start + node.nodeSize;
    }

    // Emoji inserted via picker
    if (start === 0 && end === 0) {
      start = from;
      end = to;
    }

    return { start, end };
  }

  insertEmoji(emojiId?: EmojiId) {
    const { state, view } = this;
    const { emoji } = state.schema.nodes;

    if (emoji && emojiId) {
      const { start, end } = this.findEmojiQueryMark();
      const node = emoji.create({ ...emojiId, text: emojiId.fallback || emojiId.shortName });
      const textNode = state.schema.text(' ');
      view.dispatch(
        state.tr.replaceWith(start, end, [node, textNode])
      );
      view.focus();
    } else {
      this.dismiss();
    }
  }

  subscribeToFactory(providerFactory: ProviderFactory) {
    providerFactory.subscribe('emojiProvider', this.handleProvider);
  }

  handleProvider = (name: string, provider: Promise<any>): void => {
    switch (name) {
      case 'emojiProvider':
        this.setEmojiProvider(provider);
        break;
    }
  }

  setEmojiProvider(emojiProvider: Promise<EmojiProvider>) {
    this.emojiProvider = emojiProvider;
    return emojiProvider;
  }

  setView(view: EditorView) {
    this.view = view;
  }
}

export const stateKey = new PluginKey('emojiPlugin');

const plugin = new Plugin({
  state: {
    init(config, state) {
      return new EmojiState(state);
    },
    apply(tr, pluginState, oldState, newState) {
      // NOTE: Don't call pluginState.update here.
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    const pluginState = stateKey.getState(view.state);
    pluginState.setView(view);

    return {
      update(view: EditorView, prevState: EditorState<any>) {
        pluginState.update(view.state, view);
      }
    };
  },
   props: {
    // TODO Note this implementation only expects to handle a text parameter containing a single emoji (or non-emoji character)
    handleTextInput: (view: EditorView, from: number, to: number, text: string) => {
      console.log('PAC: handleTextInput. from = ' + from + ', to = ' + to + ' and text = ' + text);

      let emojiId;

      // Use twemoji.replace to understand the String but not to actually do anything to the inserted text.
      twemoji.replace(text, function(rawText, offset, fullStr) {
        // only do our thing if a single emoji is being inserted. If somehow a String containing more than just a single emoji gets through do nothing
        // as a safe fallback. (Alternative is to lose entered content which is not desirable.)
        if (rawText !== fullStr) {
          return rawText;
        }

        emojiId = twemoji.convert.toCodePoint(rawText.includes(String.fromCharCode(0x200D)) ? rawText : rawText.replace(/\uFE0F/g, ''));
        return rawText;
      });

      const state = view.state;
      const emojiProvider = this.stateKey.getState(state).emojiProvider;

      if (emojiId && emojiProvider) {
        console.log('PAC: We have an emojiId and an emojiProvider (' + this.emojiProvider + ')');
        // insert a mark around the native emoji with an attribute containing the emoji Id
        const schema = state.schema;
        const markedNativeEmojiText = schema.text(text, schema.mark('nativeEmoji', { emojiId : emojiId }));
        view.dispatch(state.tr.replaceWith(from, to, markedNativeEmojiText));

        const newState = view.state;
        if (newState.selection) {
          // cancel any existing text selection and move the cursor to immediately following the inserted emoji
          view.dispatch(newState.tr.setSelection(new TextSelection(newState.doc.resolve(from + 1))));
        }

        // get the EmojiId from the EmojiProvider
        emojiProvider.then(provider => {
          provider.findById(emojiId).then((loadedEmoji) => {
            // create an emoji ProseMirror node and insert it at the mark
          });

        });

        console.log('PAC: Marked up an emoji with id = ' + emojiId);
        return true;
      }
      return false;
    }
   }
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, inputRulePlugin(schema), keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
