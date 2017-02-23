import * as React from 'react';
import Doc from './doc';
import Mention from './mention';
import Paragraph from './paragraph';
import {
  isText,
  isTextWrapper,
  mergeTextNodes,
  renderTextNodes,
  TextNode,
  TextWrapper,
} from './text';

export interface Node {
  type: string;
  content?: Node[];
  text?: string;
  attrs?: {
    text?: string;
    [key: string]: any;
  };
}

enum NodeType {
  doc,
  mention,
  paragraph,
  textWrapper,
}

const nodes = {
  [NodeType.doc]: Doc,
  [NodeType.mention]: Mention,
  [NodeType.paragraph]: Paragraph,
};

export const renderNode = (node: Node, index: number = 0) => {
  const { type } = node;

  //tslint:disable-next-line
  const Node = nodes[NodeType[type]] as any;
  const nodeContent = mergeTextNodes(node.content || []);

  if (Node) {
    return (
      <Node {...node} key={`${type}-${index}`}>
        {nodeContent.map((node, index) => renderNode(node, index))}
      </Node>
    );
  } else if (isTextWrapper(type)) {
    return renderTextNodes((node as TextWrapper).textNodes);
  } else if (isText(type)) {
    return renderTextNodes([node as TextNode]);
  }

  if (node.attrs && node.attrs.text) {
    return node.attrs.text;
  }

  return <span key={`unkown-${index}`}>Unkown type</span>;
};
