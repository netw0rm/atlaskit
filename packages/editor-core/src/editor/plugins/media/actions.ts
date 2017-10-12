import { EditorView } from '../../../prosemirror';

export const STATE_CHANGE = 'media.handleStateChange';

export const handleStateChange = (view: EditorView) => {
  if (view.docView) {
    view.dispatch(view.state.tr.setMeta(STATE_CHANGE, true));
  }
};
