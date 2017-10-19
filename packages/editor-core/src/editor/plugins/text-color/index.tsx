import * as React from 'react';
import { EditorPlugin } from '../../types';
import { plugin, stateKey } from '../../../plugins/text-color';
import { textColor } from '../../../schema/marks/text-color';
import ToolbarTextColor from '../../../ui/ToolbarTextColor';

const textColorPlugin: EditorPlugin = {
  marks() {
    return [{ name: 'textColor', mark: textColor, rank: 1700 }];
  },

  pmPlugins() {
    return [
      { rank: 600, plugin: () => plugin },
    ];
  },

  primaryToolbarComponent(editorView, eventDispatcher, providerFactory, appearance, popupsMountPoint, popupsBoundariesElement) {
    const pluginState = stateKey.getState(editorView.state);
    return <ToolbarTextColor editorView={editorView} pluginState={pluginState} popupsMountPoint={popupsMountPoint} popupsBoundariesElement={popupsBoundariesElement}/>;
  }
};

export default textColorPlugin;
