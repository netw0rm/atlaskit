import marksToText from './marks';

import {
  Fragment,
  Mark,
  Node as PMNode,
} from '../../prosemirror';

export interface NodeSerializerConstructor {
  new (node: PMNode, customNodeSerializers: NodeSerializersMap): NodeSerializerInterface;
}

export interface NodeSerializerInterface {
  serialize: () => string;
}

export type NodeSerializersMap = { [key: string]: NodeSerializerConstructor };

interface PreparedNode {
  text: string;
  isBlock: boolean;
}

const BLOCK_NODES_DELIMITER = '\n';
const INLINE_NODES_DELIMITER = ' ';

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

const applyMarksToNodeText = (text: string, marks: Mark[]): string => {
  let nodeText = text || '';
  marks.forEach(mark => {
    nodeText = applyMark(nodeText, mark);
  });

  return nodeText;
};

export const applyMark = (nodeText: string, mark: Mark): string => {
  return (marksToText[mark.type.name])
    ? marksToText[mark.type.name](nodeText, mark)
    : nodeText;
};

export class BasicNodeSerializer implements NodeSerializerInterface {
  protected node: PMNode;
  protected customNodeSerializers: NodeSerializersMap;

  constructor(node: PMNode, customNodeSerializers: NodeSerializersMap) {
    this.node = node;
    this.customNodeSerializers = customNodeSerializers;
  }

  serialize() {
    const { customNodeSerializers, node } = this;

    return (node.isBlock)
      ? serializeFragment(node.content, customNodeSerializers)
      : node.text || '';
  }
}

export const serializeNode = (node: PMNode, customNodeSerializers: NodeSerializersMap): string => {
  // tslint:disable-next-line:variable-name
  const Serializer = customNodeSerializers[node.type.name] || BasicNodeSerializer;

  const nodeSerializer: NodeSerializerInterface = new Serializer(node, customNodeSerializers);
  return nodeSerializer.serialize();
};

export const serializeFragment = (fragment: Fragment, customNodeSerializers: NodeSerializersMap) => {
  const preparedNodes: PreparedNode[] = [];

  fragment.forEach(node => {
    const text = serializeNode(node, customNodeSerializers);

    preparedNodes.push({
      text: applyMarksToNodeText(text, node.marks),
      isBlock: node.isBlock,
    });
  });

  return serializePrepared(preparedNodes);
};
