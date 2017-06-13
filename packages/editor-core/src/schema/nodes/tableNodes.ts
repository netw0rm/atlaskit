import { tableNodes, NodeSpec } from '../../prosemirror';

// TS doesn't generate type if we destructure here
const nodes = tableNodes({
  tableGroup: 'block',
  cellContent: 'block+',
  cellAttributes: {
    background: {
      default: null,
      getFromDOM(dom) {
        return dom.style.backgroundColor || null;
      },
      setDOMAttr(value, attrs) {
        if (value) {
          attrs.style = (attrs.style || '') + `background-color: ${value};`;
        }
      }
    }
  }
});

const table: NodeSpec = nodes.table;
const table_cell: NodeSpec = nodes.table_cell;
const table_header: NodeSpec = nodes.table_header;
const table_row: NodeSpec = nodes.table_row;

export {
  table,
  table_cell,
  table_header,
  table_row
};
