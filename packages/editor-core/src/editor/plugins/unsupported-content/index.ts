import { Plugin, PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';
import { confluenceUnsupportedInline } from '../../../schema/nodes/confluence-unsupported-inline';
import { confluenceUnsupportedBlock } from '../../../schema/nodes/confluence-unsupported-block';
import {
  nodeViewFactory,
  ReactUnsupportedBlockNode,
  ReactUnsupportedInlineNode
} from '../../../nodeviews';

export const pluginKey = new PluginKey('unsupportedContentPlugin');

export const unsupportedContent = new Plugin({
  key: pluginKey,
  props: {
    nodeViews: {
      confluenceUnsupportedBlock: nodeViewFactory(this.providerFactory, { confluenceUnsupportedBlock: ReactUnsupportedBlockNode }, true),
      confluenceUnsupportedInline: nodeViewFactory(this.providerFactory, { confluenceUnsupportedInline: ReactUnsupportedInlineNode })
    }
  }
});

const unsupportedContentPlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 1300, name: 'confluenceUnsupportedBlock', node: confluenceUnsupportedBlock  },
      { rank: 1310, name: 'confluenceUnsupportedInline', node: confluenceUnsupportedInline },
    ];
  },

  pmPlugins() {
    return [
      { rank: 1320, plugin: () => unsupportedContent }
    ];
  }
};

export default unsupportedContentPlugin;
