import * as React from 'react';
import { EditorPlugin } from '../../types';
import { stateKey as pluginKey, createPlugin } from '../../../plugins/media';
import keymapPlugin from '../../../plugins/media/keymap';
import { media } from '../../../schema/nodes/media';
import { mediaGroup } from '../../../schema/nodes/media-group';
import ToolbarMedia from '../../../ui/ToolbarMedia';

const mediaPlugin: EditorPlugin = {
  nodes() {
    return [
      { name: 'mediaGroup', node: mediaGroup, rank: 1700 },
      { name: 'media', node: media, rank: 1800 }
    ];
  },

  pmPlugins() {
    return [
      {
        rank: 1200,
        plugin: (schema, props, dispatch, providerFactory, errorReporter) =>
          createPlugin(
            schema,
            {
              providerFactory,
              errorReporter,
              uploadErrorHandler: props.uploadErrorHandler,
              waitForMediaUpload: props.waitForMediaUpload
            }
          )
      },
      { rank: 1220, plugin: schema => keymapPlugin(schema) }
    ];
  },

  secondaryToolbarComponent(editorView, eventDispatcher) {
    return <ToolbarMedia editorView={editorView} pluginKey={pluginKey} />;
  }
};

export default mediaPlugin;
