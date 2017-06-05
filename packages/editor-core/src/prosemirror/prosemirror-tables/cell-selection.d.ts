import { Node, Slice, Transaction, ResolvedPos } from '../';

export class CellSelection {
  map(doc: Node, mapping: any): any;
  content(): Slice;
  replace(tr: Transaction, content: Slice): void;
  replaceWith(tr: Transaction, node: Node): void;
  forEachCell(f: Function): void;
  isRowSelection(): boolean;
  isColSelection(): boolean;
  eq(other: any): boolean;
  toJSON(): object;
  getBookmark(): object;

  static colSelection(anchorCell: ResolvedPos, headCell?: ResolvedPos): CellSelection;
  static rowSelection(anchorCell: ResolvedPos, headCell?: ResolvedPos): CellSelection;
  static create(doc: Node, anchorCell: number, headCell?: number): CellSelection;
}
