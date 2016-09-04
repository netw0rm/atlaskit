import { Attribute, Block, Node } from 'ak-editor-prosemirror';
import { define, prop, } from 'skatejs';

const { vdom } = require('skatejs');

export class Doc extends Block {}

export class Table extends Block {
  get attrs() {
    return {
      cols: new Attribute({ default: '[1,2]' }),
      rows: new Attribute({ default: '[1,2]' }),
    };
  }

  toDOM(node: Node) {
    return ["ak-editor-table", node.attrs, 0];
  }
}

export class TableCell extends Block {
  get attrs() {
    return {
      row: new Attribute(),
      col: new Attribute(),
    };
  }

  toDOM(node: Node) {
    const { row, col } = node.attrs;
    return ['ak-editor-table-cell', { slot: `${row}-${col}` }, 0];
  }
}

interface IAkEditorTable extends HTMLElement {
  cols: number[];
  rows: number[];
}

define('ak-editor-table', {
  props: {
    rows: prop.array({ attribute: true }),
    cols: prop.array({ attribute: true }),
  },

  created(elem: IAkEditorTable) {
    elem.addEventListener('keydown', (e) => {
      alert(`keydown ${e}`);
    });
  },

  render(elem: IAkEditorTable) {
    return (
      <table border="1">
        <tbody>
        {elem.rows.map(row => (
          <tr>{elem.cols.map(col => (
            <td><slot name={`${row}-${col}`}>empty</slot></td>
          ))}</tr>
        ))}
        </tbody>
      </table>
    );
  },
});

interface IAkEditorTableCell extends HTMLElement {
  cols: number[];
  rows: number[];
}

define('ak-editor-table-cell', {
  props: {
    row: prop.number({ attribute: true }),
    col: prop.number({ attribute: true }),
  },

  created(elem: IAkEditorTableCell) {
  },

  render(elem: IAkEditorTableCell) {
    return (<slot />);
  },
});
