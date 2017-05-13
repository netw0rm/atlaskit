import nodeViewFactory from './factory';
import {
  EditorView,
  Node as PMNode,
  NodeView,
} from '../prosemirror';
import ProviderFactory from '../providerFactory';

type NodeViewFactory = (node: PMNode, view: EditorView, getPos: () => number) => NodeView;
type EditorViewNodeViews = { [key: string]: NodeViewFactory; };

export interface PositionedNode extends PMNode {
  getPos: () => number;
}

export const getNodeViews = (providerFactory: ProviderFactory, opts: { block: string[], inline: string[] }): EditorViewNodeViews => {
  const output = {};

  opts.block.forEach(nodeType => {
    output[nodeType] = nodeViewFactory(providerFactory, true);
  });

  opts.inline.forEach(nodeType => {
    output[nodeType] = nodeViewFactory(providerFactory, false);
  });

  return output;
};
