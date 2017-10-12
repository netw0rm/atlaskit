import { EditorView } from '../../../prosemirror';

export const STATE_CHANGE = 'media.handleStateChange';

export const handleStateChange = (view: EditorView) => {
  // make sure editable DOM node is mounted
  if (view.dom.parentNode) {
    view.dispatch(view.state.tr.setMeta(STATE_CHANGE, true));
  }
};
