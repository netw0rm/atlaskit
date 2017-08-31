import * as React from 'react';
import { tableEditing } from '../../../prosemirror';
import { EditorPlugin } from '../../types';
import { plugin, stateKey } from '../../../plugins/table';
import { table, tableCell, tableHeader, tableRow } from '../../../schema/nodes/tableNodes';
import TableFloatingControls from '../../../ui/TableFloatingControls';
import TableFloatingToolbar from '../../../ui/TableFloatingToolbar';

const tablesPlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 1700, name: 'table', node: table },
      { rank: 1800, name: 'tableHeader', node: tableHeader },
      { rank: 1900, name: 'tableRow', node: tableRow },
      { rank: 2000, name: 'tableCell', node: tableCell }
    ];
  },

  pmPlugins() {
    return [
      { rank: 900, plugin: () => plugin() },
      { rank: 910, plugin: () => tableEditing() },
    ];
  },

  contentComponent(editorView) {
    const pluginState = stateKey.getState(editorView.state);

    return (
      <div>
        <TableFloatingControls editorView={editorView} pluginState={pluginState} />
        <TableFloatingToolbar editorView={editorView} pluginState={pluginState} />
      </div>
    );
  }
};

export default tablesPlugin;
