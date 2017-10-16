import { EditorPlugin } from '../../types';
import { inlineMacro } from '@atlaskit/editor-common';
import { createPlugin } from './plugin';
export { pluginKey, MacroState } from './plugin';

const macroPlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 2300, name: 'inlineMacro', node: inlineMacro  },
    ];
  },

  pmPlugins() {
    return [
      { rank: 2310, plugin: (schema, props, dispatch, providerFactory) => createPlugin(dispatch, providerFactory) }
    ];
  }
};

export default macroPlugin;
