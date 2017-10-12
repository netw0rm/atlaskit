import {
  EditorState,
  Plugin,
  PluginKey,
  EditorView
} from '../../../prosemirror';
import { nodeViewFactory, MacroNode } from '../../../nodeviews';
import { MacroProvider } from './types';
import ProviderFactory from '../../../providerFactory';
import * as assert from 'assert';
import { Dispatch } from '../../event-dispatcher';

import {
  handleStateChange,
  openMacroBrowser,
  STATE_CHANGE
} from './actions';

export const pluginKey = new PluginKey('macroPlugin');

export class MacroState {
  allowMacro: boolean = false;
  macroProvider: MacroProvider;

  private view: EditorView;

  constructor(providerFactory: ProviderFactory) {
    providerFactory.subscribe('macroProvider', (name, provider: Promise<MacroProvider>) => this.setMacroProvider(provider));
  }

  setMacroProvider = async (macroProvider?: Promise<MacroProvider>) => {
    if (!macroProvider) {
      return;
    }

    let resolvedMacroProvider: MacroProvider;
    try {
      resolvedMacroProvider = await macroProvider;
      assert(
        resolvedMacroProvider && resolvedMacroProvider.openMacroBrowser,
        `MacroProvider promise did not resolve to a valid instance of MacroProvider - ${resolvedMacroProvider}`
      );
    } catch (err) {
      return;
    }

    this.macroProvider = resolvedMacroProvider;
    this.allowMacro = true;
    handleStateChange(this.view);
  }

  setView(view: EditorView) {
    this.view = view;
  }
}

export const createPlugin = (dispatch: Dispatch, providerFactory: ProviderFactory) => new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new MacroState(providerFactory);
    },
    apply(tr, pluginState: MacroState) {

      if (tr.getMeta(STATE_CHANGE)) {
        const { allowMacro, macroProvider } = pluginState;
        dispatch(pluginKey, { allowMacro, macroProvider, openMacroBrowser });
      }

      return pluginState;
    }
  },
  key: pluginKey,
  view: (view: EditorView) => {
    const pluginState: MacroState = pluginKey.getState(view.state);
    pluginState.setView(view);
    return {};
  },
  props: {
    nodeViews: {
      inlineMacro: nodeViewFactory(providerFactory, { inlineMacro: MacroNode })
    }
  }
});

export default createPlugin;
