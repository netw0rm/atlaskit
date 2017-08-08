import { Schema, keymap, Plugin, EditorState, Transaction, Selection } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { analyticsService, trackAndInvoke } from '../../analytics';
import { URL_REGEX } from './regex';
import { normalizeUrl } from './utils';

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.addLink.common!,
    trackAndInvoke(
      'atlassian.editor.format.hyperlink.keyboard',
      commands.showLinkPanel()
    ),
    list
  );

  keymaps.bindKeymapWithCommand(
    keymaps.enter.common!, mayConvertLastWordToHyperlink,
    list
  );

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common!, mayConvertLastWordToHyperlink,
    list
  );

  return keymap(list);
}

export function createAddLinkTransaction(hyperlinkedText: string, state: EditorState<any>, start: number, end: number): Transaction {
  const { paragraph } = state.schema.nodes;
  const url = normalizeUrl(hyperlinkedText);
  const markType = state.schema.mark('link', { href: url, });

  analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');

  let tr = state.tr.addMark(
    start,
    end,
    markType
  );
  tr.replaceRangeWith(end, end, paragraph.create());
  tr.setSelection(Selection.near(tr.doc.resolve(end + 1)));
  return tr;
}

function mayConvertLastWordToHyperlink(state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
  const nodeBefore = state.selection.$from.nodeBefore;
  if (!nodeBefore || !nodeBefore.isText) {
    return false;
  }

  const words = nodeBefore.text!.split(' ');
  const lastWord = words[words.length - 1];
  const match = new RegExp(`${URL_REGEX.source}$`).exec(lastWord);

  if (match) {
    const hyperlinkedText = match[1];
    const start = state.selection.$from.pos - hyperlinkedText.length;
    const end = state.selection.$from.pos;

    if (state.doc.rangeHasMark(start, end, state.schema.marks.link)) {
      return false;
    }

    dispatch(createAddLinkTransaction(hyperlinkedText, state, start, end));
    return true;
  }
  return false;
}

export default keymapPlugin;
