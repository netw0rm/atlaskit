import * as React from 'react';
import { EditorPlugin } from '../../types';
import { stateKey as blockTypeStateKey, BlockTypeState } from '../../../plugins/block-type';
import { stateKey as mediaStateKey } from '../../../plugins/media';
import { stateKey as mentionStateKey } from '../../../plugins/mentions';
import { stateKey as tablesStateKey } from '../../../plugins/table';
import { pluginKey as macroStateKey } from '../macro/plugin';
import { insertMacroFromMacroBrowser } from '../macro/actions';
import WithPluginState from '../../ui/WithPluginState';
import ToolbarInsertBlock from '../../../ui/ToolbarInsertBlock';

const insertBlockPlugin: EditorPlugin = {
  primaryToolbarComponent(editorView, eventDispatcher, providerFactory, appearance, popupsMountPoint, popupsBoundariesElement, disabled, editorWidth) {
    const isCommentAppearance = appearance === 'comment';

    return <WithPluginState
      editorView={editorView}
      eventDispatcher={eventDispatcher}
      plugins={{
        blockTypeState: blockTypeStateKey,
        mediaState: !isCommentAppearance ? mediaStateKey : undefined,
        tablesState: tablesStateKey,
        mentionsState: mentionStateKey,
        macroState: macroStateKey
      }}
      // tslint:disable-next-line:jsx-no-lambda
      render={({
        blockTypeState = {} as BlockTypeState,
        mediaState,
        mentionsState,
        tablesState,
        macroState
      }) => (
        <ToolbarInsertBlock
          isDisabled={disabled}
          editorView={editorView}
          editorWidth={editorWidth}
          tableActive={tablesState && tablesState.tableActive}
          tableHidden={tablesState && tablesState.tableHidden}
          tableSupported={!!tablesState}

          mentionsEnabled={mentionsState && mentionsState.enabled}
          insertMentionQuery={mentionsState && mentionsState.insertMentionQuery}
          mentionsSupported={!!mentionsState}

          mediaUploadsEnabled={mediaState && mediaState.allowsUploads}
          onShowMediaPicker={mediaState && mediaState.showMediaPicker}
          mediaSupported={!!mediaState}

          availableWrapperBlockTypes={blockTypeState.availableWrapperBlockTypes}
          onInsertBlockType={blockTypeState.insertBlockType}

          onInsertMacroFromMacroBrowser={insertMacroFromMacroBrowser}
          macroProvider={macroState.macroProvider}

          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
        />
      )}
    />;
  }
};

export default insertBlockPlugin;
