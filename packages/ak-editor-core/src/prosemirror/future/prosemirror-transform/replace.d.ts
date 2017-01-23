import { Step } from './';
import { Node, Slice } from '../';

export function replaceStep(doc: Node, from: number, to?: number, slice?: Slice): Step | null;
