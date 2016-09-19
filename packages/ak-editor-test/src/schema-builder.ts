import { Fragment, Node, Slice } from 'ak-editor-prosemirror';
import schema from 'ak-editor-schema';
import matches from './matches';

type position = number;
export type Refs = {[name: string]: position};
export type BuilderContent = string | Node | Node[];
type RefsContent = RefsNode | RefsNode[];

/**
 * ProseMirror doesn't support empty text nodes, so this class provides a way to
 * insert refs into the builder without needing to actually insert a node.
 */
export class RefsTrackingNode {
  refs: Refs;
}

export interface RefsNode extends Node {
  refs: Refs;
}

/**
 * Create a text node.
 *
 * Special markers called "refs" can be put in the text. Refs provide a way to
 * get a reference to the position in text after the node has been constructed.
 */
export function text(value: string): RefsNode | RefsTrackingNode {
  let stripped = "";
  let textIndex = 0;
  let refs: Refs = {};

  for (let match of matches(value, /{(\w+|<|>|<>)}/g)) {
    const [refToken, refName] = match;
    stripped += value.slice(textIndex, match.index);
    refs[refName] = stripped.length;
    textIndex = match.index + refToken.length
  }

  stripped += value.slice(textIndex);

  const node = stripped === ""
    ? new RefsTrackingNode()
    : schema.text(stripped) as RefsNode;

  node.refs = refs;
  return node;
}

/**
 * Offset ref position values by some amount.
 */
export function offsetRefs(refs: Refs, offset: number): Refs {
  const result = {} as Refs;
  for (const name in refs) {
    result[name] = refs[name] + offset;
  }
  return result;
}

/**
 * Given a collection of nodes, sequence them in an array and return the result
 * along with the updated refs.
 */
export function sequence(...content: (RefsNode | RefsTrackingNode)[]) {
  let position = 0;
  const refs = {} as Refs;
  const nodes = [] as RefsNode[];

  // It's bizarre that this is necessary. An if/else in the for...of should have
  // sufficient but it did not work at the time of writing.
  const isRefsTrackingNode = (n: any): n is RefsTrackingNode => n instanceof RefsTrackingNode;
  const isRefsNode = (n: any): n is RefsNode => !isRefsTrackingNode(n);

  for (const node of content) {
    if (isRefsTrackingNode(node)) {
      Object.assign(refs, offsetRefs(node.refs, position));
    }
    if (isRefsNode(node)) {
      const thickness = node.isText ? 0 : 1;
      Object.assign(refs, offsetRefs(node.refs, position + thickness));
      position += node.nodeSize;
      nodes.push(node as RefsNode);
    }
  }
  return { nodes, refs };
}

/**
 * Given a jagged array, flatten it down to a single level.
 */
export function flatten<T>(deep: (T | T[])[]): T[] {
  const flat = [] as T[];
  for (let item of deep) {
    if (Array.isArray(item)) {
      flat.splice(flat.length, 0, ...item);
    } else {
      flat.push(item);
    }
  }
  return flat;
}

/**
 * Coerce builder content into ref nodes.
 */
export function coerce(content: BuilderContent[]) {
  const refsContent = content
    .map(item => typeof item === 'string'
      ? text(item)
      : item) as RefsContent[];
  return sequence(...flatten(refsContent));
}

/**
 * Create a factory for nodes.
 */
export function nodeFactory(type: string, attrs = {}) {
  const nodeType = schema.nodes[type];

  return function(...content: BuilderContent[]): RefsNode {
    const { nodes, refs } = coerce(content);
    const node = nodeType.create(attrs, nodes) as RefsNode;
    node.refs = refs;
    return node;
  }
}

/**
 * Create a factory for marks.
 */
export function markFactory(type: string, attrs = {}) {
  const mark = schema.mark(type, attrs)
  return (...content: BuilderContent[]) => {
    const { nodes } = coerce(content);
    return nodes
      .map(node => {
        if (mark.type.isInSet(node.marks)) {
          return node;
        } else {
          const refNode = node.mark(mark.addToSet(node.marks)) as RefsNode;
          refNode.refs = node.refs;
          return refNode;
        }
      });
  };
}

export const doc = nodeFactory("doc", {});
export const p = nodeFactory("paragraph", {});
export const blockquote = nodeFactory("blockquote", {});
export const pre = nodeFactory("code_block", {});
export const h1 = nodeFactory("heading", {level: 1});
export const h2 = nodeFactory("heading", {level: 2});
export const h3 = nodeFactory("heading", {level: 3});
export const h4 = nodeFactory("heading", {level: 4});
export const h5 = nodeFactory("heading", {level: 5});
export const h6 = nodeFactory("heading", {level: 6});
export const li = nodeFactory("list_item", {});
export const ul = nodeFactory("bullet_list", {});
export const ol = nodeFactory("ordered_list", {});
export const br = schema.node("hard_break");
export const img = (attrs: { src: string, alt?: string, title?: string }) => schema.node("image", attrs);
export const hr = schema.node("horizontal_rule");
export const em = markFactory("em", {});
export const strong = markFactory("strong", {});
export const code = markFactory("code", {});
export const a = (attrs: { href: string }) => markFactory("link", attrs);
export const fragment = (...content: BuilderContent[]) => flatten<BuilderContent>(content);
export const slice = (...content: BuilderContent[]) => new Slice(new Fragment(flatten<BuilderContent>(content)), 0, 0);
