import Keymap from 'browserkeymap';
import { findKeyMapForBrowser, undo, redo, redoBarredOnMac } from '../../keymaps';
import { trackAndInvoke } from '../../analytics';
import {
  commands,
  Plugin,
  ProseMirror,
  Schema,
} from '../../prosemirror';

export class DefaultKeymapsState {
  private pm: PM;

  constructor(pm: PM) {
    this.pm = pm;

    this.pm.addKeymap(new Keymap({
      [findKeyMapForBrowser(redoBarredOnMac)!]: this.preventDefault,
      [undo.common!]: trackAndInvoke('atlassian.editor.undo.keyboard', this.undo),
      [findKeyMapForBrowser(redo)!]: trackAndInvoke('atlassian.editor.redo.keyboard', this.redo),
    }));
  }

  preventDefault = () => {
    return true;
  }

  undo = () => {
    const { pm } = this;
    commands.undo(pm, true);
    return true;
  }

  redo = () => {
    const { pm } = this;
    commands.redo(pm, true);
    return true;
  }
}

export interface S extends Schema {
}

export interface PM extends ProseMirror {
  schema: S;
}

Object.defineProperty(DefaultKeymapsState, 'name', { value: 'DefaultKeymapsState' });

export default new Plugin(DefaultKeymapsState);
