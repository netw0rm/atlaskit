import { Step } from './';
import { Mark } from '../';

export class AddMarkStep extends Step {
  constructor(from: number, to: number, mark: Mark);
}

export class RemoveMarkStep extends Step {
  constructor(from: number, to: number, mark: Mark);
}
