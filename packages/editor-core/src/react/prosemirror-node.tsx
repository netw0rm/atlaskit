import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import { PositionedNode } from './';
import wrapComponentWithCickArea from './wrapper-click-area';
import { default as EmojiNode } from './emoji';
import { default as MediaGroupNode } from './media-group';
import { default as MediaNode } from './media';
import { default as MentionNode } from './mention';
import {
  Node as PMNode,
  EditorView,
} from '../prosemirror';
import ProviderFactory from '../providerFactory';
import { reactNodeViewStateKey } from '../plugins';

const richNodes = new Map<string, React.ComponentClass<any>>([
  [ 'emoji', EmojiNode ],
  [ 'mediaGroup', MediaGroupNode ],
  [ 'media', MediaNode ],
  [ 'mention', MentionNode ],
]);

export interface ReactProsemirrorNodeProps {
  getPos: () => number;
  node: PMNode;
  providerFactory: ProviderFactory;
  view: EditorView;

  [key: string]: any;
}

export default class ReactProsemirrorNode extends PureComponent<ReactProsemirrorNodeProps, {}> {
  render() {
    const { getPos, node, providerFactory, view } = this.props;
    const nodeTypeName = node.type.name;

    assert(richNodes.has(nodeTypeName), `Rich node with type ${nodeTypeName} is not declared`);

    // tslint:disable-next-line:variable-name
    const RichNode = richNodes.get(nodeTypeName)!;
    const attrs = { ...this.props, node };
    const children: React.ReactNode[] = [];

    node.forEach((childNode: PositionedNode, offset: number, index: number) => {
      // tslint:disable-next-line:variable-name
      const RichNodeWithClickArea = wrapComponentWithCickArea(ReactProsemirrorNode);

      // child node position is parent position + offset + 1
      // because each node has its own position
      // i.e. different nodes can't have the same position
      childNode.getPos = () => getPos() + offset + 1;

      children.push(
        <RichNodeWithClickArea
          key={`richnode-${offset}-${index}`}
          node={childNode}
          view={view}
          pluginState={reactNodeViewStateKey.getState(view.state)}
          providerFactory={providerFactory}
        />
      );
    });

    return <RichNode {...attrs}>{children}</RichNode>;
  }
}
