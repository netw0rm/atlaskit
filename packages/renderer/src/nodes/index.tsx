import * as React from 'react';
import { Mention, ResourcedMention } from '@atlaskit/mention';
import { EventHandlers, ServicesConfig } from '../config';
import Doc from './doc';
import Paragraph from './paragraph';
import {
  mergeTextNodes,
  renderTextNodes,
  TextNode,
} from './text';

import {
  isText,
  isTextWrapper
} from '../utils';

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

export const renderNode = (node: Renderable, servicesConfig?: ServicesConfig, eventHandlers?: EventHandlers, index: number = 0) => {
  const nodeContent = mergeTextNodes(node.content || []);
  const key = `${node.type}-${index}`;

  switch (NodeType[node.type]) {
    case NodeType.doc:
      return <Doc key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</Doc>;
    case NodeType.paragraph:
      return <Paragraph key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</Paragraph>;
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
      const { mention } = eventHandlers || { mention: {} };
      const { onClick, onMouseEnter, onMouseLeave } = mention || { onClick: () => {}, onMouseEnter: () => {}, onMouseLeave: () => {}};
      if (servicesConfig && servicesConfig.getMentionProvider) {
        return (
          <ResourcedMention
            key={key}
            id={id}
            text={mentionText}
            mentionProvider={servicesConfig.getMentionProvider()}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />);
      }

      return (
        <Mention
          key={key}
          id={id}
          text={mentionText}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />);
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
