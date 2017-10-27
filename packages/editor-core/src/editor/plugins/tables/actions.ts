import { pluginKey as hoverSelectionPluginKey } from './hoverSelectionPlugin';
import { stateKey as tablePluginKey } from '../../../plugins/table';
import { EditorView } from 'prosemirror-view';

import {
  getColumnPos,
  getRowPos,
  getTablePos
} from '../../../plugins/table/utils';
import { getHoveredCells } from './utils';

export const resetHoverSelection = (view: EditorView) => {
  const { state: { tr }, dispatch } = view;
  dispatch(tr.setMeta(hoverSelectionPluginKey, { cells: null }));
};

export const hoverColumn = (column: number, view: EditorView): void => {
  const { tableNode } = tablePluginKey.getState(view.state);
  const { state: { tr }, dispatch } = view;
  const { from, to } = getColumnPos(column, tableNode);
  dispatch(tr.setMeta(hoverSelectionPluginKey, { cells: getHoveredCells(from, to, tableNode, view) }));
};

export const hoverRow = (row: number, view: EditorView): void => {
  const { tableNode } = tablePluginKey.getState(view.state);
  const { state: { tr }, dispatch } = view;
  const { from, to } = getRowPos(row, tableNode);
  dispatch(tr.setMeta(hoverSelectionPluginKey, { cells: getHoveredCells(from, to, tableNode, view) }));
};

export const hoverTable = (view: EditorView) => {
  const { tableNode } = tablePluginKey.getState(view.state);
  const { state: { tr }, dispatch } = view;
  const { from, to } = getTablePos(tableNode);
  dispatch(tr.setMeta(hoverSelectionPluginKey, { cells: getHoveredCells(from, to, tableNode, view) }));
};
