import * as namedColors from 'css-color-names';

import {
  isSchemaWithLists,
  isSchemaWithMentions,
  isSchemaWithLinks,
  isSchemaWithAdvancedTextFormattingMarks,
  isSchemaWithCodeBlock,
  isSchemaWithBlockQuotes,
  isSchemaWithMedia,
  isSchemaWithSubSupMark,
  isSchemaWithTextColor,
  isSchemaWithTables
} from './schema';

import {
  Fragment,
  Mark,
  Node as PMNode,
  Schema,
} from '../../prosemirror';

/**
 * Ensure that each node in the fragment is a block, wrapping
 * in a block node if necessary.
 */
export function ensureBlocks(fragment: Fragment, schema: Schema<any, any>): Fragment {
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

export function convert(content: Fragment, node: Node, schema: Schema<any, any>): Fragment | PMNode | null | undefined {
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
      if (!isSchemaWithAdvancedTextFormattingMarks(schema)) {
          return null;
        }
        return addMarks(content, [schema.marks.strike!.create()]);
      case 'B':
        return addMarks(content, [schema.marks.strong.create()]);
      case 'EM':
        return addMarks(content, [schema.marks.em.create()]);
      case 'TT':
        if (!isSchemaWithAdvancedTextFormattingMarks(schema)) {
          return null;
        }
        return addMarks(content, [schema.marks.code!.create()]);
      case 'SUB':
      case 'SUP':
        if (!isSchemaWithSubSupMark(schema)) {
          return null;
        }
        const type = tag === 'SUB' ? 'sub' : 'sup';
        return addMarks(content, [schema.marks.subsup.create({ type })]);
      case 'INS':
        return addMarks(content, [schema.marks.underline.create()]);
      case 'FONT':
        if (!isSchemaWithTextColor(schema)) {
          return null;
        }
        const color = getValidColor(node.getAttribute('color'));
        return color ? addMarks(content, [schema.marks.textColor.create({ color })]) : content;
      // Nodes
      case 'A':
        if (node.className === 'user-hover' && isSchemaWithMentions(schema)) {
          return schema.nodes.mention!.createChecked({
            id: node.getAttribute('rel'),
            text: node.innerText
          });
        }

        const isAnchor = node.attributes.getNamedItem('href') === null;
        if (isAnchor || node.className.match('jira-issue-macro-key') || !content || !isSchemaWithLinks(schema)) {
          return null;
        }

        return addMarks(
          content,
          [schema.marks.link!.create({
            href: node.getAttribute('href'),
            title: node.getAttribute('title')
          })]
        );

      case 'SPAN':
        /**
         * JIRA ISSUE MACROS
         * `````````````````
         * <span class="jira-issue-macro" data-jira-key="ED-1">
         *     <a href="https://product-fabric.atlassian.net/browse/ED-1" class="jira-issue-macro-key issue-link">
         *         <img class="icon" src="./epic.svg" />
         *         ED-1
         *     </a>
         *     <span class="aui-lozenge aui-lozenge-subtle aui-lozenge-current jira-macro-single-issue-export-pdf">
         *         In Progress
         *     </span>
         * </span>
         */
        if (node.className === 'jira-issue-macro') {
          const jiraKey = node.dataset.jiraKey;
          return jiraKey ? schema.text(jiraKey) : null;
        } else if (node.className.match('jira-macro-single-issue-export-pdf')) {
          return null;
        } else if (node.className.match('code-')) { // Removing spans with syntax highlighting from JIRA
          return null;
        } else if (isMedia(node) && isSchemaWithMedia(schema)) {
          const dataNode = node.querySelector('[data-media-services-id]');
          if (dataNode && dataNode instanceof HTMLElement) {
            const {
              mediaServicesId: id,
              mediaServicesType: type,
              mediaServicesCollection: collection = '',
              attachmentName, attachmentType,
              fileName, displayType
            } = dataNode.dataset;

            return schema.nodes.media.create({
              id, type, collection,
              __fileName: attachmentName || fileName,
              __displayType: attachmentType || displayType || 'thumbnail',
            });
          }
        }
        break;

      case 'IMG':
        if (node.parentElement && node.parentElement.className.match('jira-issue-macro-key')) {
          return null;
        }
        break;
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
      case 'P':
        if (node.firstChild && (isMedia(node.firstChild))) {
          // Filter out whitespace text nodes
          const mediaContent: Array<PMNode> = [];
          let hasNonMediaChildren = false;
          content.forEach(child => {
            if (child.type === schema.nodes.media) {
              mediaContent.push(child);
            }
            else if (!(child.isText && /^\s*$/.test(child.text || ''))){
              hasNonMediaChildren = true;
            }
          });
          if (hasNonMediaChildren) {
            return schema.nodes.paragraph.createChecked({}, content);
          }

          if (isSchemaWithMedia(schema)) {
            return schema.nodes.mediaGroup.createChecked({}, Fragment.fromArray(mediaContent));
          }

          return null;
        }

        return schema.nodes.paragraph.createChecked({}, content);
    }

    // lists
    if (isSchemaWithLists(schema)) {
      switch (tag) {
        case 'UL':
          return schema.nodes.bulletList!.createChecked({}, content);
        case 'OL':
          return schema.nodes.orderedList!.createChecked({}, content);
        case 'LI':
          const compatibleContent = schema.nodes.listItem!.validContent(content)
            ? content
            : ensureBlocks(content, schema);
          return schema.nodes.listItem!.createChecked({}, compatibleContent);
      }
    }

    // code block
    if (isSchemaWithCodeBlock(schema)) {
      switch (tag) {
        case 'DIV':
          if (node.className === 'codeContent panelContent' || node.className.match('preformattedContent')) {
            return null;
          } else if (node.className === 'code panel' || node.className === 'preformatted panel') {
            const pre = node.querySelector('pre');

            if (!pre) {
              return null;
            }

            const language = node.className === 'preformatted panel'
              ? 'plain'
              : pre.className.split('-')[1];

            const textContent = pre.innerText.replace(/\r\n/g, '\n');
            return schema.nodes.codeBlock!.createChecked(
              { language },
              textContent
                ? schema.text(textContent)
                : undefined
            );
          }
          break;
        case 'PRE':
          return null;
      }
    }

    if (isSchemaWithBlockQuotes(schema) && tag === 'BLOCKQUOTE') {
      let blockquoteContent = content && (content as any).content.length ? content : schema.nodes.paragraph.create();
      return schema.nodes.blockquote!.createChecked({}, blockquoteContent);
    }

    // table
    if (isSchemaWithTables(schema)) {
      switch (tag) {
        case 'TABLE':
          return schema.nodes.table.createChecked({}, content);
        case 'TR':
          return schema.nodes.tableRow!.createChecked({}, content);
        case 'TD':
          const tdContent = schema.nodes.tableCell.validContent(content)
            ? content
            : ensureBlocks(content, schema);
          return schema.nodes.tableCell.createChecked({}, tdContent);
        case 'TH':
          const thContent = schema.nodes.tableHeader.validContent(content)
            ? content
            : ensureBlocks(content, schema);
          return schema.nodes.tableHeader.createChecked({}, thContent);
      }
    }
  }
}

