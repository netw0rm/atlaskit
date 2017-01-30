import { Fragment, Mark, MarkType, Node, NodeType } from '../';

export class ContentMatch {
  matchNode(node: Node): ContentMatch | null;
  matchType(type: NodeType, attrs: { [key: string]: any } | null, marks: Mark[]): ContentMatch | null;
  matchFragment(fragment: Fragment, from?: number, to?: number): ContentMatch | boolean | null;
  matchToEnd(fragment: Fragment, start?: number, end?: number): boolean;
  validEnd(): boolean;
  fillBefore(after: Fragment, toEnd: boolean, startIndex?: number): Fragment | null;
  allowsMark(markType: MarkType): boolean;
  findWrapping(target: NodeType, targetAttrs?: { [key: string]: any }): { type: NodeType, attrs: { [key: string]: any } }[] | null;
}
