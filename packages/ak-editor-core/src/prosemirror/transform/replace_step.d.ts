import { Slice, Step } from '../';

export class ReplaceStep extends Step {
  constructor(from: number, to: number, slice: Slice, structure?: boolean) {}
}

export class ReplaceAroundStep extends Step {
  constructor(from: number, to: number, gapFrom: number, gapTo: number, slice: Slice, insert: number, structure: boolean) {}
}
