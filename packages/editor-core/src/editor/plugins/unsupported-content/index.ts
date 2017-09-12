import { EditorState, Plugin, PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';
import { confluenceUnsupportedInline } from '../../../schema/nodes/confluence-unsupported-inline';
import { confluenceUnsupportedBlock } from '../../../schema/nodes/confluence-unsupported-block';
import {
  nodeViewFactory,
  ReactUnsupportedBlockNode,
  ReactUnsupportedInlineNode
} from '../../../nodeviews';
import { traverseNode } from './utils';

export const pluginKey = new PluginKey('unsupportedContentPlugin');

const createPlugin = (schema, providerFactory) => {
  return new Plugin({
    state: {
      init(config, state: EditorState<any>) {
        traverseNode(state.doc, schema);
      },
      apply(tr, pluginState, oldState, newState) {
        return pluginState;
      }
    },
    key: pluginKey,
    props: {
      nodeViews: {
        confluenceUnsupportedBlock: nodeViewFactory(providerFactory, { confluenceUnsupportedBlock: ReactUnsupportedBlockNode }, true),
        confluenceUnsupportedInline: nodeViewFactory(providerFactory, { confluenceUnsupportedInline: ReactUnsupportedInlineNode })
      }
    }
  });
};

const unsupportedContentPlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 1300, name: 'confluenceUnsupportedBlock', node: confluenceUnsupportedBlock  },
      { rank: 1310, name: 'confluenceUnsupportedInline', node: confluenceUnsupportedInline },
    ];
  },

  pmPlugins() {
    return [
      { rank: 1320, plugin: (schema, props, dispatch, providerFactory) => createPlugin(schema, providerFactory) }
    ];
  }
};

export default unsupportedContentPlugin;
