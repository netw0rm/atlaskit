import { Plugin, PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';
import { inlineMacro } from '../../../schema/nodes/inline-macro';
import { nodeViewFactory, MacroNode } from '../../../nodeviews';

export const pluginKey = new PluginKey('inlineMacroPlugin');

const createPlugin = (schema, providerFactory) => {
  return new Plugin({
    key: pluginKey,
    props: {
      nodeViews: {
        inlineMacro: nodeViewFactory(providerFactory, { inlineMacro: MacroNode })
      }
    }
  });
};

const inlineMacroPlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 2300, name: 'inlineMacro', node: inlineMacro  },
    ];
  },

  pmPlugins() {
    return [
      { rank: 2310, plugin: (schema, props, dispatch, providerFactory) => createPlugin(schema, providerFactory) }
    ];
  }
};

export default inlineMacroPlugin;
