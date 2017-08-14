import {
  Fragment,
  Node as PMNode,
  MediaAttributes,
  MediaType,
} from '@atlaskit/editor-core';
import schema from '../schema';
import parseCxhtml from './parse-cxhtml';
import { AC_XMLNS, default as encodeCxhtml } from './encode-cxhtml';
import {
  findTraversalPath,
  ensureBlocks,
  getNodeName,
  addMarks,
  getAcName,
  getAcParameter,
  getAcTagContent,
  createCodeFragment,
  getAcTagNode,
  getMacroAttribute,
  getMacroParameters,
  hasClass,
  marksFromStyle,
  getContent,
} from './utils';

const convertedNodes = new WeakMap();

export default function(cxhtml: string) {
  const dom = parseCxhtml(cxhtml).querySelector('body')!;
  return schema.nodes.doc.createChecked({}, parseDomNode(dom));
}

function parseDomNode(dom: Element): PMNode {
  const nodes = findTraversalPath(Array.prototype.slice.call(dom.childNodes, 0));

  // Process through nodes in reverse (so deepest child elements are first).
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    const content = getContent(node, convertedNodes);
    const candidate = converter(content, node);
    if (typeof candidate !== 'undefined') {
      convertedNodes.set(node, candidate);
    }
  }

  const content = getContent(dom, convertedNodes);
  const compatibleContent = content.childCount > 0
    // Dangling inline nodes can't be directly inserted into a document, so
    // we attempt to wrap in a paragraph.
    ? schema.nodes.doc.validContent(content)
      ? content
      : ensureBlocks(content)
    // The document must have at least one block element.
    : schema.nodes.paragraph.createChecked({});

  return compatibleContent;
}

function converter(content: Fragment, node: Node): Fragment | PMNode | null | undefined {
  // text
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
    const text = node.textContent;
    return text ? schema.text(text) : null;
  }

  // All unsupported content is wrapped in an `unsupportedInline` node. Converting
  // `unsupportedInline` to `unsupportedBlock` where appropriate is handled when
  // the content is inserted into a parent.
  const unsupportedInline = schema.nodes.confluenceUnsupportedInline.create({ cxhtml: encodeCxhtml(node) });

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
      case 'A':
        return content ? addMarks(content, [schema.marks.link.create({ href: node.getAttribute('href') })]) : null;
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
        let output: Fragment = Fragment.from([]);
        let textNodes: PMNode[] = [];
        let mediaNodes: PMNode[] = [];

        if (!node.childNodes.length) {
          return schema.nodes.paragraph.createChecked({}, content);
        }

        content.forEach((childNode, offset) => {
          if (childNode.type === schema.nodes.media) {
            // if there were text nodes before this node
            // combine them into one paragraph and empty the list
            if (textNodes.length) {
              const paragraph = schema.nodes.paragraph.createChecked({}, textNodes);
              output = output.addToEnd(paragraph);

              textNodes = [];
            }

            mediaNodes.push(childNode);
          } else {
            // if there were media nodes before this node
            // combine them into one mediaGroup and empty the list
            if (mediaNodes.length) {
              const mediaGroup = schema.nodes.mediaGroup.createChecked({}, mediaNodes);
              output = output.addToEnd(mediaGroup);

              mediaNodes = [];
            }

            textNodes.push(childNode);
          }
        });

        // combine remaining text nodes
        if (textNodes.length) {
          const paragraph = schema.nodes.paragraph.createChecked({}, textNodes);
          output = output.addToEnd(paragraph);
        }

        // combine remaining media nodes
        if (mediaNodes.length) {
          const mediaGroup = schema.nodes.mediaGroup.createChecked({}, mediaNodes);
          output = output.addToEnd(mediaGroup);
        }

        return output;

      case 'AC:STRUCTURED-MACRO':
        return convertConfluenceMacro(node) || unsupportedInline;
      case 'FAB:LINK':
        if (
            node.firstChild &&
            node.firstChild instanceof Element &&
            getNodeName(node.firstChild) === 'FAB:MENTION'
          ) {
          const cdata = node.firstChild.firstChild!;

          return schema.nodes.mention.create({
            id: node.firstChild.getAttribute('atlassian-id'),
            text: cdata!.nodeValue,
          });
        }
        break;
      case 'FAB:MENTION':
        const cdata = node.firstChild!;

        return schema.nodes.mention.create({
          id: node.getAttribute('atlassian-id'),
          text: cdata!.nodeValue,
        });
      case 'FAB:MEDIA':
        const mediaAttrs: MediaAttributes = {
          id: node.getAttribute('media-id') || '',
          type: (node.getAttribute('media-type') || 'file') as MediaType,
          collection: node.getAttribute('media-collection') || '',
        };

        if (node.hasAttribute('file-name')) {
          mediaAttrs.__fileName = node.getAttribute('file-name')!;
        }

        if (node.hasAttribute('file-size')) {
          mediaAttrs.__fileSize = parseInt(node.getAttribute('file-size')!, 10);
        }

        if (node.hasAttribute('file-mime-type')) {
          mediaAttrs.__fileMimeType = node.getAttribute('file-mime-type')!;
        }

        return schema.nodes.media.create(mediaAttrs);

      case 'PRE':
        return schema.nodes.codeBlock.create({ language: null }, schema.text(node.textContent || ''));

      case 'TABLE':
        if (hasClass(node, 'wysiwyg-macro')) {
          return convertWYSIWYGMacro(node) || unsupportedInline;
        } else if (hasClass(node, 'confluenceTable')) {
          return convertTable(node);
        }
        return unsupportedInline;

      case 'DIV':
        if (hasClass(node, 'codeHeader')) {
          const codeHeader = schema.text(node.textContent || '', [ schema.marks.strong.create() ]);
          return schema.nodes.heading.createChecked({ level: 5 }, Fragment.from( codeHeader ));
        }
        else if (node.querySelector('.syntaxhighlighter')) {
          const codeblockNode = node.querySelector('.syntaxhighlighter');
          return convertCodeFromView(codeblockNode as Element) || unsupportedInline;
        }
        else if (hasClass(node, 'preformatted')) {
          return convertNoFormatFromView(node) || unsupportedInline;
        }
        return unsupportedInline;
    }
  }

  return unsupportedInline;
}

