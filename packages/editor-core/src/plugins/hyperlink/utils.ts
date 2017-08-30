import { Slice, Fragment, Node, Schema } from '../../prosemirror';
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

const linkify = LinkifyIt();
const validateFileText = (text: string, pos: number) => {
  const tail = text.slice(pos);
  const match = /[a-zA-Z0-9\.\$\-_\+!\*',\/\?:@=&%#~;()]+\.[a-zA-Z0-9-]+/.exec(tail);
  if (match) {
    return match[0].length;
  }
  return 0;
};
linkify.add('/', { validate: validateFileText });
linkify.add('./', { validate: validateFileText });
linkify.add('../', { validate: validateFileText });
linkify.add('sourcetree:', 'http:');

export function getLinkMatch(str: string): Match | null {
  const match = str && linkify.match(str);
  return match && match[0];
}

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
  return match && match.url;
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
          child.cut(match.start, match.end).mark(link.create({href: normalizeUrl(match.href)}).addToSet(child.marks))
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
