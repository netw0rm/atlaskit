import * as React from 'react';
import { EditorPlugin } from '../../types';
import { stateKey as blockTypeStateKey } from '../../../plugins/block-type';
import { stateKey as mediaStateKey } from '../../../plugins/media';
import { stateKey as tablesStateKey } from '../../../plugins/table';
import { pluginKey as macroStateKey } from '../macro';
import WithPluginState from '../../ui/WithPluginState';
import ToolbarInsertBlock from '../../../ui/ToolbarInsertBlock';

const insertBlockPlugin: EditorPlugin = {
  primaryToolbarComponent(editorView, eventDispatcher, providerFactory, appearance) {
    const isCommentAppearance = appearance === 'comment';

    return <WithPluginState
      editorView={editorView}
      eventDispatcher={eventDispatcher}
      plugins={{
        blockTypeState: blockTypeStateKey,
        mediaState: !isCommentAppearance ? mediaStateKey : undefined,
        tablesState: tablesStateKey,
        macroState: macroStateKey
      }}
      // tslint:disable-next-line:jsx-no-lambda
      render={({
        blockTypeState = {} as any,
        mediaState = {} as any,
        tablesState = {} as any,
        macroState = {} as any
      }) => (
        <ToolbarInsertBlock
          editorView={editorView}
          tableActive={tablesState.tableActive}
          tableHidden={tablesState.tableHidden}

          mediaUploadsEnabled={mediaState.allowsUploads}
          showMediaPicker={mediaState.showMediaPicker}

          availableWrapperBlockTypes={blockTypeState.availableWrapperBlockTypes}
          insertBlockType={blockTypeState.insertBlockType}

          allowMacro={macroState.allowMacro}
          openMacroBrowser={macroState.openMacroBrowser}
          macroProvider={macroState.macroProvider}
        />
      )}
    />;
  }
};

export default insertBlockPlugin;
