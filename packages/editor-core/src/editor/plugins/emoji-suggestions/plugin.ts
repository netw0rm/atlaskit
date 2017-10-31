import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { EditorView, DecorationSet } from 'prosemirror-view';
import ProviderFactory from '../../../providerFactory';
import { Dispatch } from '../../event-dispatcher';
import { getLastWord, createDecorationWidget } from './utils';
import { EmojiProvider } from '@atlaskit/emoji';
import { setEmojiProvider } from './actions';

export const pluginKey = new PluginKey('emojiSuggestionsPlugin');

export class EmojiSuggestionsState {
  decorations: DecorationSet = DecorationSet.empty;
  query?: string;
  selectedIndex: number = -1;
  anchorElement?: HTMLElement;
  emojiProvider: EmojiProvider;
  onSelectPrevious = (): boolean => false;
  onSelectNext = (): boolean => false;
  onSelectCurrent = (): boolean => false;
  dismiss = (): boolean => false;
}

export const createPlugin = (dispatch: Dispatch, providerFactory: ProviderFactory) => new Plugin({
  state: {
    init: () => new EmojiSuggestionsState(),

    apply(tr: Transaction, state: EmojiSuggestionsState) {
      const meta = tr.getMeta(pluginKey);
      if (meta) {
        const newState = {...state, ...meta};
        dispatch(pluginKey, newState);
        return newState;
      }

      const query = getLastWord(tr.selection);
      if (query !== state.query) {
        const newState = {
          ...state,
          query,
          decorations: createDecorationWidget(tr, query)
        };
        dispatch(pluginKey, newState);
        return newState;
      }

      return state;
    }
  },
  props: {
    decorations: (state: EditorState) => pluginKey.getState(state).decorations
  },
  view: (view: EditorView) => {
    providerFactory.subscribe('emojiProvider', (name, provider: Promise<EmojiProvider>) => setEmojiProvider(view, provider));

    return {
      update(view) {
        const { dom, state: { tr }, dispatch } = view;
        const anchorElement = dom.querySelector('[data="emoji-suggestion"]') as HTMLElement;

        if (anchorElement !== pluginKey.getState(view.state).anchorElement) {
          dispatch(tr.setMeta(pluginKey, { anchorElement }));
        }
      }
    };
  },
  key: pluginKey
});

export default createPlugin;
