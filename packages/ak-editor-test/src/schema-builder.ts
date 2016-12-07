import { Fragment, Node, Slice, Schema, MarkType, NodeType } from 'ak-editor-prosemirror';
import schema from './schema';
import matches from './matches';

/**
 * Represents a ProseMirror "position" in a document.
 */
type position = number;

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
type RefsContentItem = RefsNode | RefsTracker;

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
export function text(value: string, _schema: Schema = schema): RefsContentItem {
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
    ? new RefsTracker()
    : _schema.text(stripped) as RefsNode;

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
  const refs = {} as Refs;
  const nodes = [] as RefsNode[];

  // It's bizarre that this is necessary. An if/else in the for...of should have
  // sufficient but it did not work at the time of writing.
  const isRefsTracker = (n: any): n is RefsTracker => n instanceof RefsTracker;
  const isRefsNode = (n: any): n is RefsNode => !isRefsTracker(n);

  for (const node of content) {
    if (isRefsTracker(node)) {
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
export function coerce(content: BuilderContent[], schema: Schema) {
  const refsContent = content
    .map(item => typeof item === 'string'
      ? text(item, schema)
      : item) as (RefsContentItem | RefsContentItem[])[];
  return sequence(...flatten(refsContent));
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

export const doc = nodeFactory(schema.nodes.doc, {});
export const p = nodeFactory(schema.nodes.paragraph, {});
export const blockquote = nodeFactory(schema.nodes.blockquote, {});
export const h1 = nodeFactory(schema.nodes.heading, {level: 1});
export const h2 = nodeFactory(schema.nodes.heading, {level: 2});
export const h3 = nodeFactory(schema.nodes.heading, {level: 3});
export const h4 = nodeFactory(schema.nodes.heading, {level: 4});
export const h5 = nodeFactory(schema.nodes.heading, {level: 5});
export const h6 = nodeFactory(schema.nodes.heading, {level: 6});
export const li = nodeFactory(schema.nodes.list_item, {});
export const ul = nodeFactory(schema.nodes.bullet_list, {});
export const ol = nodeFactory(schema.nodes.ordered_list, {});
export const br = schema.nodes.hard_break.createChecked();
export const code_block = (attrs: {} = {}) => nodeFactory(schema.nodes.code_block, attrs);
export const img = (attrs: { src: string, alt?: string, title?: string }) => schema.nodes.image.createChecked(attrs);
export const emoji = (attrs: { id: string }) => schema.nodes.emoji.createChecked(attrs);
export const mention = (attrs: { id: string, displayName?: string }) => schema.nodes.mention.createChecked(attrs);
export const hr = schema.nodes.horizontal_rule.createChecked();
export const em = markFactory(schema.marks.em, {});
export const strong = markFactory(schema.marks.strong, {});
export const code = markFactory(schema.marks.code, {});
export const del = markFactory(schema.marks.del, {});
export const a = (attrs: { href: string, title?: string }) => markFactory(schema.marks.link, attrs);
export const fragment = (...content: BuilderContent[]) => flatten<BuilderContent>(content);
export const slice = (...content: BuilderContent[]) => new Slice(new Fragment(flatten<BuilderContent>(content)), 0, 0);
