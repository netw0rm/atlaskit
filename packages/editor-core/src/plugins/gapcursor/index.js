import { keydownHandler } from 'prosemirror-keymap';
import { TextSelection, Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

import GapCursor from './gapcursor';

export { GapCursor };

function arrow(axis, dir) {
  let dirStr;
  if (axis === 'vert') {
    dirStr = dir > 0 ? 'down' : 'up';
  } else {
    dirStr = dir > 0 ? 'right' : 'left';
  }
  return (state, dispatch, view) => {
    const sel = state.selection;
    let $start = dir > 0 ? sel.$to : sel.$from;
    let mustMove = sel.empty;
    if (sel instanceof TextSelection) {
      if (!view.endOfTextblock(dirStr)) return false;
      mustMove = false;
      $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
    }
    const $found = GapCursor.findFrom($start, dir, mustMove);
    if (!$found) return false;
    if (dispatch) dispatch(state.tr.setSelection(new GapCursor($found)));
    return true;
  };
}

const handleKeyDown = keydownHandler({
  ArrowLeft: arrow('horiz', -1),
  ArrowRight: arrow('horiz', 1),
  ArrowUp: arrow('vert', -1),
  ArrowDown: arrow('vert', 1),
});

function handleClick(view, pos) {
  const $pos = view.state.doc.resolve(pos);
  if (!GapCursor.valid($pos)) return false;
  view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
  return true;
}

function drawGapCursor(state) {
  if (!(state.selection instanceof GapCursor)) return null;
  const node = document.createElement('div');
  node.className = 'ProseMirror-gapcursor';
  return DecorationSet.create(state.doc, [Decoration.widget(state.selection.head, node, { key: 'gapcursor' })]);
}

// :: () → Plugin
// Create a gap cursor plugin. When enabled, this will capture clicks
// near and arrow-key-motion past places that don't have a normally
// selectable position nearby, and create a gap cursor selection for
// them.
export const gapCursor = () =>
  new Plugin({
    props: {
      decorations: drawGapCursor,

      createSelectionBetween(_view, $anchor, $head) {
        if ($anchor.pos === $head.pos && GapCursor.valid($head)) {
          return new GapCursor($head);
        }
        return undefined;
      },

      handleClick,
      handleKeyDown,
    },
  });
