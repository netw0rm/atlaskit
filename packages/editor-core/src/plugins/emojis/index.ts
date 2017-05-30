import { EmojiId, EmojiProvider } from '@atlaskit/emoji';
import * as commands from '../../commands';
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
import { getIdForUnicodeEmoji } from './unicode-emoji';

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

/**
 * Wrap the 'text' in the Editor with a native emoji node marker, so it can be dealt with later.
 * If no emojiProvider has been configured then the native emoji will not be marked.
 *
 * @param view the EditorView to operate on
 * @param emojiId the id of the emoji represented by the text
 * @param from the text starting position in the document
 * @param to the text ending position in the document
 * @param text the text to be marked if it is a native emoji
 * @return true if the native emoji was marked; otherwise false
 */
// const wrapNativeEmojiWithMark = function(view: EditorView, emojiId: string, from: number, to: number, text: string): void {
//   const state = view.state;
//   // insert a mark around the native emoji with an attribute containing the emoji Id
//   const schema = state.schema;
//   const markedNativeEmojiText = schema.text(text, schema.mark('nativeEmoji', { emojiId : emojiId }));
//   view.dispatch(state.tr.replaceWith(from, to, markedNativeEmojiText));

//   const newState = view.state;
//   if (newState.selection) {
//     // cancel any existing text selection and move the cursor to immediately following the inserted emoji
//     view.dispatch(newState.tr.setSelection(new TextSelection(newState.doc.resolve(from + 1))));
//   }
// }

// const replaceNativeEmojiMarkWithEmoji = function(view: EditorView, providerPromise: Promise<EmojiProvider>, emojiId: string): void {
//   // now find the emoji from the provider and replace the mark with a proper emoji node
//   providerPromise.then(provider => {
//     provider.findById(emojiId).then((loadedEmoji) => {
//       if (loadedEmoji) {
//         // create an emoji ProseMirror node and insert it at the mark

//       } else {
//         // Remove the mark and stick with the native emoji

//       }
//     });

//   });
// }

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
    handleTextInput: (view: EditorView, from: number, to: number, text: string) => {
      console.log('PAC: handleTextInput. from = ' + from + ', to = ' + to + ' and text = ' + text);
      let emojiId = getIdForUnicodeEmoji(text);
      if (emojiId) {
        const state = view.state;
        const nativeEmoji = state.schema.nodes.nativeEmoji.create({ id: emojiId, text: text });

        view.dispatch(state.tr.replaceWith(from, to, nativeEmoji));

        const newState = view.state;
        if (newState.selection) {
          // cancel any existing text selection and move the cursor to immediately following the inserted emoji
          view.dispatch(newState.tr.setSelection(new TextSelection(newState.doc.resolve(from + 1))));
        }


        // keep a reference to the nativeEmoji and update it in the promise
        // this might to be enough to cause a re-render in react. Test this by removing the 'forceUpdate'
        // (The promise stuff is currently in the react component but should be moved to here)

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
