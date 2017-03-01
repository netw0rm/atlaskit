import { EditorState, Transaction } from '../';
export class HistoryState {
  constructor(done, undone, prevMap, prevTime);
}

export function closeHistory(state: EditorState<any>): Transaction;
export function history(config?: {depth?: number, newGroupDelay?: number, preserveItems?: boolean});
export function undo(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
export function redo(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
export function undoDepth(state: EditorState<any>): number;
export function redoDepth(state: EditorState<any>): number;
