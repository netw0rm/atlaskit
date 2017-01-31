import { Node, ProseMirror, TextSelection, Selection } from '../';
import { DOMEvent } from '../dom';
import Keymap from 'browserkeymap';

export class Input {
  keymaps: Keymap[]; // private
  dispatchKey(name: string, e?: DOMEvent): boolean; // private

  insertText(from: number, to: number, text: string, findSelection?: (_0: Node) => Selection): void;
}
