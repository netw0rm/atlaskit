import { Fragment, Mark, MarkType, Node, NodeType } from './';

export class ContentExpr {
  start(attrs?: { [key: string]: any }): ContentMatch;
  atType(parentAttrs: NodeType, type?: { [key: string]: any }, attrs?: { [key: string]: any }): ContentMatch | null;
}

export class ContentMatch {
  validEnd: boolean;
  matchType(type: NodeType, attrs: { [key: string]: any } | null, marks: Mark[]): ContentMatch | null;
  matchFragment(fragment: Fragment, from?: number, to?: number): ContentMatch | boolean | null;
  fillBefore(after: Fragment, toEnd: boolean, startIndex?: number): Fragment | null;
  findWrapping(target: NodeType, targetAttrs?: { [key: string]: any }, targetMarks?: Mark[]): { type: NodeType, attrs: { [key: string]: any } }[] | null;
}
