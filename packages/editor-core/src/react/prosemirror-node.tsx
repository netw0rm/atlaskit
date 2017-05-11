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

    const attrs = { ...this.props, node };
    const reactClass = richNodes.get(nodeTypeName)!;

    const children: any[] = [];
    let nodePosOffset = 0;

    node.forEach((childNode: PositionedNode, offset: number, index: number) => {
      childNode.getPos = () => getPos() + nodePosOffset;
      nodePosOffset += childNode.nodeSize;

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

    return React.createElement(reactClass, attrs, children);
  }
}
