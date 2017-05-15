import {
  Selection,
  TextSelection,
  keymap
} from '../../prosemirror';

function arrowHandler(dir) {
  return (state, dispatch, view) => {
    if (state.selection.empty && view.endOfTextblock(dir)) {
      let side = dir === 'left' || dir === 'up' ? -1 : 1;
      const $head = state.selection.$head;
      let nextPos = Selection.near(state.doc.resolve(side > 0 ? $head.after() : $head.before()), side) as TextSelection;
      if (nextPos.$head && nextPos.$head.parent.type.name === 'codeBlock') {
        dispatch(state.tr.setSelection(nextPos));
        return true;
      }
    }
    return false;
  };
}

export const codeMirrorKeymaps = keymap({
  ArrowLeft: arrowHandler('left'),
  ArrowRight: arrowHandler('right'),
  ArrowUp: arrowHandler('up'),
  ArrowDown: arrowHandler('down')
});
