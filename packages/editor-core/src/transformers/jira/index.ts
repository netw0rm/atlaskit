import {
  Fragment,
  Node as PMNode,
  Schema,
} from '../../prosemirror';
import { Transformer } from '../transformer';

import parseHtml from './parse-html';
import fixDoc from './fix-doc';

import {
  bfsOrder,
  convert,
  ensureBlocks,
} from './util';

import {
  isSchemaWithLists,
  isSchemaWithMentions,
  isSchemaWithCodeBlock,
  isSchemaWithBlockQuotes,
  isSchemaWithMedia,
} from './schema';

export type CustomEncoder = (userId: string) => string;

export interface JIRACustomEncoders {
  mention?: CustomEncoder;
}

export interface ContextInfo {
  clientId: string;
  serviceHost: string;
  token: string;
  collection: string;
}

export interface MediaContextInfo {
  viewContext?: ContextInfo;
  uploadContext?: ContextInfo;
}

export default class JIRATransformer implements Transformer<string> {
  private schema: Schema<any, any>;
  private customEncoders: JIRACustomEncoders;
  private mediaContextInfo?: MediaContextInfo;
  private doc: Document;

  constructor(schema: Schema<any, any>, customEncoders?: JIRACustomEncoders, mediaContextInfo?: MediaContextInfo) {
    this.schema = schema;
    this.customEncoders = customEncoders || {};
    this.mediaContextInfo = mediaContextInfo;
  }

  encode(node: PMNode): string {
    this.doc = this.makeDocument();
    this.doc.body.appendChild(this.encodeFragment(node.content));
    const html = this.doc.body.innerHTML;

    // JIRA encodes empty documents as an empty string
    if (html === '<p></p>') {
      return '';
    }

    // Normalise to XHTML style self closing tags.
    return html
      .replace(/<br><\/br>/g, '<br />')
      .replace(/<br>/g, '<br />')
      .replace(/<hr><\/hr>/g, '<hr />')
      .replace(/<hr>/g, '<hr />')
      .replace(/&amp;/g, '&');
  }

  parse(html: string): PMNode {
    const convertedNodes = new WeakMap<Node, Fragment | PMNode | null | undefined>();
    const dom = fixDoc(parseHtml(html)).querySelector('body')!;
    const nodes = bfsOrder(dom);

    // JIRA encodes empty content as a single nbsp
    if (nodes.length === 1 && nodes[0].textContent === '\xa0') {
      const schemaNodes = this.schema.nodes;
      return schemaNodes.doc.create({}, schemaNodes.paragraph.create());
    }

    // Process through nodes in reverse (so deepest child elements are first).
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      const content = this.getContent(node, convertedNodes);
      const candidate = convert(content, node, this.schema);
      if (typeof candidate !== 'undefined') {
        convertedNodes.set(node, candidate);
      }
    }

    const content = this.getContent(dom, convertedNodes);

    // Dangling inline nodes can't be directly inserted into a document, so
    // we attempt to wrap in a paragraph.
    const compatibleContent = this.schema.nodes.doc.validContent(content)
      ? content
      : ensureBlocks(content, this.schema);

