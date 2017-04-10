import {
  Fragment,
  Mark,
  Node as PMNode
} from '@atlaskit/editor-core';
import schema from '../schema';
import parseCxhtml from './parse-cxhtml';
import encodeCxhtml from './encode-cxhtml';

const convertedNodes = new WeakMap();

export default function(cxhtml: string) {
  const dom = parseCxhtml(cxhtml).querySelector('body')!;
  const nodes = findTraversalPath(Array.prototype.slice.call(dom.childNodes, 0));

  // Process through nodes in reverse (so deepest child elements are first).
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    const content = getContent(node);
    const candidate = converter(content, node);
    if (typeof candidate !== 'undefined') {
      convertedNodes.set(node, candidate);
    }
  }

  const content = getContent(dom);
  const compatibleContent = content.childCount > 0
    // Dangling inline nodes can't be directly inserted into a document, so
    // we attempt to wrap in a paragraph.
    ? schema.nodes.doc.validContent(content)
      ? content
      : ensureBlocks(content)
    // The document must have at least one block element.
    : schema.nodes.paragraph.createChecked({});

  return schema.nodes.doc.createChecked({}, compatibleContent);
}

/**
 * Traverse the DOM node and build an array of the breadth-first-search traversal
 * through the tree.
 *
 * Detection of supported vs unsupported content happens at this stage. Unsupported
 * nodes do not have their children traversed. Doing this avoids attempting to
 * decode unsupported content descendents into ProseMirror nodes.
 */
function findTraversalPath(roots: Node[]) {
  const inqueue = [...roots];
  const outqueue = [] as Node[];

  let elem;
  while (elem = inqueue.shift()) {
    outqueue.push(elem);
    if (isNodeSupportedContent(elem)) {
      let childIndex;
      for (childIndex = 0; childIndex < elem.childNodes.length; childIndex++) {
        const child = elem.childNodes[childIndex];
        switch (child.nodeType) {
          case Node.ELEMENT_NODE:
          case Node.TEXT_NODE:
          case Node.CDATA_SECTION_NODE:
            inqueue.push(child);
            break;
          default:
            console.error(`Not pushing: ${child.nodeType} ${child.nodeName}`);
        }
      }
    }
  }
  return outqueue;
}

/**
 * Quickly determine if a DOM node is supported (i.e. can be represented in the ProseMirror
 * schema).
 *
 * When a node is not supported, its children are not traversed — instead the entire node content
 * is stored inside an `unsupportedInline` or `unsupportedBlock` node.
 *
 * @param node
 */
function isNodeSupportedContent(node: Node): boolean {
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
    return true;
  }

  if (node instanceof HTMLElement) {
    const tag = getNodeName(node);
    switch (tag) {
      case 'DEL':
      case 'S':
      case 'B':
      case 'STRONG':
      case 'I':
      case 'EM':
      case 'CODE':
      case 'SUB':
      case 'SUP':
      case 'U':
      case 'BLOCKQUOTE':
      case 'SPAN':
      case 'H1':
      case 'H2':
      case 'H3':
      case 'H4':
      case 'H5':
      case 'H6':
      case 'BR':
      case 'HR':
      case 'UL':
      case 'OL':
      case 'LI':
      case 'P':
      case 'FAB:MENTION':
        return true;
    }
  }

  return false;
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


/**
 * Ensure that each node in the fragment is a block, wrapping
 * in a block node if necessary.
 */
function ensureBlocks(fragment: Fragment): Fragment {
  // This algorithm is fairly simple:
  //
  // 1. When a block is encountered, keep it as-is.
  // 2. When an unsupported inline is encountered, convert it to an unsupported block.
  // 3. When a sequence of supported (i.e. *not* `unsupportedInline`) inlines is encountered,
  //     wrap it in a a paragraph.
  //
  // There's an assumption/guess in step #2 that all unsupported nodes should be treated as
  // blocks if they exist in the content at a point where blocks are expected.
  //
  // It's seems possible for CXHTML documents to be poorly formed, where inline content exists
  // in positions where block content is expected. For example the top-level content is not wrapped
  // in a paragraph, but is expected to be a top-level block node.
  //
  //     Foo bar baz
  //
  // In this scenario it's effectively wrapped in a paragraph:
  //
  //     <p>Foo bar baz</p>
  //
  // This is more common in places like list items, or block quotes:
  //
  //     <ul>
  //       <li>Foo bar</li>
  //     </ul>
  //     <blockquote>Foo bar</blockquote>
  //
  // Both `<li>` (`listItem`) and `<blockquote>` (`blockQuote`) expect *block* content, and so
  // in both cases `Foo bar` is wrapped in a paragraph.
  const nodes = children(fragment);
  const blocks: PMNode[] = [];

  let i;
  for (i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.isBlock) {
      blocks.push(node);
    } else if (node.type === schema.nodes.unsupportedInline) {
      blocks.push(schema.nodes.unsupportedBlock.create(node.attrs));
    } else {
      // An inline node is found. Now step through until we find the last inline
      // node, then throw everything in a paragraph.
      let j;
      for (j = i + 1; j < nodes.length; j++) {
        const node = nodes[j];
        if (node.isBlock || node.type === schema.nodes.unsupportedInline) {
          break;
        }
      }
      blocks.push(schema.nodes.paragraph.createChecked({}, nodes.slice(i, j)));
      i = j;
    }
  }

  return Fragment.fromArray(blocks);
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
      case 'font-family':
        if (value === 'monospace') {
          marks = schema.marks.code.create().addToSet(marks);
          continue styles;
        }
    }

    throw new Error(`Unable to derive a mark for CSS ${name}: ${value}`);
  }

  return marks;
}

