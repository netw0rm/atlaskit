import * as React from 'react';
import { EditorPlugin } from '../../types';
import { stateKey as blockTypeStateKey } from '../../../plugins/block-type';
import { stateKey as mediaStateKey } from '../../../plugins/media';
import { stateKey as tablesStateKey } from '../../../plugins/table';
import ToolbarInsertBlock from '../../../ui/ToolbarInsertBlock';

const insertBlockPlugin: EditorPlugin = {
  primaryToolbarComponent(editorView) {
    const pluginStateBlockType = blockTypeStateKey.getState(editorView.state);
    const pluginStateTable = tablesStateKey.getState(editorView.state);
    const pluginStateMedia = mediaStateKey.getState(editorView.state);
    return <ToolbarInsertBlock
      editorView={editorView}
      pluginStateBlockType={pluginStateBlockType}
      pluginStateTable={pluginStateTable}
      pluginStateMedia={pluginStateMedia}
    />;
  }
};

export default insertBlockPlugin;
