import * as React from 'react';
import { EmojiId } from '@atlaskit/emoji';
import { Mention, ResourcedMention } from '@atlaskit/mention';
import { EventHandlers, ServicesConfig } from '../config';
import Doc from './doc';
import Paragraph from './paragraph';
import Emoji from './emoji';
import Hardbreak from './hardBreak';
import MediaGroup from './mediaGroup';
import Media, { MediaNode } from './media';
import {
  mergeTextNodes,
  renderTextNodes,
  TextNode,
} from './text';

export interface Renderable {
  version?: number;
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
  emoji,
  hardBreak,
  media,
  mediaGroup,
  mention,
  paragraph,
  textWrapper,
  text,
  unknown
}

export const getValidNode = (node: Renderable | TextNode): Renderable | TextNode => {
  const { attrs, content, text, type } = node;

  if (type) {
    switch (NodeType[type]) {
      case NodeType.doc: {
        const { version } = node;
        if (version && content && content.length) {
          return {
            type,
            version,
            content
          };
        }
        break;
      }
      case NodeType.emoji: {
        const { attrs } = node;
        if (attrs && attrs.shortName) {
          return {
            type,
            attrs,
          };
        }
        break;
      }
      case NodeType.hardBreak:
        return {
          type
        };
      case NodeType.media:
        let mediaId = '';
        let mediaType = '';
        let mediaCollection = '';
        if (attrs) {
          const { id, collection, type } = attrs;
          mediaId = id;
          mediaType = type;
          mediaCollection = collection;
        }
        if (mediaId && mediaType && mediaCollection.length) {
          return {
            type,
            attrs: {
              type: mediaType,
              id: mediaId,
              collection: mediaCollection
            }
          };
        }
        break;
      case NodeType.mediaGroup:
        if (content) {
          return {
            type,
            content
          };
        }
        break;
      case NodeType.mention: {
        const { attrs, text } = node;
        let mentionText = '';
        let mentionId;
        if (attrs) {
          const { text, displayName, id } = attrs;
          mentionText = text || displayName;
          mentionId = id;
        }

        if (!mentionText) {
          mentionText = text || '@unknown';
        }

        if (mentionText && mentionId) {
          return {
            type,
            attrs: {
              id: mentionId,
              text: mentionText
            }
          };
        }
        break;
      }
      case NodeType.paragraph: {
        if (content) {
          return {
            type,
            content
          };
        }
        break;
      }
      case NodeType.textWrapper: {
        const { content } = node;
        if (content && content.length) {
          return {
            type,
            content
          };
        }
        break;
      }
      case NodeType.text: {
        const { marks } = node as TextNode;
        if (text) {
          return {
            type,
            text,
            marks: marks || []
          };
        }
        break;
      }
    }
  }

  return {
    type: NodeType[NodeType.unknown],
    text,
    attrs,
    content
  };

};

export const renderNode = (node: Renderable, servicesConfig?: ServicesConfig, eventHandlers?: EventHandlers, index: number = 0) => {
  const validNode = getValidNode(node);
  const nodeContent = mergeTextNodes(validNode.content || []);
  const key = `${validNode.type}-${index}`;

  switch (NodeType[validNode.type]) {
    case NodeType.doc:
      return <Doc key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</Doc>;
    case NodeType.emoji: {
      const emojiId = validNode.attrs as EmojiId;
      const emojiProvider = servicesConfig && servicesConfig.getEmojiProvider && servicesConfig.getEmojiProvider();
      return <Emoji key={key} emojiId={emojiId} emojiProvider={emojiProvider} />;
    }
    case NodeType.hardBreak:
      return <Hardbreak key={key} />;
    case NodeType.mediaGroup:
      return (
        <MediaGroup
          key={key}
          numOfCards={nodeContent.length}
        >
          {nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}
        </MediaGroup>);
    case NodeType.media:
      let provider;
      if (servicesConfig && servicesConfig.getMediaProvider) {
        provider = servicesConfig.getMediaProvider();
      }
      const { media } = eventHandlers || { media: {} };
      const { onClick } = media || { onClick: () => {} };
      return (
        <Media
          key={key}
          mediaProvider={provider}
          item={validNode as MediaNode}
          onClick={onClick}
        />);
    case NodeType.mention: {
      const { attrs } = validNode;
      const { id, text } = attrs as { id: string, text: string };
      const { mention } = eventHandlers || { mention: {} };
      const { onClick, onMouseEnter, onMouseLeave } = mention || { onClick: () => {}, onMouseEnter: () => {}, onMouseLeave: () => {}};

      if (servicesConfig && servicesConfig.getMentionProvider) {
        return (
          <ResourcedMention
            key={key}
            id={id}
            text={text}
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
          text={text}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />);
    }
    case NodeType.paragraph:
      return <Paragraph key={key}>{nodeContent.map((child, index) => renderNode(child, servicesConfig, eventHandlers, index))}</Paragraph>;
    case NodeType.textWrapper:
      return renderTextNodes(validNode.content as TextNode[]);
    case NodeType.text:
      return renderTextNodes([validNode as TextNode]);
    default: {
      // Try render text of unkown node
      if (validNode.attrs && validNode.attrs.text) {
        return validNode.attrs.text;
      } else if (validNode.text) {
        return validNode.text;
      }

      // Node is unkown or invalid and can't be rendered
      if (NodeType[node.type] === NodeType.doc) {
        return <div>Unknown document</div>;
      }

      if (NodeType[node.type]) {
        return `Unknown format: "${node.type}"`;
      }

      return `Unknown type: "${node.type}"`;
    }
  }
};