function convertConfluenceMacro(node: Element): Fragment | PMNode | null | undefined  {
  const name = getAcName(node);

  switch (name) {
    case 'CODE':
      const language = getAcParameter(node, 'language');
      const title = getAcParameter(node, 'title');
      const codeContent = getAcTagContent(node, 'AC:PLAIN-TEXT-BODY') || ' ';
      return createCodeFragment(codeContent, language, title);

    case 'NOFORMAT': {
      const codeContent = getAcTagContent(node, 'AC:PLAIN-TEXT-BODY') || ' ';
      return schema.nodes.codeBlock.create({ language: null }, schema.text(codeContent));
    }

    case 'WARNING':
    case 'INFO':
    case 'NOTE':
    case 'TIP':
      const panelTitle = getAcParameter(node, 'title');
      const panelRichTextBody = getAcTagNode(node, 'AC:RICH-TEXT-BODY') || '';
      let panelBody: any[] = [];

      if (panelTitle) {
        panelBody.push(
          schema.nodes.heading.create({ level: 3 }, schema.text(panelTitle))
        );
      }

      if (panelRichTextBody) {
        const pmNode = parseDomNode(panelRichTextBody);
        panelBody = panelBody.concat(pmNode.content);
      } else {
        panelBody.push(schema.nodes.paragraph.create({}));
      }

      return schema.nodes.panel.create({ panelType: name.toLowerCase() }, panelBody);

    case 'JIRA':
      const schemaVersion = node.getAttributeNS(AC_XMLNS, 'schema-version');
      const macroId = node.getAttributeNS(AC_XMLNS, 'macro-id');
      const server = getAcParameter(node, 'server');
      const serverId = getAcParameter(node, 'serverId');
      const issueKey = getAcParameter(node, 'key');

      // if this is an issue list, render it as unsupported node
      // @see https://product-fabric.atlassian.net/browse/ED-1193?focusedCommentId=26672&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-26672
      if (!issueKey) {
        return schema.nodes.confluenceUnsupportedInline.create({ cxhtml: encodeCxhtml(node) });
      }

      return schema.nodes.confluenceJiraIssue.create({
        issueKey,
        macroId,
        schemaVersion,
        server,
        serverId,
      });
  }

  return null;
}

function convertWYSIWYGMacro (node: Element): Fragment | PMNode | null | undefined  {
  const name = getMacroAttribute(node, 'name').toUpperCase();

  switch (name) {
    case 'CODE':
    case 'NOFORMAT':
      const codeContent = node.querySelector('pre')!.textContent || ' ';
      const { language, title } = getMacroParameters(node);
      return createCodeFragment(codeContent, language, title);
  }

  return null;
}

function convertCodeFromView (node: Element): Fragment | PMNode | null | undefined  {
    const container = node.querySelector('.container');

    let content = '';
    if (container) {
      const { childNodes } = container;
      for (let i = 0, len = childNodes.length; i < len; i++) {
        content += childNodes[i].textContent + (i === len - 1 ? '' : '\n');
      }
    }

    let language;
    if (node.className) {
      language = (node.className.match(/\w+$/) || [''])[0];
    }

    return createCodeFragment(content, language);
}

function convertNoFormatFromView (node: Element): Fragment | PMNode | null | undefined  {
    const codeContent = node.querySelector('pre')!.textContent || ' ';
    return createCodeFragment(codeContent);
}

function convertTable (node: Element) {
  const { table, tableRow, tableCell, tableHeader } =  schema.nodes;
  const rowNodes: PMNode[] = [];
  const rows = node.querySelectorAll('tr');

  for (let i = 0, rowsCount = rows.length; i < rowsCount; i ++) {
    const cellNodes: PMNode[] = [];
    const cols = rows[i].querySelectorAll('td,th');

    for (let j = 0, colsCount = cols.length; j < colsCount; j ++) {
      const cell = cols[j].nodeName === 'td' ? tableCell : tableHeader;
      const pmNode = parseDomNode(cols[j]);
      cellNodes.push(cell.createChecked(null, pmNode));
    }
    rowNodes.push(tableRow.create(null, Fragment.from(cellNodes)));
  }
  return table.create(null, Fragment.from(rowNodes));
}
