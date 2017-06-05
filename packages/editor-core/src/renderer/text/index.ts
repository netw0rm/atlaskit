import {
  Fragment,
  Mark,
  Node as PMNode,
  Schema,
} from '../../prosemirror';

import nodesToText from './nodes';
import applyMark from './marks';
import { Serializer } from '../';

export interface PreparedNode {
  text: string;
  isBlock: boolean;
}

const BLOCK_NODES_DELIMITER = '\n';
const INLINE_NODES_DELIMITER = ' ';

const serializePrepared = (nodes: PreparedNode[]) => {
  const inlineNodes: string[] = [];
  const blockChunks: string[] = [];

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].isBlock) {
      if (inlineNodes.length) {
        blockChunks.push(joinInline(inlineNodes));
        inlineNodes.length = 0;
      }

      blockChunks.push(nodes[i].text);
    } else {
      inlineNodes.push(nodes[i].text);
    }

    if (i + 1 === nodes.length && inlineNodes.length) {
      blockChunks.push(joinInline(inlineNodes));
      inlineNodes.length = 0;
    }
  }

  return blockChunks.join(BLOCK_NODES_DELIMITER);
};

const joinInline = (nodes: string[]): string => {
  return nodes.reduce((memo: string, text: string) => {
    if (!memo.length) {
      return text;
    }

    // try to avoid duplicating spaces
    const delimiter = (memo.slice(-1) === ' ' || /^\s/.test(text))
      ? ''
      : INLINE_NODES_DELIMITER;

    return memo + delimiter + text;
  }, '');
};

const applyMarksToNodeText = (text: string, marks: Mark[]): string => {
  let nodeText = text || '';
  marks.forEach(mark => {
    nodeText = applyMark(nodeText, mark);
  });

  return nodeText;
};

const serializeFragment = (fragment: Fragment) => {
  const preparedNodes: PreparedNode[] = [];

  fragment.forEach(node => {
    const text = serializeNode(node);

    preparedNodes.push({
      text: applyMarksToNodeText(text, node.marks),
      isBlock: node.isBlock,
    });
  });

  return serializePrepared(preparedNodes);
};

export const serializeNode = (node: PMNode): string => {
  let text;

  if (nodesToText[node.type.name]) {
    text = nodesToText[node.type.name](node);
  } else if (node.isBlock) {
    text = serializeFragment(node.content);
  } else {
    text = node.text || '';
  }

  return text;
};

export default class TextSerializer implements Serializer<string> {
  serializeFragment(fragment: Fragment): string {
    return serializeFragment(fragment);
  }

  static fromSchema(schema: Schema<any, any>): TextSerializer {
    return new TextSerializer();
  }
}
