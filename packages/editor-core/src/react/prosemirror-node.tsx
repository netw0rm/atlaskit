import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import { default as MediaGroupNode } from './media-group';
import { default as MediaNode } from './media';
import { default as MentionNode } from './mention';
import {
  Node as PMNode,
} from '../prosemirror';

const richNodes = new Map<string, React.ComponentClass<any>>([
  [ 'mediaGroup', MediaGroupNode ],
  [ 'media', MediaNode ],
  [ 'mention', MentionNode ],
]);

export interface Props {
  node: PMNode;
  getPos: () => number;
  [key: string]: any;
}

export default class ReactProsemirrorNode extends PureComponent<Props, {}> {
  render() {
    const { getPos, node } = this.props;
    const nodeTypeName = node.type.name;

    assert(richNodes.has(nodeTypeName), `Rich node with type ${nodeTypeName} is not declared`);

    const attrs = { ...this.props, node };
    const reactClass = richNodes.get(nodeTypeName)!;

    const children: any[] = [];
    let nodePosOffset = 0;

    node.forEach((childNode, offset, index) => {
      childNode.getPos = () => getPos() + nodePosOffset;
      nodePosOffset += childNode.nodeSize;

      const childAttrs = { ...this.props, node: childNode };

      children.push(
        <ReactProsemirrorNode key={`richnode-${offset}-${index}`} {...childAttrs}/>
      );
    });

    return React.createElement(reactClass, attrs, children);
  }
}
