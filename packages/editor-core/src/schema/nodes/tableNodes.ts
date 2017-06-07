import { tableNodes } from '../../prosemirror';

const {
  table,
  table_cell,
  table_header,
  table_row
} = tableNodes({
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

export {
  table,
  table_cell,
  table_header,
  table_row
};
