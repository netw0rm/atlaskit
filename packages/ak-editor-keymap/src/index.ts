/* eslint-disable */
import { ProseMirror, browser, Keymap} from  'ak-editor-prosemirror';
import { Schema } from 'ak-editor-schema';

export default (schema: Schema) => {
  let bindings: {[key: string]: any} = {};

  const bind = (key: string, action: any): void => {
    bindings = Object.assign({}, bindings, {[key]: action});
  }

  const {hard_break, horizontal_rule} = schema.nodes;

  if(hard_break) {
    bind('Shift-Enter', (pm: ProseMirror) => pm.tr.replaceSelection(hard_break.create()).applyAndScroll());
  }

  if(horizontal_rule) {
    bind('Mod-Shift--', (pm: ProseMirror) => pm.tr.replaceSelection(horizontal_rule.create()).applyAndScroll());
  } 

  return new Keymap(bindings);
}
