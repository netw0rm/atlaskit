import {
  EditorState,
  Selection,
  TableMap,
  Transaction
} from '../../prosemirror';
import * as tableBaseCommands from '../../prosemirror/prosemirror-tables';
import { stateKey } from './';
import { createTableNode } from './utils';

export interface Command {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
}

export function createTable (): Command {
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
}

export function goToNextCell (direction: number): Command {
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
}

export function cut (): Command {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    pluginState.closeFloatingToolbar();
    return true;
  };
}

export function copy (): Command {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    pluginState.closeFloatingToolbar();
    return true;
  };
}

export function paste (): Command {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    pluginState.closeFloatingToolbar();
    return true;
  };
}

export function addRowAfter (): Command {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    if (!pluginState.tableNode) {
      return false;
    }
    pluginState.insertRow(pluginState.getRowNumber() + 1);
    return true;
  };
}

export function addRowBefore (): Command {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    if (!pluginState.tableNode) {
      return false;
    }
    const cell = pluginState.getCurrentCellNode();
    if (cell.type !== state.schema.nodes.tableHeader) {
      pluginState.insertRow(pluginState.getRowNumber());
    }
    return true;
  };
}

export function addColumnAfter (): Command {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    if (!pluginState.tableNode) {
      return false;
    }
    pluginState.insertColumn(pluginState.getColumnNumber() + 1);
    return true;
  };
}

export function addColumnBefore (): Command {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const pluginState = stateKey.getState(state);
    if (!pluginState.tableNode) {
      return false;
    }
    pluginState.insertColumn(pluginState.getColumnNumber());
    return true;
  };
}
