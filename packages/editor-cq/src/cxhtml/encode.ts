import {
  Fragment,
  Node as PMNode
} from '@atlaskit/editor-core';
import schema from '../schema';
import parseCxhtml from './parse-cxhtml';
import encodeCxhtml, { AC_XMLNS } from './encode-cxhtml';

export default function encode(node: PMNode) {
  const docType = document.implementation.createDocumentType('html', '-//W3C//DTD XHTML 1.0 Strict//EN', 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd');
  const doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', docType);

  return encodeCxhtml(encodeFragment(node.content));

  function encodeNode(node: PMNode) {
    if (node.isText) {
      return encodeText(node);
    } else if (node.type === schema.nodes.blockquote) {
      return encodeBlockquote(node);
    } else if (node.type === schema.nodes.bulletList) {
      return encodeBulletList(node);
    } else if (node.type === schema.nodes.heading) {
      return encodeHeading(node);
    } else if (node.type === schema.nodes.rule) {
      return encodeHorizontalRule();
    } else if (node.type === schema.nodes.listItem) {
      return encodeListItem(node);
    } else if (node.type === schema.nodes.orderedList) {
      return encodeOrderedList(node);
    } else if (node.type === schema.nodes.paragraph) {
      return encodeParagraph(node);
    } else if (node.type === schema.nodes.hardBreak) {
      return encodeHardBreak();
    } else if (node.type === schema.nodes.codeBlock) {
      return encodeCodeBlock(node);
    } else if (node.type === schema.nodes.mention) {
      return encodeMention(node);
    } else if (node.type === schema.nodes.unsupportedBlock || node.type === schema.nodes.unsupportedInline) {
      return encodeUnsupported(node);
    } else {
      throw new Error(`Unexpected node '${(node as PMNode).type.name}' for CXHTML encoding`);
    }
  }

  function encodeBlockquote(node: PMNode) {
    const elem = doc.createElement('blockquote');
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeFragment(fragment: Fragment) {
    const documentFragment = doc.createDocumentFragment();
    fragment.forEach(node => {
      const domNode = encodeNode(node);
      if (domNode) {
        documentFragment.appendChild(domNode);
      }
    });
    return documentFragment;
  }

  function encodeHeading(node: PMNode) {
    const elem = doc.createElement(`h${node.attrs.level}`);
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeParagraph(node: PMNode) {
    const elem = doc.createElement('p');
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeText(node: PMNode) {
    if (node.text) {
      const root = doc.createDocumentFragment();
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
          case schema.marks.underline:
            elem = elem.appendChild(doc.createElement('u'));
            break;
          case schema.marks.subsup:
            elem = elem.appendChild(doc.createElement(mark.attrs['type']));
            break;
          case schema.marks.code:
            elem = elem.appendChild(doc.createElement('code'));
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

  function encodeBulletList(node: PMNode) {
    const elem = doc.createElement('ul');
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeOrderedList(node: PMNode) {
    const elem = doc.createElement('ol');
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeListItem(node: PMNode) {
    const elem = doc.createElement('li');
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }

  function encodeCodeBlock(node: PMNode) {
    const elem = doc.createElementNS(AC_XMLNS, 'ac:structured-macro');
    elem.setAttributeNS(AC_XMLNS, 'ac:name', 'code');
    elem.setAttributeNS(AC_XMLNS, 'ac:schema-version', '1');

    if (node.attrs.language) {
      const langParam = doc.createElementNS(AC_XMLNS, 'ac:parameter');
      langParam.setAttributeNS(AC_XMLNS, 'ac:name', 'language');
      langParam.textContent = mapCodeLanguage(node.attrs.language);
      elem.appendChild(langParam);
    }

    const plainTextBody = doc.createElementNS(AC_XMLNS, 'ac:plain-text-body');
    const fragment = doc.createDocumentFragment();
    (node.textContent || '').split(/]]>/g).map((value, index, array) => {
        const isFirst = index === 0;
        const isLast = index === array.length - 1;
        const prefix = isFirst ? '' : '>';
        const suffix = isLast ? '' : ']]';
        return doc.createCDATASection(prefix + value + suffix);
    }).forEach(cdata => fragment.appendChild(cdata));

    plainTextBody.appendChild(fragment);
    elem.appendChild(plainTextBody);

    return elem;
  }

  function encodeMention(node: PMNode) {
    const elem = doc.createElement('fab:mention');
    elem.setAttribute('atlassian-id', node.attrs['atlassianId']);

    const cdata = doc.createCDATASection(node.attrs['user']);
    elem.appendChild(cdata);

    return elem;
  }

  function encodeUnsupported(node: PMNode) {
    const domNode = parseCxhtml(node.attrs.cxhtml || '').querySelector('body')!.firstChild;
    if (domNode) {
      return doc.importNode(domNode, true);
    }
  }

  function mapCodeLanguage(language: string): string {
    const map = {
      'shell': 'bash',
      'cSharp': 'c#',
      'c++': 'cpp',
      'erlang': 'erl',
      'javafx': 'jfx',
      'javascript': 'js',
      'python': 'py',
    };

    return map[language.toLowerCase()] || language.toLowerCase();
  }
}
