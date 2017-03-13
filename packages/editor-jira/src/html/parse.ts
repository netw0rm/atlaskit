import { Fragment, Mark, Node as PMNode } from '@atlaskit/editor-core';
import { isSchemaWithLists, isSchemaWithMentions, isSchemaWithLinks, JIRASchema } from '../schema';
import parseHtml from './parse-html';
import WeakMap from './weak-map';

const convertedNodes = new WeakMap();

export default function parse(html: string, schema: JIRASchema) {
  const dom = parseHtml(html).querySelector('body')!;
  const nodes = bfsOrder(dom);

  // JIRA encodes empty content as a single nbsp
  if (nodes.length === 1 && nodes[0].textContent === '\xa0') {
    return schema.nodes.doc.create({}, schema.nodes.paragraph.create());
  }

  // Process through nodes in reverse (so deepest child elements are first).
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    const content = getContent(node);
    const candidate = convert(content, node, schema);
    if (typeof candidate !== 'undefined') {
      convertedNodes.set(node, candidate);
    }
  }

  const content = getContent(dom);

  // Dangling inline nodes can't be directly inserted into a document, so
  // we attempt to wrap in a paragraph.
  const compatibleContent = schema.nodes.doc.validContent(content)
    ? content
    : ensureBlocks(content, schema);
  return schema.nodes.doc.createChecked({}, compatibleContent);
}

/**
 * Ensure that each node in the fragment is a block, wrapping
 * in a block node if necessary.
 */
function ensureBlocks(fragment: Fragment, schema: JIRASchema): Fragment {
  // If all the nodes are inline, we want to wrap in a single paragraph.
  if (schema.nodes.paragraph.validContent(fragment)) {
    return Fragment.fromArray([schema.nodes.paragraph.createChecked({}, fragment)]);
  }

  // Either all the nodes are blocks, or a mix of inline and blocks.
  // We convert each (if any) inline nodes to blocks.
  const blockNodes: PMNode[] = [];

  fragment.forEach(child => {
    if (child.isBlock) {
      blockNodes.push(child);
    } else {
      blockNodes.push(schema.nodes.paragraph.createChecked({}, child));
    }
  });

  return Fragment.fromArray(blockNodes);
}

function convert(content: Fragment, node: Node, schema: JIRASchema): Fragment | PMNode | null | undefined {
  // text
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    return text ? schema.text(text) : null;
  }

  // marks and nodes
  if (node instanceof HTMLElement) {
    const tag = node.tagName.toUpperCase();
    switch (tag) {
      // Marks
      case 'DEL':
        return content ? addMarks(content, [schema.marks.strike.create()]) : null;
      case 'B':
        return content ? addMarks(content, [schema.marks.strong.create()]) : null;
      case 'EM':
        return content ? addMarks(content, [schema.marks.em.create()]) : null;
      case 'TT':
        return content ? addMarks(content, [schema.marks.mono.create()]) : null;
      case 'SUB':
      case 'SUP':
        const type = tag === 'SUB' ? 'sub' : 'sup';
        return content ? addMarks(content, [schema.marks.subsup.create({ type })]) : null;
      case 'INS':
        return content ? addMarks(content, [schema.marks.u.create()]) : null;
      // Nodes
      case 'A':
        const isAnchor = node.attributes.getNamedItem('href') === null;

        if (node.className === 'user-hover' && isSchemaWithMentions(schema)) {
          return schema.nodes.mention!.createChecked({
            id: node.getAttribute('rel'),
            displayName: node.innerText
          });
        }

        if (isAnchor) {
          return null;
        }

        return content && isSchemaWithLinks(schema)
          ? addMarks(
              content,
              [schema.marks.link!.create({
                href: node.getAttribute('href'),
                title: node.getAttribute('title')
              })]
            )
          : null;
      // case 'SPAN':
      //   return addMarks(content, marksFromStyle(node.style));
      case 'H1':
      case 'H2':
      case 'H3':
      case 'H4':
      case 'H5':
      case 'H6':
        const level = Number(tag.charAt(1));
        return schema.nodes.heading.createChecked({ level }, content);
      case 'BR':
        return schema.nodes.hard_break.createChecked();
      case 'HR':
        return schema.nodes.horizontal_rule.createChecked();
      case 'P':
        return schema.nodes.paragraph.createChecked({}, content);
    }

    // lists
    if (isSchemaWithLists(schema)) {
      switch (tag) {
        case 'UL':
          return schema.nodes.bullet_list!.createChecked({}, content);
        case 'OL':
          return schema.nodes.ordered_list!.createChecked({}, content);
        case 'LI':
          const compatibleContent = schema.nodes.list_item!.validContent(content)
            ? content
            : ensureBlocks(content, schema);
          return schema.nodes.list_item!.createChecked({}, compatibleContent);
      }
    }
  }

  // debug
  let repr = node.toString();
  if (node instanceof HTMLElement) {
    repr = (node.cloneNode(false) as HTMLElement).outerHTML;
  }
  throw new Error(`Unable to handle node ${repr}`);
}

/*
 * Flattens DOM tree into single array
 */
function bfsOrder(root: Node) {
  const inqueue = [root];
  const outqueue = [] as Node[];

  let elem;
  while (elem = inqueue.shift()) {
    outqueue.push(elem);
    let childIndex;
    for (childIndex = 0; childIndex < elem.childNodes.length; childIndex++) {
      const child = elem.childNodes[childIndex];
      switch (child.nodeType) {
        case Node.ELEMENT_NODE:
        case Node.TEXT_NODE:
          inqueue.push(child);
          break;
        default:
          console.error(`Not pushing: ${child.nodeType} ${child.nodeName}`);
      }
    }
  }
  outqueue.shift();
  return outqueue;
}

/*
 * Contructs a struct string of replacement blocks and marks for a given node
 */
function getContent(node: Node): Fragment {
  let fragment = Fragment.fromArray([]);
  let childIndex;
  for (childIndex = 0; childIndex < node.childNodes.length; childIndex++) {
    const child = node.childNodes[childIndex];
    const thing = convertedNodes.get(child);
    if (thing instanceof Fragment || thing instanceof PMNode) {
      fragment = fragment.append(Fragment.from(thing));
    }
  }
  return fragment;
}

/**
 * Create a fragment by adding a set of marks to each node.
 */
function addMarks(fragment: Fragment, marks: Mark[]): Fragment {
  let result = fragment;
  for (let i = 0; i < fragment.childCount; i++) {
    const child = result.child(i);
    let newChild = child;
    for (const mark of marks) {
      newChild = newChild.mark(mark.addToSet(newChild.marks));
    }
    result = result.replaceChild(i, newChild);
  }
  return result;
}
