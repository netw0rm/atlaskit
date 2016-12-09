import schema from '../schema';
import {
  Fragment,
  Node as PMNode,
  TextNode
} from 'ak-editor-prosemirror';

import {
  BulletListNode,
  DocNode,
  HardBreakNode,
  HeadingNode,
  HorizontalRuleNode,
  ListItemNode,
  OrderedListNode,
  ParagraphNode,
  isBulletListNode,
  isDocNode,
  isHardBreakNode,
  isHeadingNode,
  isHorizontalRuleNode,
  isListItemNode,
  isOrderedListNode,
  isParagraphNode
} from 'ak-editor-schema';


export default function encode(node: DocNode) {
  const doc = makeDocument();
  doc.body.appendChild(encodeFragment(node.content));
  const html = doc.body.innerHTML;

  // JIRA encodes empty documents as nbsp
  if (html === '<p></p>') {
    return '&nbsp;';
  }

  return html
    .replace('<br></br>', '<br>')
    .replace('<hr></hr>', '<hr>');

  function encodeNode(node: PMNode) {
    if (isBulletListNode(node)) {
      return encodeBulletList(node);
    } else if (isHeadingNode(node)) {
      return encodeHeading(node);
    } else if (isHorizontalRuleNode(node)) {
      return encodeHorizontalRule();
    } else if (isListItemNode(node)) {
      return encodeListItem(node);
    } else if (isOrderedListNode(node)) {
      return encodeOrderedList(node);
    } else if (isParagraphNode(node)) {
      return encodeParagraph(node);
    } else if (isHardBreakNode(node)) {
      return encodeHardBreak();
    } else if (node.isText) {
      return encodeText(node);
    } else {
      throw new Error(`Unexpected node '${node.type.name}' for HTML encoding`);
    }
  }

  function makeDocument() {
    const doc = document.implementation.createHTMLDocument('');
    doc.body = doc.createElement('body');
    doc.documentElement.appendChild(doc.body);
    return doc;
  }

  function encodeFragment(fragment: Fragment) {
    const documentFragment = doc.createDocumentFragment();
    fragment.forEach(node => documentFragment.appendChild(encodeNode(node)));
    return documentFragment;
  }

  function encodeHeading(node: HeadingNode) {
    function anchorNameEncode(name: string) {
      const noSpaces = name.replace(/ /g, '');
      const uriEncoded = encodeURIComponent(noSpaces);
      const specialsEncoded = uriEncoded
        .replace(/[!'()*]/g, c => ('%' + c.charCodeAt(0).toString(16)));
      return specialsEncoded;
    }

    const elem = doc.createElement(`h${node.attrs.level}`);
    const anchor = doc.createElement('a');
    anchor.setAttribute('name', anchorNameEncode(node.textContent));
    elem.appendChild(anchor)
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeParagraph(node: ParagraphNode) {
    const elem = doc.createElement('p');
    elem.appendChild(encodeFragment(node.content))
    return elem;
  }

  function encodeText(node: TextNode) {
    if (node.text) {
      const root = doc.createDocumentFragment();
      let elem = root as Node;
      for (const mark of node.marks) {
        switch (mark.type) {
          case schema.marks.strong:
            elem = elem.appendChild(doc.createElement('b'));
            break;
          case schema.marks.em:
            elem = elem.appendChild(doc.createElement('em'));
            break;
          case schema.marks.mono:
            elem = elem.appendChild(doc.createElement('tt'));
            break;
          case schema.marks.strike:
            elem = elem.appendChild(doc.createElement('del'));
            break;
          case schema.marks.u:
            elem = elem.appendChild(doc.createElement('ins'));
            break;
          case schema.marks.subsup:
            elem = elem.appendChild(doc.createElement(mark.attrs.type));
            break;
          default:
            throw new Error(`Unable to encode mark '${mark.type.name}'`);
        }
      }

      elem.textContent = node.text;
      return root;
    } else {
      return doc.createTextNode('');
    }
  }

  function encodeHardBreak() {
    return doc.createElement('br');
  }

  function encodeHorizontalRule() {
    return doc.createElement('hr');
  }

  function encodeBulletList(node: BulletListNode) {
    const elem = doc.createElement('ul');
    elem.setAttribute('class', 'alternate');
    elem.setAttribute('type', 'square');
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeOrderedList(node: OrderedListNode) {
    const elem = doc.createElement('ol');
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeListItem(node: ListItemNode) {
    const elem = doc.createElement('li');
    // Strip the paragraph node from the list item.
    if (node.content.childCount) {
      const paragraph = node.content.child(0) as ParagraphNode;
      elem.appendChild(encodeFragment(paragraph.content));
    }
    return elem;
  }
}
