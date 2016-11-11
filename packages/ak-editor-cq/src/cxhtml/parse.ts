import schema from '../schema';
import parseHtml from './parse-html';
import { Fragment, MarkType, Mark, Node as PMNode, TextNode } from 'ak-editor-prosemirror';


const convertedNodes = new WeakMap();

export interface Converter {
  (content: Fragment, node: Node): Fragment | PMNode | null | undefined;
}

export default function(cxhtml: string) {
  const dom = parseHtml(cxhtml).body;
  const nodes = bfsOrder(dom)

  // Process through nodes in reverse (so deepest child elements are first).
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    const content = getContent(node);
    for (const converter of converters) {
      const candidate = converter(content, node);
      if (typeof candidate !== 'undefined') {
        convertedNodes.set(node, candidate);
        break;
      }
    }
  }

  const content = getContent(dom);

  // Dangling inline nodes can't be directly inserted into a document, so
  // we attempt to wrap in a paragraph.
  const compatibleContent = schema.nodes.doc.validContent(content)
    ? content
    : ensureBlocks(content);
  return schema.nodes.doc.createChecked({}, compatibleContent);
}

/*
 * Flattens DOM tree into single array
 */
function bfsOrder(root: Node) {
  const inqueue = [root]
  const outqueue = [] as Node[]

  let elem;
  while (elem = inqueue.shift()) {
    outqueue.push(elem);
    for (const child of elem.childNodes) {
      switch (child.nodeType) {
        case Node.ELEMENT_NODE:
        case Node.TEXT_NODE:
          inqueue.push(child)
          break;
        default:
          console.error(`Not pushing: ${child.nodeType} ${child.nodeName}`);
      }
    }
  }
  outqueue.shift()
  return outqueue
}

/*
 * Contructs a struct string of replacement blocks and marks for a given node
 */
function getContent(node: Node): Fragment {
  let fragment = Fragment.fromArray([]);
  for (const child of node.childNodes) {
    const thing = convertedNodes.get(child);
    if (thing instanceof Fragment) {
      fragment = fragment.append(thing);
    } else if (thing instanceof PMNode) {
      fragment = fragment.addToEnd(thing);
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
      newChild = newChild.mark(mark.addToSet(newChild.marks))
    }
    result = result.replaceChild(i, newChild);
  }
  return result;
}


/**
 * Ensure that each node in the fragment is a block, wrapping
 * in a block node if necessary.
 */
function ensureBlocks(fragment: Fragment): Fragment {
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

/**
 * Deduce a set of marks from a style declaration.
 */
function marksFromStyle(style: CSSStyleDeclaration): Mark[] {
  let marks: Mark[] = [];

  styles: for (let i = 0; i < style.length; i++) {
    const name = style.item(i);
    const value = style.getPropertyValue(name);

    switch (name) {
      case 'text-decoration-color':
      case 'text-decoration-style':
        continue styles;
      case 'text-decoration-line':
      case 'text-decoration':
        switch (value) {
          case 'line-through':
            marks = schema.marks.strike.create().addToSet(marks);
            continue styles;
        }
        break;
    }

    throw new Error(`Unable to derive a mark for CSS ${name}: ${value}`);
  }

  return marks;
}

const converters = <Converter[]> [
  function text(content, node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      return text ? schema.text(text) : null;
    }
  },
	function marksAndNodes(content, node) {
    if (node instanceof HTMLElement) {
      switch (node.tagName) {
        // Marks
        case 'DEL':
        case 'S':
          return content ? addMarks(content, [schema.marks.strike.create()]) : null;
        case 'B':
        case 'STRONG':
          return content ? addMarks(content, [schema.marks.strong.create()]) : null;
        case 'I':
        case 'EM':
          return content ? addMarks(content, [schema.marks.em.create()]) : null;
        case 'CODE':
          return content ? addMarks(content, [schema.marks.code.create()]) : null;
        case 'SUB':
        case 'SUP':
          const type = node.tagName === 'SUB' ? 'sub' : 'sup';
          return content ? addMarks(content, [schema.marks.subsup.create({ type })]) : null;
        case 'U':
          return content ? addMarks(content, [schema.marks.u.create()]) : null;
        // Nodes
        case 'SPAN':
          return addMarks(content, marksFromStyle(node.style));
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6':
          const level = Number(node.tagName.charAt(1));
          return schema.nodes.heading.createChecked({ level }, content);
        case 'BR':
          return schema.nodes.hard_break.createChecked();
        case 'HR':
          return schema.nodes.hr.createChecked();
        case 'UL':
          return schema.nodes.bullet_list.createChecked({}, content);
        case 'OL':
          return schema.nodes.ordered_list.createChecked({}, content);
        case 'LI':
          const compatibleContent = schema.nodes.list_item.validContent(content)
            ? content
            : ensureBlocks(content);
          return schema.nodes.list_item.createChecked({}, compatibleContent);
        case 'P':
          return schema.nodes.paragraph.createChecked({}, content);

      }
    }
	},
	function debugFallback(content, node) {
    let repr = node.toString();

    if (node instanceof HTMLElement) {
      repr = (node.cloneNode(false) as HTMLElement).outerHTML;
    }

    throw new Error(`Unable to handle node ${repr}`);
  }
];
