import {
  Schema,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import keymapPlugin from './keymaps';
import codeMirrorNodeView from '../../nodeviews/ui/code-mirror';

export const stateKey = new PluginKey('codeMirrorPlugin');

const plugin = new Plugin({
  key: stateKey,
  props: {
    nodeViews: {
      codeBlock: codeMirrorNodeView,
    },
  }
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, keymapPlugin()] as Plugin[];
};

export default plugins;
