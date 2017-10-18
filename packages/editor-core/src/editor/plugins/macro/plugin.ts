import {
  Plugin,
  PluginKey,
  EditorView
} from '../../../prosemirror';
import { nodeViewFactory, MacroNode } from '../../../nodeviews';
import { MacroProvider } from './types';
import ProviderFactory from '../../../providerFactory';
import { setMacroProvider } from './actions';
import { Dispatch } from '../../event-dispatcher';

export const pluginKey = new PluginKey('macroPlugin');

export type MacroState = {
  macroProvider: MacroProvider | null;
  macroElement: HTMLElement | null;
};

export const createPlugin = (dispatch: Dispatch, providerFactory: ProviderFactory) => new Plugin({
  state: {
    init: () => ({ provider: null, macroElement: null }),

    apply(tr, state: MacroState) {

      const meta = tr.getMeta(pluginKey);
      if (meta) {
        const newState = {...state, ...meta};
        dispatch(pluginKey, newState);

        return newState;
      }

      return state;
    }
  },
  key: pluginKey,
  view: (view: EditorView) => {
    providerFactory.subscribe('macroProvider', (name, provider: Promise<MacroProvider>) => setMacroProvider(view, name, provider));
    return {};
  },
  props: {
    nodeViews: {
      inlineMacro: nodeViewFactory(providerFactory, { inlineMacro: MacroNode })
    }
  }
});

export default createPlugin;
