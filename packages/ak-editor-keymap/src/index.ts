/* eslint-disable */
import { ProseMirror, browser, commands, Keymap, TextSelection } from  'ak-editor-prosemirror';
import { Schema } from 'ak-editor-schema';

const { wrapIn, setBlockType, wrapInList, splitListItem, lift, liftListItem,
  sinkListItem, chainCommands, newlineInCode, toggleMark } = commands;

const isMac = browser.mac;

interface Command {
  (pm: ProseMirror, apply: boolean): boolean;
}

interface AnyObject {
  [key: string]: any
}

export default (schema: Schema, mapKeys?: AnyObject) => {
  let keys: AnyObject = {};
  function bind(key: string, cmd: Command) {
    if (mapKeys) {
      let mapped = mapKeys[key];
      if (mapped === false) {
        return;
      }

      if (mapped) {
        key = mapped;
      }
    }
    keys[key] = cmd;
  }

  for (let name in schema.nodes) {
    let node = schema.nodes[name];

    if (name === 'hard_break') {
      bind('Shift-Enter', (pm: ProseMirror) => pm.tr.replaceSelection(node.create()).applyAndScroll());
    }

    if (name === 'horizontal_rule') {
      bind('Mod-Shift--', (pm: ProseMirror) => pm.tr.replaceSelection(node.create()).applyAndScroll());
    }
  }
  return new Keymap(keys);
}
