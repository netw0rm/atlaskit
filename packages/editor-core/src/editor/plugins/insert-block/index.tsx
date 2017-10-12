import * as React from 'react';
import { EditorPlugin } from '../../types';
import { stateKey as blockTypeStateKey } from '../../../plugins/block-type';
import { BlockType } from '../../../plugins/block-type/types';
import { stateKey as mediaStateKey } from '../../../plugins/media';
import { stateKey as tablesStateKey } from '../../../plugins/table';
import { pluginKey as macroStateKey } from '../macro';
import { MacroProvider } from '../macro/types';
import { openMacroBrowser } from '../macro/actions';
import WithPluginState from '../../ui/WithPluginState';
import ToolbarInsertBlock from '../../../ui/ToolbarInsertBlock';
import { EditorView } from '../../../prosemirror';

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
        blockTypeState = {} as { availableWrapperBlockTypes: BlockType[], insertBlockType: (name: string, view: EditorView) => void },
        mediaState = {} as { allowsUploads: boolean, showMediaPicker: () => void },
        tablesState = {} as { tableActive: boolean, tableHidden: boolean },
        macroState = {} as { allowMacro: boolean, macroProvider: MacroProvider }
      }) => (
        <ToolbarInsertBlock
          editorView={editorView}
          tableActive={tablesState.tableActive}
          tableHidden={tablesState.tableHidden}

          mediaUploadsEnabled={mediaState.allowsUploads}
          onShowMediaPicker={mediaState.showMediaPicker}

          availableWrapperBlockTypes={blockTypeState.availableWrapperBlockTypes}
          onInsertBlockType={blockTypeState.insertBlockType}

          allowMacro={macroState.allowMacro}
          onOpenMacroBrowser={openMacroBrowser}
          macroProvider={macroState.macroProvider}
        />
      )}
    />;
  }
};

export default insertBlockPlugin;
