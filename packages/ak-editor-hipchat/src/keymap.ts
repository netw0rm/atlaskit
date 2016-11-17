import { browser, commands, Keymap, ProseMirror } from  "ak-editor-prosemirror";
import schema from './schema';

const hardBreak = (pm: ProseMirror) => {
  pm.tr.replaceSelection(schema.nodes.hard_break.create()).applyAndScroll();
}

const keys: { [key: string]: any } = {
  'Mod-Enter': hardBreak,
  'Shift-Enter': hardBreak,
};

if (browser.mac) {
  keys['Ctrl-Enter'] = hardBreak;
}

export default new Keymap(keys);
