import { Fragment, Mark, MarkType, Node, Slice } from '../';
import { Mapping, Step, StepResult } from './';

export class TransformError extends Error {}

export class Transform {
  constructor(doc: Node);

  doc: Node;
  steps: Step[];
  docs: Node[];
  mapping: Mapping;
  before: Node;
  step(step: Step): this;
  maybeStep(step: Step): StepResult;
  addMark(from: number, to: number, mark: Mark): this;
  removeMark(from: number, to: number, mark?: Mark | MarkType): this;
  clearMarkup(from: number, to: number): this;
  delete(from: number, to: number): this;
  replaceRange(from: number, to: number, slice: Slice): this;
  replaceRangeWith(from: number, to: number, node: Node): this;
  deleteRange(from: number, to: number): this;
  replace(from, to?: number, slice?: Slice): this;
  replaceWith(from, to: number, content: Fragment | Node | Array<Node>): this;
  insert(pos: number, content: Fragment | Node | Array<Node>): this;
}
