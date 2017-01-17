import { Fragment, Mark, MarkType, Node, NodeRange, NodeType, Slice, Step, StepResult, Transform, ProseMirrorError } from '../';

export class Transform {
  constructor(doc: Node) {}

  doc: Node;
  steps: Step[];
  docs: Node[];
  maps: PosMap[];
  before: Node;
  step(step: Step): this;
  maybeStep(step: Step): StepResult;
  mapResult(pos: number, bias?: number): MapResult;
  map(pos: number, bias?: number): number;
  delete(from: number, to: number): this;
  replace(from: number, to?: number, slice?: Slice): this;
  replaceWith(from: number, to: number, content: Fragment | Node | Node[]): this;
  insert(pos: number, content: Fragment | Node | Node[]): this;
  insertText(pos: number, text: string): this;
  insertInline(pos: number, node: Node): this;
  lift(range: NodeRange, target: number): this;
  addMark(from: number, to: number, mark: Mark): this;
  removeMark(from: number, to: number, mark?: Mark | MarkType): this;
  clearMarkup(from: number, to: number): this;
  wrap(range: NodeRange, wrappers: { type: NodeType, attrs?: Object }[]): this;
  setBlockType(from: number, to?: number, type: NodeType, attrs?: { [key: string]: any }): this;
  setNodeType(pos: number, type?: NodeType, attrs?: { [key: string]: any }): this;
  split(pos: number, depth?: number, typeAfter?: NodeType, attrsAfter?: { [key: string]: any }): this;
  join(pos: number, depth?: number, silent?: boolean): this;
}

export class TransformError extends ProseMirrorError {}
