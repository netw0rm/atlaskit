import { Fragment, MarkType, Node, NodeType, Schema, Slice } from '../';
import { NodeSpec, MarkSpec } from '../prosemirror';
import matches from './matches';
import sampleSchema from './schema';

/**
 * Represents a ProseMirror "position" in a document.
 */
export type position = number;

/**
 * A useful feature of the builder is being able to declaratively mark positions
 * in content using the curly braces e.g. `{<>}`.
 *
 * These positions are called "refs" (inspired by React), and are tracked on
 * every node in the tree that has a ref on any of its descendants.
 */
export type Refs = { [name: string]: position };

/**
 * Content that contains refs information.
 */
export type RefsContentItem = RefsNode | RefsTracker;

/**
 * Content node or mark builders can consume, e.g.
 *
 *     const builder = nodeFactory('p');
 *     builder('string');
 *     builder(aNode);
 *     builder(aRefsNode);
 *     builder(aRefsTracker);
 *     builder([aNode, aRefsNode, aRefsTracker]);
 */
export type BuilderContent = string | Node | RefsContentItem | (Node | RefsContentItem)[];

/**
 * ProseMirror doesn't support empty text nodes, which can be quite
 * inconvenient when you want to capture a position ref without introducing
 * text.
 *
 * Take a couple of examples:
 *
 *     p('{<>}')
 *     p('Hello ', '{<>}', 'world!')
 *
 * After the ref syntax is stripped you're left with:
 *
 *     p('')
 *     p('Hello ', '', 'world!')
 *
 * This violates the rule of text nodes being non-empty. This class solves the
 * problem by providing an alternative data structure that *only* stores refs,
 * and can be used in scenarios where an empty text would be forbidden.
 *
 * This is done under the hood when using `text()` factory, and instead of
 * always returning a text node, it'll instead return one of two things:
 *
 * - a text node -- when given a non-empty string
 * - a refs tracker -- when given a string that *only* contains refs.
 */
export class RefsTracker {
  refs: Refs;
}

/**
 * A standard ProseMirror Node that also tracks refs.
 */
export interface RefsNode extends Node {
  refs: Refs;
}

/**
 * Create a text node.
 *
 * Special markers called "refs" can be put in the text. Refs provide a way to
 * declaratively describe a position within some text, and then access the
 * position in the resulting node.
 */
export function text(value: string, schema: Schema<NodeSpec, MarkSpec>): RefsContentItem {
  let stripped = '';
  let textIndex = 0;
  const refs: Refs = {};

  for (const match of matches(value, /{(\w+|<|>|<>)}/g)) {
    const [refToken, refName] = match;
    stripped += value.slice(textIndex, match.index);
    refs[refName] = stripped.length;
    textIndex = match.index + refToken.length;
  }

  stripped += value.slice(textIndex);

  const node = stripped === ''
    ? new RefsTracker()
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
export function sequence(...content: RefsContentItem[]) {
  let position = 0;
  let refs = {} as Refs;
  const nodes = [] as RefsNode[];

  // It's bizarre that this is necessary. An if/else in the for...of should have
  // sufficient but it did not work at the time of writing.
  const isRefsTracker = (n: any): n is RefsTracker => n instanceof RefsTracker;
  const isRefsNode = (n: any): n is RefsNode => !isRefsTracker(n);

  for (const node of content) {
    if (isRefsTracker(node)) {
      refs = {...refs, ...offsetRefs(node.refs, position)};
    }
    if (isRefsNode(node)) {
      const thickness = node.isText ? 0 : 1;
      refs = {...refs, ...offsetRefs(node.refs, position + thickness)};
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
  for (const item of deep) {
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
export function coerce(content: BuilderContent[], schema: Schema<NodeSpec, MarkSpec>) {
  const refsContent = content
    .map(item => typeof item === 'string'
      ? text(item, schema)
      : item) as (RefsContentItem | RefsContentItem[])[];
  return sequence(...flatten<RefsContentItem>(refsContent));
}

/**
 * Create a factory for nodes.
 */
export function nodeFactory(type: NodeType, attrs = {}) {
  return function(...content: BuilderContent[]): RefsNode {
    const { nodes, refs } = coerce(content, type.schema);
    const node = type.create(attrs, nodes) as RefsNode;
    node.refs = refs;
    return node;
  };
}

/**
 * Create a factory for marks.
 */
export function markFactory(type: MarkType, attrs = {}) {
  const mark = type.create(attrs);
  return (...content: BuilderContent[]) : RefsNode[] => {
    const { nodes } = coerce(content, type.schema);
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
};

export const doc = nodeFactory(sampleSchema.nodes.doc, {});
export const p = nodeFactory(sampleSchema.nodes.paragraph, {});
export const linkable = nodeFactory(sampleSchema.nodes.linkable, {});
export const unlinkable = nodeFactory(sampleSchema.nodes.unlinkable, {});
export const blockquote = nodeFactory(sampleSchema.nodes.blockquote, {});
export const h1 = nodeFactory(sampleSchema.nodes.heading, {level: 1});
export const h2 = nodeFactory(sampleSchema.nodes.heading, {level: 2});
export const h3 = nodeFactory(sampleSchema.nodes.heading, {level: 3});
export const h4 = nodeFactory(sampleSchema.nodes.heading, {level: 4});
export const h5 = nodeFactory(sampleSchema.nodes.heading, {level: 5});
export const h6 = nodeFactory(sampleSchema.nodes.heading, {level: 6});
export const li = nodeFactory(sampleSchema.nodes.listItem, {});
export const ul = nodeFactory(sampleSchema.nodes.bulletList, {});
export const ol = nodeFactory(sampleSchema.nodes.orderedList, {});
export const br = sampleSchema.nodes.hardBreak.createChecked();
export const panel = nodeFactory(sampleSchema.nodes.panel, {});
export const plain = nodeFactory(sampleSchema.nodes.plain, {});
// tslint:disable-next-line:variable-name
export const code_block = (attrs: {} = {}) => nodeFactory(sampleSchema.nodes.codeBlock, attrs);
export const img = (attrs: { src: string, alt?: string, title?: string }) => sampleSchema.nodes.image.createChecked(attrs);
export const emoji = (attrs: { id: string }) => sampleSchema.nodes.emoji.createChecked(attrs);
export const mention = (attrs: { id: string, displayName?: string }) => sampleSchema.nodes.mention.createChecked(attrs);
export const hr = sampleSchema.nodes.rule.createChecked();
export const em = markFactory(sampleSchema.marks.em, {});
export const subsup = markFactory(sampleSchema.marks.subsup, {});
export const u = markFactory(sampleSchema.marks.u, {});
export const strong = markFactory(sampleSchema.marks.strong, {});
export const code = markFactory(sampleSchema.marks.code, {});
export const strike = markFactory(sampleSchema.marks.strike, {});
export const a = (attrs: { href: string, title?: string }) => markFactory(sampleSchema.marks.link, attrs);
export const fragment = (...content: BuilderContent[]) => flatten<BuilderContent>(content);
export const slice = (...content: BuilderContent[]) => new Slice(Fragment.from(coerce(content, sampleSchema).nodes), 0, 0);
