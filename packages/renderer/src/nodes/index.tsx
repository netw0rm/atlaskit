import * as React from 'react';
import { Mention } from '@atlaskit/mention';
import Doc from './doc';
import Paragraph from './paragraph';
import {
  isText,
  isTextWrapper,
  mergeTextNodes,
  renderTextNodes,
  TextNode,
} from './text';

export interface Renderable {
  type: string;
  content?: Renderable[];
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

export const renderNode = (node: Renderable, index: number = 0) => {
  const nodeContent = mergeTextNodes(node.content || []);
  const key = `${node.type}-${index}`;

  switch (NodeType[node.type]) {
    case NodeType.doc:
      return <Doc key={key}>{nodeContent.map((child, index) => renderNode(child, index))}</Doc>;
    case NodeType.paragraph:
      return <Paragraph key={key}>{nodeContent.map((child, index) => renderNode(child, index))}</Paragraph>;
    case NodeType.mention: {
      const { text, attrs } = node;
      let mentionText;

      if (!text) {
        if (attrs) {
          mentionText = attrs.text || attrs['displayName'] || '@unknown';
        } else {
          mentionText = '@unknown';
        }
      } else {
        mentionText = text;
      }

      const { id } = attrs as any || { id: 'unknown' };
      return <Mention key={key} id={id} text={mentionText} />;
    }
    default: {
      if (isTextWrapper(node.type)) {
        return renderTextNodes(node.content as TextNode[]);
      } else if (isText(node.type)) {
        return renderTextNodes([node as TextNode]);
      }

      // Try render text of unkown node
      if (node.attrs && node.attrs.text) {
        return node.attrs.text;
      } else if (node.text) {
        return node.text;
      }

      // Node is unkown and can't be rendered
      return `Unknown type: "${node.type}"`;
    }
  }
};
