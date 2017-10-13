import {
  Plugin,
  PluginKey,
  EditorView
} from '../../../prosemirror';
import { nodeViewFactory, MacroNode } from '../../../nodeviews';
import { MacroProvider } from './types';
import ProviderFactory from '../../../providerFactory';
import * as assert from 'assert';
import { Dispatch } from '../../event-dispatcher';

export const pluginKey = new PluginKey('macroPlugin');

export type MacroState = {
  macroProvider: MacroProvider | null
};

export const createPlugin = (dispatch: Dispatch, providerFactory: ProviderFactory) => new Plugin({
  state: {
    init: () => ({ provider: null }),

    apply(tr, pluginState: MacroState) {

      const meta = tr.getMeta(pluginKey);
      if (meta) {
        dispatch(pluginKey, { macroProvider: meta.provider } as MacroState);
      }

      return pluginState;
    }
  },
  key: pluginKey,
  view: (view: EditorView) => {
    providerFactory.subscribe('macroProvider', async (name, provider: Promise<MacroProvider>) => {
      let resolvedProvider: MacroProvider | null;

      try {
        resolvedProvider = await provider;
        assert(
          resolvedProvider && resolvedProvider.openMacroBrowser,
          `MacroProvider promise did not resolve to a valid instance of MacroProvider - ${resolvedProvider}`
        );
      } catch (err) { resolvedProvider = null; }

      view.dispatch(view.state.tr.setMeta(pluginKey, { provider: resolvedProvider }));
    });

    return {};
  },
  props: {
    nodeViews: {
      inlineMacro: nodeViewFactory(providerFactory, { inlineMacro: MacroNode })
    }
  }
});

export default createPlugin;
