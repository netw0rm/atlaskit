import { EditorPlugin } from '../../types';
import { createPlugin } from '../../../plugins/paste';

const paste: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 100, plugin: createPlugin }
    ];
  }
};

export default paste;
