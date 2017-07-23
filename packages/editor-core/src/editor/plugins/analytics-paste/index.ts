import { analyticsService } from '../../../analytics';
import { Plugin, PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';

export const pluginKey = new PluginKey('analyticsPaste');

export const analyticsPaste = new Plugin({
  key: pluginKey,
  props: {
    handleDOMEvents: {
      paste() {
        analyticsService.trackEvent('atlassian.editor.paste');
        return false;
      }
    }
  }
});

const analyticsPastePlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 0, plugin: () => analyticsPaste }
    ];
  }
};

export default analyticsPastePlugin;
