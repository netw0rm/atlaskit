import { Plugin, PluginKey, Schema } from '../../prosemirror';
import { akColorN40 } from '@atlaskit/util-shared-styles';

export const stateKey = new PluginKey('editorSizePlugin');

const getPlugin = (maxHeight: string) => {
  return new Plugin({
    key: stateKey,
    props: {
      handleKeyDown(view, event) {
        if (maxHeight) {
          const matches = /(\d*)px/.exec(maxHeight);
          const height = matches && Number(matches[1]);
          if (height && !isNaN(height) && view.dom.clientHeight > height) {
            view.dom.style.height = maxHeight;
            view.dom.style.overflow = 'scroll';
            view.dom.style.borderBottom = `1px solid ${akColorN40}`;
          }
        }
        return false;
      },
    }
  });
};

const plugins = (schema: Schema<any, any>, maxHeight: string) => {
  return [getPlugin(maxHeight)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
