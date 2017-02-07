import { Transform, Selection } from '../';

export class History {
  recordTransform(transform: Transform, selection: Selection, options: { [key: string]: any }): void;
  undo(): boolean;
  redo(): boolean;
  undoDepth: number;
  redoDepth: number;
  // 'Branch' is not exported, so can't be exposed here.
  // shift(from: Branch, to: Branch): boolean;
  getVersion(): { [key: string]: any };
  isAtVersion(version: { [key: string]: any }): boolean;
  backToVersion(version: { [key: string]: any }): boolean;
}