/**
 * Return an array containing the child nodes in a fragment.
 *
 * @param fragment
 */
function children(fragment: Fragment): PMNode[] {
  const nodes: PMNode[] = [];
  for (let i = 0; i < fragment.childCount; i++) {
    nodes.push(fragment.child(i));
  }
  return nodes;
}

function converter(content: Fragment, node: Node): Fragment | PMNode | null | undefined {
  // text
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
    const text = node.textContent;
    return text ? schema.text(text) : null;
  }

  // marks and nodes
  if (node instanceof Element) {
    const tag = getNodeName(node);
    switch (tag) {
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
        const type = tag === 'SUB' ? 'sub' : 'sup';
        return content ? addMarks(content, [schema.marks.subsup.create({ type })]) : null;
      case 'U':
        return content ? addMarks(content, [schema.marks.underline.create()]) : null;
      // Nodes
      case 'BLOCKQUOTE':
        return schema.nodes.blockquote.createChecked({},
          schema.nodes.blockquote.validContent(content)
            ? content
            : ensureBlocks(content)
        );
      case 'SPAN':
        return addMarks(content, marksFromStyle((node as HTMLSpanElement).style));
      case 'H1':
      case 'H2':
      case 'H3':
      case 'H4':
      case 'H5':
      case 'H6':
        const level = Number(tag.charAt(1));
        return schema.nodes.heading.createChecked({ level }, content);
      case 'BR':
        return schema.nodes.hardBreak.createChecked();
      case 'HR':
        return schema.nodes.rule.createChecked();
      case 'UL':
        return schema.nodes.bulletList.createChecked({}, content);
      case 'OL':
        return schema.nodes.orderedList.createChecked({}, content);
      case 'LI':
        return schema.nodes.listItem.createChecked({},
          schema.nodes.listItem.validContent(content)
            ? content
            : ensureBlocks(content)
        );
      case 'P':
        return schema.nodes.paragraph.createChecked({}, content);
      case 'AC:STRUCTURED-MACRO':
        return convertConfluenceMacro(node);
      case 'FAB:MENTION':
        const cdata = node.firstChild!;

        return schema.nodes.mention.create({
          id: node.getAttribute('atlassian-id'),
          displayName: cdata!.nodeValue,
        });
    }
  }

  // All unsupported content is wrapped in an `unsupportedInline` node. Converting
  // `unsupportedInline` to `unsupportedBlock` where appropriate is handled when
  // the content is inserted into a parent.
  return schema.nodes.unsupportedInline.create({ cxhtml: encodeCxhtml(node) });
}

export function getNodeName(node: Node): string {
  return node.nodeName.toUpperCase();
}


function convertConfluenceMacro(node: Element): Fragment | PMNode | null | undefined  {
  const name = getAcName(node);

  switch (name) {
    case 'CODE':
      const language = getAcParameter(node, 'language');
      const title = getAcParameter(node, 'title');
      const codeContent = getAcTagContent(node, 'AC:PLAIN-TEXT-BODY') || ' ';
      const content: PMNode[] = [];
      let nodeSize = 0;

      if (!!title) {
        const titleNode = schema.nodes.paragraph.create({ level: 1 }, schema.text(title, [schema.marks.strong.create()]));
        content.push(titleNode);
        nodeSize += titleNode.nodeSize;
      }

      const codeBlockNode = schema.nodes.codeBlock.create({ language }, schema.text(codeContent));
      content.push(codeBlockNode);
      nodeSize += codeBlockNode.nodeSize;

      return new Fragment(content, nodeSize);

    case 'WARNING':
    case 'INFO':
    case 'NOTE':
    case 'TIP':
      const panelTitle = getAcParameter(node, 'title');
      const panelNodes = getAcTagNodes(node, 'AC:RICH-TEXT-BODY') || '';
      let panelBody: any[] = [];

      if (panelTitle) {
        panelBody.push(
          schema.nodes.heading.create({ level: 3 }, schema.text(panelTitle))
        );
      }

      if (panelNodes) {
        const nodes = Array.prototype.slice.call(panelNodes);

        for (let i = 0, len = nodes.length; i < len; i += 1) {
          const domNode: any = nodes[i];
          const content = Fragment.from([ schema.text(domNode.innerText) ]);
          const pmNode = converter(content, domNode);
          if (pmNode) {
            panelBody.push(pmNode);
          }
        }
      } else {
        panelBody.push(schema.nodes.paragraph.create({}));
      }

      return schema.nodes.panel.create({ panelType: name.toLowerCase() }, panelBody);
  }

  // All unsupported content is wrapped in an `unsupportedInline` node. Converting
  // `unsupportedInline` to `unsupportedBlock` where appropriate is handled when
  // the content is inserted into a parent.
  return schema.nodes.unsupportedInline.create({ cxhtml: encodeCxhtml(node) });
}

function getAcName(node: Element): string | undefined {
  return (node.getAttribute('ac:name') || '').toUpperCase();
}

function getAcParameter(node: Element, parameter: string): string | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === 'AC:PARAMETER' && getAcName(child) === parameter.toUpperCase()) {
      return child.textContent;
    }
  }

  return null;
}

function getAcTagContent(node: Element, tagName: string): string | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === tagName) {
      return child.textContent;
    }
  }

  return null;
}

function getAcTagNodes(node: Element, tagName: string): NodeList | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === tagName) {
      return child.childNodes;
    }
  }

  return null;
}
