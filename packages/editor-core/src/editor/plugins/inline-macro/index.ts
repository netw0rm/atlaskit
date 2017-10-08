import { PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';
import { inlineMacro } from '../../../schema/nodes/inline-macro';

export const pluginKey = new PluginKey('inlineMacroPlugin');

const inlineMacroPlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 2300, name: 'inlineMacro', node: inlineMacro  },
    ];
  },
};

export default inlineMacroPlugin;
