import { Mark, MarkType, Node } from '../';
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
}
