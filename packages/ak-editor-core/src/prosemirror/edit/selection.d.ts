import { Mappable, Node, ProseMirror, ResolvedPos } from '../';

export class SelectionState {
  setAndSignal(range: Selection, clearLast: boolean): void;
  set(range: Selection, clearLast: boolean): void;
  domChanged(): boolean;
  readFromDOM(): boolean;
}

export class Selection {
  from: number;
  to: number;
  $from: ResolvedPos;
  $to: ResolvedPos;
  map(doc: Node, mapping: Mappable): Selection;
  eq(other: Selection): boolean;
  empty: boolean;
}

export class TextSelection extends Selection {
  constructor($anchor: ResolvedPos, $head?: ResolvedPos);

  anchor: number;
  head: number;
  $anchor: ResolvedPos;
  $head: ResolvedPos;
}

export class NodeSelection extends Selection {
  constructor($from: ResolvedPos);

  node: Node;
}

export function verticalMotionLeavesTextblock(pm: ProseMirror, $pos: number, dir: number): void;
