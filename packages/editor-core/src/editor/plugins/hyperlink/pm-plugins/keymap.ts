import { Schema, keymap, Plugin, EditorState, Transaction } from '../../../../prosemirror';
import * as keymaps from '../../../../keymaps';
import * as commands from './commands';
import pluginKey from './plugin-key';
import { HyperlinkState } from './';
import { analyticsService, trackAndInvoke } from '../../../../analytics';
import { Match, getLinkMatch } from './utils';

export function keymapPlugin(schema: Schema<any, any>, props: any): Plugin | undefined {
  const list = {};

  if (props.appearance !== 'message') {
    keymaps.bindKeymapWithCommand(
      keymaps.addLink.common!,
      trackAndInvoke(
        'atlassian.editor.format.hyperlink.keyboard',
        showLinkPanel
      ),
      list
    );
  }

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

function showLinkPanel(state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
  const pluginState: HyperlinkState = pluginKey.getState(state);
  return commands.showLinkPanel(pluginState.showToolbarPanel, pluginState.linkable, pluginState.active)(state, dispatch);
}

function mayConvertLastWordToHyperlink(state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
  const nodeBefore = state.selection.$from.nodeBefore;
  if (!nodeBefore || !nodeBefore.isText) {
    return false;
  }

  const words = nodeBefore.text!.split(' ');
  const lastWord = words[words.length - 1];
  const match: Match | null = getLinkMatch(lastWord);

  if (match) {
    const hyperlinkedText = match.raw;
    const start = state.selection.$from.pos - hyperlinkedText.length;
    const end = state.selection.$from.pos;

    if (state.doc.rangeHasMark(start, end, state.schema.marks.link)) {
      return false;
    }

    const url = match.url;
    const markType = state.schema.mark('link', { href: url, });

    analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');

    dispatch(state.tr.addMark(
      start,
      end,
      markType
    ));
  }
  return false;
}

export default keymapPlugin;
