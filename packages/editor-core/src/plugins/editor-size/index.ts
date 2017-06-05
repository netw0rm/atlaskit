import { Plugin, PluginKey, Schema, EditorView } from '../../prosemirror';
import { akColorN40 } from '@atlaskit/util-shared-styles';

export const stateKey = new PluginKey('editorSizePlugin');

const getPlugin = (maxHeight: number) => {
  return new Plugin({
    view: (editorView: EditorView) => {
      editorView.dom.style.maxHeight = `${maxHeight}px`;
      editorView.dom.style.overflow = 'auto';
      return {
      };
    },
    key: stateKey,
    props: {
      handleKeyDown(view, event) {
        if (maxHeight) {
          if (view.dom.clientHeight >= maxHeight && !view.dom.style.borderBottom) {
            view.dom.style.borderBottom = `1px solid ${akColorN40}`;
          } else if (view.dom.clientHeight < maxHeight &&
            view.dom.style.borderBottom) {
            view.dom.style.borderBottom = null;
          }
        }
        return false;
      }
    }
  });
};

const plugins = (schema: Schema<any, any>, maxHeight: number) => {
  return [getPlugin(maxHeight)] as Plugin[];
};

export default plugins;
