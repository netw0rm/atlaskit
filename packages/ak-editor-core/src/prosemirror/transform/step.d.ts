import { Mappable, Node, PosMap, Schema, Slice } from '../';

export class Step {
  apply(doc: Node): StepResult;
  posMap(): PosMap;
  invert(doc: Node): Step;
  map(mapping: Mappable): Step | null;
  toJSON(): { [key: string]: any };

  static fromJSON(schema: Schema, json: { [key: string]: any }): Step;
  static jsonID(id: string, stepClass: { new (...args: any[]): Step }): void;
}

export class StepResult {
  constructor(doc?: Node, failed?: string);

  doc?: Node;
  failed?: string;

  static ok(doc: Node): StepResult;
  static fail(message: string): StepResult;
  static fromReplace(doc: Node, from: number, to: number, slice: Slice): StepResult;
}
