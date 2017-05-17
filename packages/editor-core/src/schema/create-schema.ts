import { NodeSpec, MarkSpec, Schema } from '../prosemirror';

import {
  // Nodes
  doc,
  paragraph,
  text,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  panel,
  rule,
  image,
  mention,
  media,
  mediaGroup,
  hardBreak,
  emoji,

  // Marks
  link,
  em,
  strong,
  strike,
  subsup,
  underline,
  code,
  mentionQuery,
  emojiQuery,
} from '../schema';

const nodesInOrder: SchemaBuiltInItem[] = [
  { name: 'doc', spec: doc },
  { name: 'paragraph', spec: paragraph },
  { name: 'text', spec: text },
  { name: 'bulletList', spec: bulletList },
  { name: 'orderedList', spec: orderedList },
  { name: 'listItem', spec: listItem },
  { name: 'heading', spec: heading },
  { name: 'blockquote', spec: blockquote },
  { name: 'codeBlock', spec: codeBlock },
  { name: 'panel', spec: panel },
  { name: 'rule', spec: rule },
  { name: 'image', spec: image },
  { name: 'mention', spec: mention },
  { name: 'media', spec: media },
  { name: 'mediaGroup', spec: mediaGroup },
  { name: 'hardBreak', spec: hardBreak },
  { name: 'emoji', spec: emoji }
];

const marksInOrder: SchemaBuiltInItem[] = [
  { name: 'link', spec: link },
  { name: 'em', spec: em },
  { name: 'strong', spec: strong },
  { name: 'strike', spec: strike },
  { name: 'subsup', spec: subsup },
  { name: 'underline', spec: underline },
  { name: 'code', spec: code },
  { name: 'mentionQuery', spec: mentionQuery },
  { name: 'emojiQuery', spec: emojiQuery },
];

function addItems(builtInItems: SchemaBuiltInItem[], config: string[], customSpecs: SchemaCustomNodeSpecs | SchemaCustomMarkSpecs = {}) {
  if (!config) {
    return {};
  }

  /**
   * Add built-in Node / Mark specs
   */
  const items = builtInItems.reduce((items, { name, spec }) => {
    if (config.indexOf(name) !== -1) {
      items[name] = customSpecs[name] || spec;
    }

    return items;
  }, {});

  /**
   * Add Custom Node / Mark specs
   */
  return Object.keys(customSpecs).reduce((items, name) => {
    if (items[name]) {
      return items;
    }

    items[name] = customSpecs[name];

    return items;
  }, items);
}

/**
 * Creates a schema preserving order of marks and nodes.
 */
export function createSchema(config: SchemaConfig): Schema<any, any> {
  const { nodes, customNodeSpecs, marks, customMarkSpecs } = config;
  const nodesConfig = Object.keys(customNodeSpecs || {}).concat(nodes);
  const marksConfig = Object.keys(customMarkSpecs || {}).concat(marks || []);
  return new Schema({
    nodes: addItems(nodesInOrder, nodesConfig, customNodeSpecs),
    marks: addItems(marksInOrder, marksConfig, customMarkSpecs)
  });
}

export interface SchemaConfig {
  nodes: string[];
  customNodeSpecs?: SchemaCustomNodeSpecs;
  marks?: string[];
  customMarkSpecs?: SchemaCustomMarkSpecs;
}

export interface SchemaBuiltInItem {
  name: string;
  spec: NodeSpec | MarkSpec;
}

export interface SchemaCustomNodeSpecs { [name: string]: NodeSpec; }
export interface SchemaCustomMarkSpecs { [name: string]: MarkSpec; }
