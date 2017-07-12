
import * as assert from 'assert';

import {
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
  MediaStateManager,
  UploadParams,
} from '@atlaskit/media-core';

import { copyOptionalAttrs, MediaType } from './../../schema/nodes/media';
import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  Node as PMNode,
  Schema,
  Transaction,
  NodeSelection,
} from '../../prosemirror';
import PickerFacade from './picker-facade';
import { ContextConfig } from '@atlaskit/media-core';
import { ErrorReporter, setNodeSelection } from '../../utils';

import { MediaPluginOptions } from './media-plugin-options';
import { ProsemirrorGetPosHandler } from '../../nodeviews';
import { nodeViewFactory } from '../../nodeviews';
import { ReactMediaGroupNode, ReactMediaNode } from '../../';

export const handleMediaNodeRemoval = (view: EditorView, node: PMNode, getPos: ProsemirrorGetPosHandler) => {
  const { id } = node.attrs;

  const nodePos = getPos();
  const tr = view.state.tr.deleteRange(nodePos, nodePos + node.nodeSize);

  if (isTemporaryFile(id)) {
    tr.setMeta('addToHistory', false);
  }
  view.dispatch(tr);

  setSelectionAfterRemoval(view, nodePos);
};

const setSelectionAfterRemoval = (view: EditorView, currentPos: number): void => {
  const { doc } = view.state;
  const $previousMediaNodePos = doc.resolve(currentPos - 1);
  const previousMediaNode = $previousMediaNodePos.nodeAfter;

  // Only set selection to previous media node if there is one
  // otherwise, let prosemirror handle with default behaviour.
  if (previousMediaNode) {
    setNodeSelection(view, $previousMediaNodePos.pos);
  }
};

const isTemporaryFile = (id: string): boolean => {
  return id.indexOf('temporary:') === 0;
};
