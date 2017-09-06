import { analyticsService } from '../../../analytics';
import { EditorView, EditorState, Plugin, TextSelection, keymap } from '../../../prosemirror';
import { EditorPlugin } from '../../types';

export function createPlugin(onSave?: (editorView: EditorView) => void): Plugin | undefined {
  if (!onSave) {
    return;
  }

  return keymap({
    'Enter'(state: EditorState<any>, dispatch: (tr) => void, editorView: EditorView) {
      if (canSaveOnEnter(editorView)) {
        analyticsService.trackEvent('atlassian.editor.stop.submit');
        onSave(editorView);
        return true;
      }
      return false;
    }
  });
}

function canSaveOnEnter(editorView: EditorView) {
  const { $cursor } = editorView.state.selection as TextSelection;
  const { decisionItem, paragraph, taskItem } = editorView.state.schema.nodes;
  return !$cursor
    || ($cursor.parent.type === paragraph && $cursor.depth === 1)
    || ($cursor.parent.type === decisionItem && !isEmptyAtCursor($cursor))
    || ($cursor.parent.type === taskItem && !isEmptyAtCursor($cursor))
  ;
}

function isEmptyAtCursor($cursor) {
  const { content } = $cursor.parent;
  return !(content && content.size);
}

const saveOnEnterPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 9700, plugin: (schema, props) => createPlugin(props.onSave)}
    ];
  }
};

export default saveOnEnterPlugin;
