import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MediaType } from '@atlaskit/editor-common';

import { Node as PMNode, Schema } from 'prosemirror-model';
import { EditorState, NodeSelection, Plugin } from 'prosemirror-state';
import { insertPoint } from 'prosemirror-transform';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';

import { Dispatch } from '../../editor/event-dispatcher';
import { MediaPluginOptions } from './media-plugin-options';
import { ProsemirrorGetPosHandler } from '../../nodeviews';
import { nodeViewFactory } from '../../nodeviews';
import { ReactMediaGroupNode, ReactMediaNode, ReactSingleImageNode } from '../../nodeviews';
import keymapPlugin from './keymap';
import DropPlaceholder from '../../ui/Media/DropPlaceholder';
import { SlimMediaPluginState } from './slim-media-plugin-state';
import { MediaPluginState } from './media-plugin-state';
import { stateKey } from './state-key';

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export const createPlugin = (schema: Schema, options: MediaPluginOptions, dispatch?: Dispatch) => {
  const dropZone = document.createElement('div');
  ReactDOM.render(React.createElement(DropPlaceholder), dropZone);

  return new Plugin({
    state: {
      init(config, state) {
        if (options.slim) {
          return new SlimMediaPluginState(state, options, dispatch!);
        } else {
          return new MediaPluginState(state, options, dispatch!);
        }
      },
      apply(tr, pluginState: MediaPluginState, oldState, newState) {
        pluginState.detectLinkRangesInSteps(tr, oldState);

        // Ignore creating link cards during link editing
        const { link } = oldState.schema.marks;
        const { nodeAfter, nodeBefore } = newState.selection.$from;

        if ((nodeAfter && link.isInSet(nodeAfter.marks)) ||
          (nodeBefore && link.isInSet(nodeBefore.marks))
        ) {
          pluginState.ignoreLinks = true;
        }

        // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
        //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
        //       transformations from within the plugin state (i.e. when adding a new file).
        return pluginState;
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      const pluginState: MediaPluginState = stateKey.getState(view.state);
      pluginState.setView(view);

      return {
        update: (view: EditorView, prevState: EditorState) => {
          pluginState.insertLinks();
        }
      };
    },
    props: {
      decorations: (state: EditorState) => {
        const pluginState = stateKey.getState(state);
        if ((pluginState instanceof SlimMediaPluginState) || !pluginState.showDropzone) {
          return;
        }

        const { schema, selection: { $anchor } } = state;
        // When a media is already selected
        if (state.selection instanceof NodeSelection) {
          return;
        }

        let pos: number | null | undefined = $anchor.pos;
        if (
          $anchor.parent.type !== schema.nodes.paragraph &&
          $anchor.parent.type !== schema.nodes.codeBlock
        ) {
          pos = insertPoint(state.doc, pos, schema.nodes.mediaGroup);
        }

        if (pos === null || pos === undefined) {
          return;
        }

        const dropPlaceholders: Decoration[] = [
          Decoration.widget(pos, dropZone, { key: 'drop-placeholder' })
        ];
        return DecorationSet.create(state.doc, dropPlaceholders);
      },
      nodeViews: {
        mediaGroup: nodeViewFactory(options.providerFactory, {
          mediaGroup: ReactMediaGroupNode,
          media: ReactMediaNode,
        }, true),
        singleImage: nodeViewFactory(options.providerFactory, {
          singleImage: ReactSingleImageNode,
          media: ReactMediaNode,
        }, true),
      },
      handleTextInput(view: EditorView, from: number, to: number, text: string): boolean {
        const pluginState: MediaPluginState = stateKey.getState(view.state);
        pluginState.splitMediaGroup();
        return false;
      }
    }
  });
};

const plugins = (schema: Schema, options: MediaPluginOptions, dispatch?: Dispatch) => {
  return [createPlugin(schema, options, dispatch), keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export { stateKey, SlimMediaPluginState, MediaPluginState };

export default plugins;

export interface MediaData {
  id: string;
  type?: MediaType;
}
