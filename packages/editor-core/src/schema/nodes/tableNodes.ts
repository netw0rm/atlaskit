import { tableNodes, NodeSpec } from '../../prosemirror';

/**
 * @name table_node
 * @additionalProperties false
 */
export interface Table {
  type: 'table';
  /**
   * @minItems 1
   */
  content: Array<TableRow>;
}

/**
 * @name table_row_node
 * @additionalProperties false
 */
export interface TableRow {
  type: 'tableRow';
  /**
   * @minItems 1
   */
  content: Array<TableCell> | Array<TableHeader>;
}

/**
 * @name table_cell_node
 * @additionalProperties false
 */
export interface TableCell {
  type: 'tableCell';
  /**
   * @additionalProperties false
   */
  attr: CellAttributes;
}

/**
 * @name table_header_node
 * @additionalProperties false
 */
export interface TableHeader {
  type: 'tableHeader';
  /**
   * @additionalProperties false
   */
  attr: CellAttributes;
}

export interface CellAttributes {
  colspan: number;
  rowspan: number;
  background?: string;
}

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
          attrs.style = (attrs.style || '') + `backgroundcolor: ${value};`;
        }
      }
    }
  }
});

const table: NodeSpec = {...nodes.table, content: 'tableRow+'};
const tableCell: NodeSpec = nodes.table_cell;
const tableHeader: NodeSpec = nodes.table_header;
const tableRow: NodeSpec = {...nodes.table_row, content: '(tableCell | tableHeader)*'};

export {
  table,
  tableCell,
  tableHeader,
  tableRow
};