/*
 * Flattens DOM tree into single array
 */
export function bfsOrder(root: Node): Node[] {
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

function getValidColor(color: string | null): string | null {
  if (!color) {
    return null;
  }

  // Normalize
  color = color.trim().toLowerCase();
  if (color[0] === '#' && color.length === 4 || color.length === 7) {
    if (/^#[\da-f]{3}$/.test(color)) {
      color = color.split('').map(c => c === '#' ? '#' : `${c}${c}`).join('');
    }
  } else {
    // http://dev.w3.org/csswg/css-color/#named-colors
    if (namedColors[color]) {
      color = namedColors[color];
    }
    else {
      return null;
    }
  }

  // Default colour from old JIRA colour palette
  if (color === '#333333') {
    return null;
  }

  return color;
}

function getNodeName(node: Node): string {
  return node.nodeName.toUpperCase();
}

function isMedia(node: Node): boolean {
  if (node && node instanceof HTMLElement) {
    if (node.parentNode && getNodeName(node.parentNode) === 'P') {
      if (getNodeName(node) === 'SPAN') {
        return !!node.querySelector(
          'a > jira-attachment-thumbnail > img[data-attachment-type="thumbnail"], ' +
          'a[data-attachment-type="file"]'
        );
      }
    }
  }
  return false;
}
