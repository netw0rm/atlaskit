import {
  EditorState,
  Selection,
  TableMap,
  Transaction,
  CellSelection
} from '../../prosemirror';
import * as tableBaseCommands from '../../prosemirror/prosemirror-tables';
import { stateKey } from './';
import { createTableNode } from './utils';

export interface Command {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
}

const createTable = (): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    if (pluginState.tableDisabled || pluginState.tableElement) {
      return false;
    }
    pluginState.focusEditor();
    const table = createTableNode(3, 3, state.schema);
    const tr = state.tr.replaceSelectionWith(table);
    tr.setSelection(Selection.near(tr.doc.resolve(state.selection.from)));
    dispatch(tr.scrollIntoView());
    return true;
  };
};

const goToNextCell = (direction: number): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    if (!pluginState.tableNode) {
      return false;
    }
    const offset = pluginState.tableStartPos();
    if (!offset) {
      return false;
    }
    const map = TableMap.get(pluginState.tableNode);
    const lastCellPos =  map.positionAt(map.height - 1, map.width - 1, pluginState.tableNode) + offset + 1;
    if (lastCellPos ===  pluginState.getCurrentCellStartPos() && direction === 1) {
      pluginState.insertRow(map.height);
      return true;
    }
    return tableBaseCommands.goToNextCell(direction)(state, dispatch);
  };
};

const cut = (): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    pluginState.closeFloatingToolbar();
    return true;
  };
};

const copy = (): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    pluginState.closeFloatingToolbar();
    return true;
  };
};

const paste = (): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    pluginState.closeFloatingToolbar();
    return true;
  };
};

const emptyCells = (): Command => {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    if (!pluginState.cellSelection) {
      return false;
    }
    pluginState.resetHoverSelection();
    pluginState.emptySelectedCells();
    const selection = pluginState.view.state.selection as CellSelection;
    const newPos = selection.$head.pos - selection.$head.parentOffset;
    pluginState.moveCursorInsideTableTo(newPos);
    return true;
  };
};

export default {
  createTable,
  goToNextCell,
  cut,
  copy,
  paste,
  emptyCells
};
