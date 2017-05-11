import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import { PositionedNode } from './';
import WrapperClickArea from './wrapper-click-area';
import { default as MediaGroupNode } from './media-group';
import { default as MediaNode } from './media';
import { default as MentionNode } from './mention';
import {
  Node as PMNode,
  EditorView,
} from '../prosemirror';

const richNodes = new Map<string, React.ComponentClass<any>>([
  [ 'mediaGroup', MediaGroupNode ],
  [ 'media', MediaNode ],
  [ 'mention', MentionNode ],
]);

export interface ReactProsemirrorNodeProps {
  node: PMNode;
  getPos: () => number;
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

      const childAttrs = { ...this.props, node: childNode };

      children.push(
        <WrapperClickArea
          key={`richnode-${offset}-${index}`}
          node={childNode}
          view={view}
        >
          <ReactProsemirrorNode {...childAttrs}/>
        </WrapperClickArea>
      );
    });

    return React.createElement(reactClass, attrs, children);
  }
}
