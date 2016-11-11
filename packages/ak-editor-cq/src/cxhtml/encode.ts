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

type HTML = string;

const docType = document.implementation.createDocumentType('html', null, null);
const doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', null, docType);

function encodeFragment(fragment: Fragment) {
	let chunks: string[] = [];
	fragment.forEach(node => chunks.push(encode(node)));
	return chunks.join('');
}

function encodeHeading(node: HeadingNode) {
	const elem = doc.createElement(`h${node.attrs.level}`);
	elem.innerHTML = encodeFragment(node.content);
	return elem.outerHTML;
}

function encodeParagraph(node: ParagraphNode): HTML {
	const elem = doc.createElement('p');
	elem.innerHTML = encodeFragment(node.content);
	return elem.outerHTML;
}

function encodeText(node: TextNode): HTML {
	if (node.text) {
		const root = doc.createElement('div');
		let elem = root as Node;

		for (const mark of node.marks) {
			switch (mark.type) {
				case schema.marks.strong:
					elem = elem.appendChild(doc.createElement('strong'));
					break;
				case schema.marks.em:
					elem = elem.appendChild(doc.createElement('em'));
					break;
				case schema.marks.strike:
					elem = elem.appendChild(doc.createElement('s'));
					break;
				case schema.marks.code:
					elem = elem.appendChild(doc.createElement('code'));
					break;
				case schema.marks.u:
					elem = elem.appendChild(doc.createElement('u'));
					break;
				case schema.marks.subsup:
					elem = elem.appendChild(doc.createElement(mark.attrs.type));
					break;
				default:
					throw new Error(`Unable to encode mark '${mark.type.name}'`);
			}
		}

		elem.textContent = node.text;
		return root.innerHTML;
	} else {
		return '';
	}
}

function encodeHardBreak(): HTML {
	return doc.createElement('br').outerHTML;
}

function encodeHorizontalRule(): HTML {
	return doc.createElement('hr').outerHTML;
}

function encodeBulletList(node: BulletListNode): HTML {
	const elem = doc.createElement('ul');
	elem.innerHTML = encodeFragment(node.content);
	return elem.outerHTML;
}

function encodeOrderedList(node: OrderedListNode): HTML {
	const elem = doc.createElement('ol');
	elem.innerHTML = encodeFragment(node.content);
	return elem.outerHTML;
}

function encodeListItem(node: ListItemNode): HTML {
	const elem = doc.createElement('li');
	elem.innerHTML = encodeFragment(node.content);
	return elem.outerHTML;
}

export default function encode(node: PMNode): HTML {
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
  } else if (isDocNode(node)) {
    return encodeFragment(node.content);
  }

  throw new Error(`Unable to CXHTML encode node of type ${node.type.name}`);
}
