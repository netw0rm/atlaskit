import {
  Slice, Fragment, Node, Schema,
  TextSelection, Selection, EditorState,
  EditorView, NodeViewDesc
} from '../../../../prosemirror';
import * as LinkifyIt from 'linkify-it';

export interface Match {
  schema: any;
  index: number;
  lastIndex: number;
  raw: string;
  text: string;
  url: string;
  length?: number;
}
export interface NodeInfo {
  node: Node;
  startPos: number;
}

const linkify = LinkifyIt();
linkify.add('sourcetree:', 'http:');

export function getLinkMatch(str: string): Match | null {
  const match = str && linkify.match(str);
  return match && match[0];
}

export type Coordinates = { left: number; right: number; top: number; bottom: number };

/**
 * Instance of class LinkMatcher are used in autoformatting in place of Regex.
 * Hence it has been made similar to regex with an exec method.
 * Extending it directly from class Regex was introducing some issues, thus that has been avoided.
 */
export class LinkMatcher {
  exec(str): Match[] | null {
    if (str[str.length - 1] === ' ') {
      const strSplit: string = str.slice(0, str.length - 1).split(' ');
      const match: Match[] = linkify.match(strSplit[strSplit.length - 1]);
      if (match && match.length > 0) {
        const lastMatch: Match = match[match.length - 1];
        lastMatch.length = lastMatch.lastIndex - lastMatch.index + 1;
        return [lastMatch];
      }
    }
    return null;
  }
}

/**
 * Adds protocol to url if needed.
 */
export function normalizeUrl(url: string) {
  const match = getLinkMatch(url);
  return (match && match.url) || url;
}

export function linkifyContent(schema: Schema<any, any>, slice: Slice): Slice | undefined {
  const fragment = linkinfyFragment(schema, slice.content);
  if (fragment) {
    return new Slice(fragment, slice.openStart, slice.openEnd);
  }
}

function linkinfyFragment(schema: Schema<any, any>, fragment: Fragment): Fragment | undefined {
  const linkified: Node[] = [];
  for (let i = 0, len = fragment.childCount; i < len; i++) {
    const child: Node = fragment.child(i);
    if (child.type === schema.nodes.table) {
      return;
    }
    if (child.isText) {
      const text = child.textContent as string;
      const link = child.type.schema.marks['link'];
      const matches: any[] = findLinkMatches(text);
      let pos = 0;
      matches.forEach(match => {
        if (match.start > 0) {
          linkified.push(child.cut(pos, match.start));
        }
        linkified.push(
          child.cut(match.start, match.end).mark(link.create({ href: normalizeUrl(match.href) }).addToSet(child.marks))
        );
        pos = match.end;
      });
      if (pos < text.length) {
        linkified.push(child.cut(pos));
      }
    } else {
      linkified.push(child.copy(linkinfyFragment(schema, child.content)));
    }
  }
  return Fragment.fromArray(linkified);
}

interface LinkMatch {
  start: number;
  end: number;
  title: string;
  href: string;
}

function findLinkMatches(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];
  let linkMatches: Match[] = text && linkify.match(text);
  if (linkMatches && linkMatches.length > 0) {
    linkMatches.forEach(match => {
      matches.push({
        start: match.index,
        end: match.lastIndex,
        title: match.raw,
        href: match.url,
      });
    });
  }
  return matches;
}

export function getActiveLinkNodeInfo(state: EditorState<any>): NodeInfo | undefined {
  const { link } = state.schema.marks;
  const { $from, empty } = state.selection as TextSelection;

  if (link && $from) {
    const { node, offset } = $from.parent.childAfter($from.parentOffset);
    const parentNodeStartPos = $from.start($from.depth);

    // offset is the end position of previous node
    // This is to check whether the cursor is at the beginning of current node
    if (empty && offset + 1 === $from.pos) {
      return;
    }

    if (node && node.isText && link.isInSet(node.marks)) {
      return {
        node,
        startPos: parentNodeStartPos + offset
      };
    }
  }
}

export function isShouldEscapeFromMark(state: EditorState<any>, nodeInfo: NodeInfo): boolean {
  const parentOffset = state.selection.$from.parentOffset;
  return nodeInfo && parentOffset === 1 && nodeInfo.node.nodeSize > parentOffset;
}

export function getCoordinates(editorView: EditorView, offsetParent: Element): Coordinates {
  if (editorView.hasFocus()) {
    editorView.focus();
  }
  const { pos } = editorView.state.selection.$from;
  const { left, top, height } = offsetParent.getBoundingClientRect();
  const { node } = editorView.docView.domFromPos(pos);

  const cursorNode = (node.nodeType === 3) ? // Node.TEXT_NODE = 3
    (node.parentNode as HTMLElement) : (node as HTMLElement);
  const cursorHeight = parseFloat(window.getComputedStyle(cursorNode, undefined).lineHeight || '');
  /**
   * We need to translate the co-ordinates because `coordsAtPos` returns co-ordinates
   * relative to `window`. And, also need to adjust the cursor container height.
   * (0, 0)
   * +--------------------- [window] ---------------------+
   * |   (left, top) +-------- [Offset Parent] --------+  |
   * | {coordsAtPos} | [Cursor]   <- cursorHeight      |  |
   * |               | [FloatingToolbar]               |  |
   */
  const translateCoordinates = (coords: Coordinates, dx: number, dy: number) => {
    return {
      left: coords.left - dx,
      right: coords.right - dx,
      top: (coords.top - dy) + (offsetParent === document.body ? 0 : offsetParent.scrollTop),
      bottom: height - (coords.top - dy) - (offsetParent === document.body ? 0 : offsetParent.scrollTop),
    };
  };
  return translateCoordinates(editorView.coordsAtPos(pos), left, top - cursorHeight);
}

export function getDomElement(docView: NodeViewDesc, activeLinkStartPos?: number): HTMLElement | undefined {
  if (activeLinkStartPos) {
    const { node, offset } = docView.domFromPos(activeLinkStartPos);

    if (node.childNodes.length === 0) {
      return node.parentNode as HTMLElement;
    }

    return node.childNodes[offset] as HTMLElement;
  }
}

/**
 * Returns active dom element for current selection.
 * Used by Hyperlink edit popup to position relative to cursor.
 */
export function getActiveDomElement(docView: NodeViewDesc, selection: Selection): HTMLElement | undefined {
  if (selection.$from.pos !== selection.$to.pos) {
    return;
  }

  const { node } = docView.domFromPos(selection.$from.pos);

  return node as HTMLElement;
}

