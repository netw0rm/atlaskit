import { Node } from '../';

export class ResolvedPos {
  pos: number;
  depth: number;
  parentOffset: number;
  parent: Node;
  node(depth?: number): Node;
  index(depth?: number): number;
  indexAfter(depth?: number): number;
  start(depth?: number): number;
  end(depth?: number): number;
  before(depth?: number): number;
  after(depth?: number): number;
  atNodeBoundary: boolean;
  nodeAfter?: Node;
  nodeBefore?: Node;
  sameDepth(other: ResolvedPos): number;
  blockRange(other?: ResolvedPos, pred?: (_0: Node) => boolean): NodeRange | null;
  sameParent(other: ResolvedPos): boolean;
}

export class NodeRange {
  $from: ResolvedPos;
  $to: ResolvedPos;
  depth: number;
  start: number;
  end: number;
  parent: Node;
  startIndex: number;
  endIndex: number;
}
