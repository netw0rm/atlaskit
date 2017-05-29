import { EMAIL_REGEX, URL_REGEX_G, EMAIL_REGEX_G } from './regex';
import { Slice, Fragment } from '../../prosemirror';

export function isEmail(url: string): boolean {
  return EMAIL_REGEX.test(url);
}

// http:, https:, ftp:, mailto:
export function hasProtocol(url: string): boolean {
  return /^[a-zA-Z0-9]+:(\/\/)?/.test(url);
}

// #hash, /path, ./path
export function isRelative(url: string) {
  return /^[#\/]|(\.\/)/.test(url);
}

/**
 * Adds protocol to url if needed.
 */
export function normalizeUrl(url: string) {
  if (!url || hasProtocol(url) || isRelative(url)) {
    return url;
  }

  if (isEmail(url)) {
    return `mailto:${url}`;
  }

  return `http://${url}`;
}

export function linkify(schema, text: string): Slice|undefined {
  let matches: any = [];
  let match;
  while(match = URL_REGEX_G.exec(text)) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      title: match[0],
      href: match[0],
    });
  }
  while(match = EMAIL_REGEX_G.exec(text)) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      title: match[0],
      href: `mailto:${match[0]}`,
    });
  }
  if (matches.length === 0) {
    return undefined;
  }
  matches.sort((m1, m2) => (m1.start - m2.start));
  let start = 0;
  const fragments: any = [];
  matches.forEach(match => {
    if (match.start > start) {
      fragments.push(schema.text(text.slice(start, match.start)));
    }
    fragments.push(schema.text(match.title, [schema.marks.link.create({ href: match.href })]));
    start = match.end;
  });
  if (start < text.length) {
    fragments.push(schema.text(text.slice(start, text.length)));
  }
  const combinedFragment = Fragment.fromArray(fragments);
  return new Slice(combinedFragment, 0, 0);
}
