import {
  Fragment,
  Mark,
  Node as PMNode,
  Schema
} from '../../';
import { rgbToHex, isRGB } from '../../utils/color';

/**
 * Deduce a set of marks from a style declaration.
 */
export function marksFromStyle(schema: Schema<any, any>, style: CSSStyleDeclaration): Mark[] {
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
      case 'color':
        if (value.match(/(0?\.?\d{1,3})%?\b/g)) {
          const color = isRGB(value) ? rgbToHex(value) : value;
          marks = schema.marks.textColor.create({ color: color }).addToSet(marks);
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
 * Create a fragment by adding a set of marks to each node.
 */
export function addMarks(fragment: Fragment, marks: Mark[]): Fragment {
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

export function getNodeMarkOfType(node: PMNode, markType): Mark | null {
  if (!node.marks) {
    return null;
  }
  const foundMarks = node.marks.filter(mark => mark.type.name === markType.name);
  return foundMarks.length ? foundMarks[foundMarks.length - 1] : null;
}

/**
 *
 * Traverse the DOM node and build an array of the breadth-first-search traversal
 * through the tree.
 *
 * Detection of supported vs unsupported content happens at this stage. Unsupported
 * nodes do not have their children traversed. Doing this avoids attempting to
 * decode unsupported content descendents into ProseMirror nodes.
 */
export function findTraversalPath(roots: Node[]) {
  const inqueue = [...roots];
  const outqueue = [] as Node[];

  let elem;
  while (elem = inqueue.shift()) {
    outqueue.push(elem);
    let children;
    if (isNodeSupportedContent(elem) && (children = childrenOfNode(elem))) {
      let childIndex;
      for (childIndex = 0; childIndex < children.length; childIndex++) {
        const child = children[childIndex];
        inqueue.push(child);
      }
    }
  }
  return outqueue;
}

function childrenOfNode(node: Element): NodeList | null {
  const tag = getNodeName(node);
  if (tag === 'AC:STRUCTURED-MACRO') {
    return getAcTagChildNodes(node, 'AC:RICH-TEXT-BODY');
  }

  return node.childNodes;
}
/**
 * Return an array containing the child nodes in a fragment.
 *
 * @param fragment
 */
export function children(fragment: Fragment): PMNode[] {
  const nodes: PMNode[] = [];
  for (let i = 0; i < fragment.childCount; i++) {
    nodes.push(fragment.child(i));
  }
  return nodes;
}

/**
 * Quickly determine if a DOM node is supported (i.e. can be represented in the ProseMirror
 * schema).
 *
 * When a node is not supported, its children are not traversed — instead the entire node content
 * is stored inside an `unsupportedInline`.
 *
 * @param node
 */
function isNodeSupportedContent(node: Node): boolean {
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
    return true;
  }

  if (node instanceof HTMLElement || node.nodeType === Node.ELEMENT_NODE) {
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
      case 'A':
      case 'FAB:MENTION':
      case 'FAB:MEDIA':
      case 'AC:STRUCTURED-MACRO':
        return true;
    }
  }

  return false;
}

export function getAcName(node: Element): string | undefined {
  return (node.getAttribute('ac:name') || '').toUpperCase();
}

export function getNodeName(node: Node): string {
  return node.nodeName.toUpperCase();
}

export function getAcParameter(node: Element, parameter: string): string | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === 'AC:PARAMETER' && getAcName(child) === parameter.toUpperCase()) {
      return child.textContent;
    }
  }

  return null;
}

export function getAcTagContent(node: Element, tagName: string): string | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === tagName) {
      return child.textContent;
    }
  }

  return null;
}

export function getAcTagChildNodes(node: Element, tagName: string): NodeList | null {
  const child = getAcTagNode(node, tagName);
  if (child) {
    // return html collection only if childNodes are found
    return child.childNodes.length ? child.childNodes : null;
  }
  return null;
}

export function getAcTagNode(node: Element, tagName: string): Element | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === tagName) {
      return child;
    }
  }
  return null;
}

export function getMacroAttribute(node: Element, attribute: string): string {
  return (node.getAttribute('data-macro-' + attribute) || '');
}

export function getMacroParameters(node: Element): any {
  const params = {};

  getMacroAttribute(node, 'parameters').split('|').forEach(paramStr => {
    const param = paramStr.split('=');
    if (param.length) {
      params[param[0]] = param[1];
    }
  });
  return params;
}

export function createCodeFragment(schema: Schema<any, any>, codeContent: string, language?: string | null, title?: string | null): Fragment {
  const content: PMNode[] = [];
  let nodeSize = 0;

  if (!!title) {
    const titleNode = schema.nodes.heading.create({ level: 5 }, schema.text(title, [schema.marks.strong.create()]));
    content.push(titleNode);
    nodeSize += titleNode.nodeSize;
  }

  const codeBlockNode = schema.nodes.codeBlock.create({ language }, schema.text(codeContent));

  content.push(codeBlockNode);
  nodeSize += codeBlockNode.nodeSize;

  return Fragment.from(content);
}

export function hasClass(node: Element, className: string): boolean {
  if (node && node.className) {
    return node.className.indexOf(className) > -1;
  }
  return false;
}

/*
 * Contructs a struct string of replacement blocks and marks for a given node
 */
export function getContent(node: Node, convertedNodes: WeakMap<Node, Fragment | PMNode>): Fragment {
  let fragment = Fragment.fromArray([]);
  for (let childIndex = 0; childIndex < node.childNodes.length; childIndex++) {
    const child = node.childNodes[childIndex];
    const thing = convertedNodes.get(child);
    if (thing instanceof Fragment || thing instanceof PMNode) {
      fragment = fragment.append(Fragment.from(thing));
    }
  }
  return fragment;
}
