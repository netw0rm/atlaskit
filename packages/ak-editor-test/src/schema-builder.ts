import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { Fragment, Node, Slice } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import { Context } from './';
import matches from './matches';

export const defaultContext = { Fragment, Node, Plugin, Slice, schema };

type position = number;
export type Refs = {[name: string]: position};
type BuilderContent = string | Node | Node[];
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
export function text(value: string, ctx: Context): RefsNode | RefsTrackingNode {
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
    : ctx.schema.text(stripped) as RefsNode;

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
function coerce(content: BuilderContent[], ctx: Context) {
  const refsContent = content
    .map(item => typeof item === 'string'
      ? text(item, ctx)
      : item) as RefsContent[];
  return sequence(...flatten(refsContent));
}

/**
 * Create a factory for nodes.
 */
export function nodeFactory(type: string, attrs = {}, ctx: Context) {
  const nodeType = ctx.schema.nodes[type];

  return function(...content: BuilderContent[]): RefsNode {
    const { nodes, refs } = coerce(content, ctx);
    const node = nodeType.create(attrs, nodes) as RefsNode;
    node.refs = refs;
    return node;
  }
}

/**
 * Create a factory for marks.
 */
export function markFactory(type: string, attrs = {}, ctx: Context) {
  const mark = ctx.schema.mark(type, attrs)
  return (...content: BuilderContent[]) => {
    const { nodes } = coerce(content, ctx);
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

export default function(ctx = defaultContext) {
  return {
    doc: nodeFactory("doc", {}, ctx),
    p: nodeFactory("paragraph", {}, ctx),
    blockquote: nodeFactory("blockquote", {}, ctx),
    pre: nodeFactory("code_block", {}, ctx),
    h1: nodeFactory("heading", {level: 1}, ctx),
    h2: nodeFactory("heading", {level: 2}, ctx),
    li: nodeFactory("list_item", {}, ctx),
    ul: nodeFactory("bullet_list", {}, ctx),
    ol: nodeFactory("ordered_list", {}, ctx),
    br: ctx.schema.node("hard_break"),
    img: (attrs: { src: string, alt?: string, title?: string }) => ctx.schema.node("image", attrs),
    hr: ctx.schema.node("horizontal_rule"),
    em: markFactory("em", {}, ctx),
    strong: markFactory("strong", {}, ctx),
    code: markFactory("code", {}, ctx),
    a: (attrs: { href: string }) => markFactory("link", attrs, ctx),
    text: (value: string) => text(value, ctx),
    fragment: (...content: BuilderContent[]) => flatten<BuilderContent>(content),
    slice: (...content: BuilderContent[]) => new ctx.Slice(new ctx.Fragment(flatten<BuilderContent>(content)), 0, 0),

    /**
     * Insert nodes at the current selection.
     *
     * @returns refs from the inserted nodes, made relative to the document
     *   insertion position
     */
    insert: (pm: ProseMirror, ...content: BuilderContent[]) => {
      const { from, to } = pm.selection;
      const { nodes, refs } = coerce(content, ctx);
      pm.tr.replaceWith(from, to, nodes).apply();
      return offsetRefs(refs, from);
    },
  };
};
