import { EditorView } from '../prosemirror-view';
import { Event } from '../dom';
import { Plugin } from '../prosemirror-state';
export function keymap(bindings: { [key: string]: Function }): Plugin;
export function keydownHandler(bindings: { [key: string]: Function }): (view: EditorView, event: KeyboardEvent) => boolean;