    return this.schema.nodes.doc.createChecked({}, compatibleContent);
  }

  /*
   * Contructs a struct string of replacement blocks and marks for a given node
   */
  private getContent(node: Node, convertedNodes: WeakMap<Node, Fragment | PMNode | null | undefined>): Fragment {
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

  private encodeNode(node: PMNode): DocumentFragment | Text | HTMLElement {
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
      mediaGroup,
      media
    } = this.schema.nodes;

    if (node.isText) {
      return this.encodeText(node);
    } else if (node.type === heading) {
      return this.encodeHeading(node);
    } else if (node.type === rule) {
      return this.encodeHorizontalRule();
    } else if (node.type === paragraph) {
      return this.encodeParagraph(node);
    } else if (node.type === hardBreak) {
      return this.encodeHardBreak();
    }

    if (isSchemaWithLists(this.schema)) {
      if (node.type === bulletList) {
        return this.encodeBulletList(node);
      } else if (node.type === orderedList) {
        return this.encodeOrderedList(node);
      } else if (node.type === listItem) {
        return this.encodeListItem(node);
      }
    }

    if (isSchemaWithMentions(this.schema) && node.type === mention) {
      return this.encodeMention(node, this.customEncoders.mention);
    }

    if (isSchemaWithCodeBlock(this.schema) && node.type === codeBlock) {
      return this.encodeCodeBlock(node);
    }

    if (isSchemaWithBlockQuotes(this.schema) && node.type === blockquote) {
      return this.encodeBlockQuote(node);
    }

    if (isSchemaWithMedia(this.schema)) {
      if (node.type === mediaGroup) {
        return this.encodeMediaGroup(node);
      } else if (node.type === media) {
        return this.encodeMedia(node);
      }
    }

    throw new Error(`Unexpected node '${(node as any).type.name}' for HTML encoding`);
  }

  private makeDocument() {
    const doc = document.implementation.createHTMLDocument('');
    doc.body = doc.createElement('body');
    doc.documentElement.appendChild(doc.body);
    return doc;
  }

  private encodeFragment(fragment: Fragment) {
    const documentFragment = this.doc.createDocumentFragment();
    fragment.forEach(node => documentFragment.appendChild(this.encodeNode(node)!));
    return documentFragment;
  }

  private encodeHeading(node: PMNode) {
    function anchorNameEncode(name: string) {
      const noSpaces = name.replace(/ /g, '');
      const uriEncoded = encodeURIComponent(noSpaces);
      const specialsEncoded = uriEncoded
        .replace(/[!'()*]/g, c => ('%' + c.charCodeAt(0).toString(16)));
      return specialsEncoded;
    }

    const elem = this.doc.createElement(`h${node.attrs.level}`);
    const anchor = this.doc.createElement('a');
    anchor.setAttribute('name', anchorNameEncode(node.textContent));
    elem.appendChild(anchor);
    elem.appendChild(this.encodeFragment(node.content));
    return elem;
  }

  private encodeParagraph(node: PMNode) {
    const elem = this.doc.createElement('p');
    elem.appendChild(this.encodeFragment(node.content));
    return elem;
  }

  private encodeText(node: PMNode) {
    if (node.text) {
      const root = this.doc.createDocumentFragment();
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
        textColor,
      } = this.schema.marks;

      for (const mark of node.marks) {
        switch (mark.type) {
          case strong:
            elem = elem.appendChild(this.doc.createElement('b'));
            break;
          case em:
            elem = elem.appendChild(this.doc.createElement('em'));
            break;
          case code:
            elem = elem.appendChild(this.doc.createElement('tt'));
            break;
          case strike:
            elem = elem.appendChild(this.doc.createElement('del'));
            break;
          case underline:
            elem = elem.appendChild(this.doc.createElement('ins'));
            break;
          case subsup:
            elem = elem.appendChild(this.doc.createElement(mark.attrs['type']));
            break;
          case link:
            const linkElem = this.doc.createElement('a');
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
          case textColor:
            const fontElem = this.doc.createElement('font');
            fontElem.setAttribute('color', mark.attrs['color']);
            elem = elem.appendChild(fontElem);
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
      return this.doc.createTextNode('');
    }
  }

  private encodeHardBreak() {
    return this.doc.createElement('br');
  }

  private encodeHorizontalRule() {
    return this.doc.createElement('hr');
  }

  private encodeBulletList(node: PMNode) {
    const elem = this.doc.createElement('ul');
    elem.setAttribute('class', 'alternate');
    elem.setAttribute('type', 'disc');
    elem.appendChild(this.encodeFragment(node.content));
    for (let index = 0; index < elem.childElementCount; index++) {
      elem.children[index].setAttribute('data-parent', 'ul');
    }

    return elem;
  }

  private encodeOrderedList(node: PMNode) {
    const elem = this.doc.createElement('ol');
    elem.appendChild(this.encodeFragment(node.content));
    for (let index = 0; index < elem.childElementCount; index++) {
      elem.children[index].setAttribute('data-parent', 'ol');
    }
    return elem;
  }

  private encodeListItem(node: PMNode) {
    const elem = this.doc.createElement('li');
    if (node.content.childCount) {
      node.content.forEach(childNode => {
        if (childNode.type === this.schema.nodes.bulletList || childNode.type === this.schema.nodes.orderedList) {
          const list = this.encodeNode(childNode)!;

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
          elem.appendChild(this.encodeFragment((childNode as PMNode).content));
        }
      });
    }
    return elem;
  }

  private encodeMention(node: PMNode, encoder?: CustomEncoder) {
    const elem = this.doc.createElement('a');
    elem.setAttribute('class', 'user-hover');
    elem.setAttribute('href', encoder ? encoder(node.attrs.id) : node.attrs.id);
    elem.setAttribute('rel', node.attrs.id);
    elem.innerText = node.attrs.text;
    return elem;
  }

  private encodeCodeBlock(node: PMNode) {
    const elem = this.doc.createElement('div');
    elem.setAttribute('class', 'code panel');

    const content = this.doc.createElement('div');
    content.setAttribute('class', 'codeContent panelContent');

    const pre = this.doc.createElement('pre');
    // java is default language for JIRA
    pre.setAttribute('class', `code-${(node.attrs.language || 'plain').toLocaleLowerCase()}`);
    pre.appendChild(this.encodeFragment(node.content));

    content.appendChild(pre);
    elem.appendChild(content);

    return elem;
  }

  private encodeBlockQuote(node: PMNode) {
    const elem = this.doc.createElement('blockquote');
    elem.appendChild(this.encodeFragment(node.content));
    return elem;
  }

  private encodeMediaGroup(node: PMNode) {
    const elem = this.doc.createElement('p');
    elem.setAttribute('class', 'mediaGroup');
    elem.appendChild(this.encodeFragment(node.content));
    return elem;
  }

  private addDataToNode(domNode: HTMLElement, mediaNode: PMNode) {
    const { id, type, __fileName, __displayType } = mediaNode.attrs;
    // Order of dataset matters in IE Edge, please keep the current order
    domNode.dataset.attachmentType = __displayType || 'thumbnail';
    if (__fileName) {
      domNode.dataset.attachmentName = __fileName;
    }
    domNode.dataset.mediaServicesType = type;
    domNode.dataset.mediaServicesId = id;
  }

  private buildURLWithContextInfo(fileId: string, contextInfo: ContextInfo) {
    const { clientId, serviceHost, token, collection } = contextInfo;
    return `${serviceHost}/file/${fileId}/image?token=${token}&client=${clientId}&collection=${collection}&width=200&height=200&mode=fit`;
  }

  private encodeMedia(node: PMNode) {
    // span.image-wrap > a > jira-attachment-thumbnail > img[data-media-*] > content
    // span.no-br > a[data-media] > content
    const elem = this.doc.createElement('span');
    const a = this.doc.createElement('a');

    if (node.attrs.__displayType === 'file') {
      elem.setAttribute('class', 'nobr');
      this.addDataToNode(a, node);
      a.textContent = node.attrs.__fileName || '';
    } else {
      elem.setAttribute('class', 'image-wrap');

      const img = this.doc.createElement('img');
      img.setAttribute('alt', node.attrs.__fileName);
      // Newly uploaded items have collection
      if (node.attrs.collection && this.mediaContextInfo && this.mediaContextInfo.uploadContext) {
        img.setAttribute('src', this.buildURLWithContextInfo(node.attrs.id, this.mediaContextInfo.uploadContext));
      } else if (this.mediaContextInfo && this.mediaContextInfo.viewContext) {
        img.setAttribute('src', this.buildURLWithContextInfo(node.attrs.id, this.mediaContextInfo.viewContext));
      }
      this.addDataToNode(img, node);

      const jiraThumb = this.doc.createElement('jira-attachment-thumbnail');
      jiraThumb.appendChild(img);

      a.appendChild(jiraThumb);
    }

    elem.appendChild(a);
    return elem;
  }
}
