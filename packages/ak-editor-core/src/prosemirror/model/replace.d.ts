import { Fragment, Node, Schema } from '../';
import { ProseMirrorError } from '../util/error';

export class ReplaceError extends ProseMirrorError {}

export class Slice {
  constructor(content: Fragment, openLeft: number, openRight: number, possibleParent?: Node) {}

  content: Fragment;
  openLeft: number;
  openRight: number;
  size: number;
  toJSON(): { [key: string]: any } | null;

  static fromJSON(schema: Schema, json?: { [key: string]: any }): Slice;
  static empty: Slice;
}