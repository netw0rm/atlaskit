import {
  Fragment,
  Node as PMNode,
} from '@atlaskit/editor-core';

import {
  JIRASchema,
  isSchemaWithBlockQuotes,
  isSchemaWithCodeBlock,
  isSchemaWithLists,
  isSchemaWithMentions,
} from '../schema';

export interface JIRACustomEncoders {
  mention?: (userId: string) => string;
}

export default function encode(node: PMNode, schema: JIRASchema, customEncoders: JIRACustomEncoders = {}) {
  const doc = makeDocument();
  doc.body.appendChild(encodeFragment(node.content));
  const html = doc.body.innerHTML;

  // JIRA encodes empty documents as an empty string
  if (html === '<p></p>') {
    return '';
  }

  // Normalise to XHTML style self closing tags.
  return html
    .replace(/<br><\/br>/g, '<br />')
    .replace(/<br>/g, '<br />')
    .replace(/<hr><\/hr>/g, '<hr />')
    .replace(/<hr>/g, '<hr />');

  function encodeNode(node: PMNode): DocumentFragment | Text | HTMLElement {
    const {
      blockquote,
      bulletList,
      codeBlock,
      hardBreak,
      heading,
      listItem,
      mention,
      orderedList,
      paragraph,
      rule,
    } = schema.nodes;

    if (node.isText) {
      return encodeText(node);
    } else if (node.type === heading) {
      return encodeHeading(node);
    } else if (node.type === rule) {
      return encodeHorizontalRule();
    } else if (node.type === paragraph) {
      return encodeParagraph(node);
    } else if (node.type === hardBreak) {
      return encodeHardBreak();
    }

    if (isSchemaWithLists(schema)) {
      if (node.type === bulletList) {
        return encodeBulletList(node);
      } else if (node.type === orderedList) {
        return encodeOrderedList(node);
      } else if (node.type === listItem) {
        return encodeListItem(node);
      }
    }

    if (isSchemaWithMentions(schema) && node.type === mention) {
      return encodeMention(node, customEncoders.mention);
    }

    if (isSchemaWithCodeBlock(schema) && node.type === codeBlock) {
      return encodeCodeBlock(node);
    }

    if (isSchemaWithBlockQuotes(schema) && node.type === blockquote) {
      return encodeBlockQuote(node);
    }

    throw new Error(`Unexpected node '${(node as any).type.name}' for HTML encoding`);
  }

  function makeDocument() {
    const doc = document.implementation.createHTMLDocument('');
    doc.body = doc.createElement('body');
    doc.documentElement.appendChild(doc.body);
    return doc;
  }

  function encodeFragment(fragment: Fragment) {
    const documentFragment = doc.createDocumentFragment();
    fragment.forEach(node => documentFragment.appendChild(encodeNode(node)!));
    return documentFragment;
  }

  function encodeHeading(node: PMNode) {
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
    elem.appendChild(anchor);
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
      const {
        code,
        em,
        link,
        mentionQuery,
        strike,
        strong,
        subsup,
        underline,
      } = schema.marks;

      for (const mark of node.marks) {
        switch (mark.type) {
          case strong:
            elem = elem.appendChild(doc.createElement('b'));
            break;
          case em:
            elem = elem.appendChild(doc.createElement('em'));
            break;
          case code:
            elem = elem.appendChild(doc.createElement('tt'));
            break;
          case strike:
            elem = elem.appendChild(doc.createElement('del'));
            break;
          case underline:
            elem = elem.appendChild(doc.createElement('ins'));
            break;
          case subsup:
            elem = elem.appendChild(doc.createElement(mark.attrs['type']));
            break;
          case link:
            const linkElem = doc.createElement('a');
            const href = mark.attrs['href'];

            // Handle external links e.g. links which start with http://, https://, ftp://, //
            if (href.match(/\w+:\/\//) || href.match(/^\/\//) || href.match('mailto:')) {
              linkElem.setAttribute('class', 'external-link');
              linkElem.setAttribute('href', href);
              linkElem.setAttribute('rel', 'nofollow');
            } else {
              linkElem.setAttribute('href', href);
            }

            if (mark.attrs['title']) {
              linkElem.setAttribute('title', mark.attrs['title']);
            }

            elem = elem.appendChild(linkElem);
            break;
          case mentionQuery:
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
    elem.setAttribute('class', 'alternate');
    elem.setAttribute('type', 'disc');
    elem.appendChild(encodeFragment(node.content));
    for (let index = 0; index < elem.childElementCount; index++) {
      elem.children[index].setAttribute('data-parent', 'ul');
    }

    return elem;
  }

  function encodeOrderedList(node: PMNode) {
    const elem = doc.createElement('ol');
    elem.appendChild(encodeFragment(node.content));
    for (let index = 0; index < elem.childElementCount; index++) {
      elem.children[index].setAttribute('data-parent', 'ol');
    }
    return elem;
  }

  function encodeListItem(node: PMNode) {
    const elem = doc.createElement('li');
    if (node.content.childCount) {
      node.content.forEach(childNode => {
        if (childNode.type === schema.nodes.bulletList || childNode.type === schema.nodes.orderedList) {
          const list = encodeNode(childNode)!;

          /**
           * Changing type for nested list:
           *
           * Second level -> circle
           * Third and deeper -> square
           */
          if (list instanceof HTMLElement && list.tagName === 'UL') {
            list.setAttribute('type', 'circle');

            [].forEach.call(list.querySelectorAll('ul'), ul => {
              ul.setAttribute('type', 'square');
            });
          }

          elem.appendChild(list);
        } else {
          // Strip the paragraph node from the list item.
          elem.appendChild(encodeFragment((childNode as PMNode).content));
        }
      });
    }
    return elem;
  }

  function encodeMention(node: PMNode, encoder?: (userId: string) => string) {
    const elem = doc.createElement('a');
    elem.setAttribute('class', 'user-hover');
    elem.setAttribute('href', encoder ? encoder(node.attrs.id) : node.attrs.id);
    elem.setAttribute('rel', node.attrs.id);
    elem.innerText = node.attrs.text;
    return elem;
  }

  function encodeCodeBlock(node: PMNode) {
    const elem = doc.createElement('div');
    elem.setAttribute('class', 'code panel');

    const content = doc.createElement('div');
    content.setAttribute('class', 'codeContent panelContent');

    const pre = doc.createElement('pre');
    // java is default language for JIRA
    pre.setAttribute('class', `code-${(node.attrs.language || 'java').toLocaleLowerCase()}`);
    pre.appendChild(encodeFragment(node.content));

    content.appendChild(pre);
    elem.appendChild(content);

    return elem;
  }

  function encodeBlockQuote(node: PMNode) {
    const elem = doc.createElement('blockquote');
    elem.appendChild(encodeFragment(node.content));
    return elem;
  }
}
