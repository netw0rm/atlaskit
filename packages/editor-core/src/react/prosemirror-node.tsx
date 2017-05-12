import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import { PositionedNode } from './';
import WrapperClickArea from './wrapper-click-area';
import { default as EmojiNode } from './emoji';
import { default as MediaGroupNode } from './media-group';
import { default as MediaNode } from './media';
import { default as MentionNode } from './mention';
import {
  Node as PMNode,
  EditorView,
} from '../prosemirror';
import { reactNodeViewStateKey } from '../plugins';

const richNodes = new Map<string, React.ComponentClass<any>>([
  [ 'emoji', EmojiNode ],
  [ 'mediaGroup', MediaGroupNode ],
  [ 'media', MediaNode ],
  [ 'mention', MentionNode ],
]);

export interface ReactProsemirrorNodeProps {
  getPos: () => number;
  internal?: boolean;
  node: PMNode;
  view: EditorView;

  [key: string]: any;
}

export default class ReactProsemirrorNode extends PureComponent<ReactProsemirrorNodeProps, {}> {
  render() {
    const { getPos, node, view } = this.props;
    const nodeTypeName = node.type.name;

    assert(richNodes.has(nodeTypeName), `Rich node with type ${nodeTypeName} is not declared`);

    // tslint:disable-next-line:variable-name
    const RichNode = richNodes.get(nodeTypeName)!;
    const attrs = { ...this.props, node };
    const children: React.ReactNode[] = [];

    node.forEach((childNode: PositionedNode, offset: number, index: number) => {
      // child node position is parent position + offset + 1
      // because each node has its own position
      // i.e. different nodes can't have the same position
      childNode.getPos = () => getPos() + offset + 1;

      const reactNodeViewState = reactNodeViewStateKey.getState(view.state);
      const childAttrs = { ...this.props, node: childNode, internal: true };

      children.push(
        <WrapperClickArea
          key={`richnode-${offset}-${index}`}
          node={childNode}
          view={view}
          pluginState={reactNodeViewState}
        >
          <ReactProsemirrorNode {...childAttrs}/>
        </WrapperClickArea>
      );
    });

    return <RichNode {...attrs}>{children}</RichNode>;
  }
}
