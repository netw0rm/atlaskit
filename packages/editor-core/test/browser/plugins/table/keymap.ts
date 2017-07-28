import * as chai from 'chai';
import { expect } from 'chai';
import tablePlugins, { TableState } from '../../../../src/plugins/table';
import { TableMap, CellSelection } from '../../../../src/prosemirror';

import {
  chaiPlugin, doc, createEvent, makeEditor, sendKeyToPm, table, tr, td, tdEmpty, tdCursor, thEmpty, p
} from '../../../../src/test-helper';

chai.use(chaiPlugin);

describe('table keymap', () => {
  const event = createEvent('event');
  const editor = (doc: any) => makeEditor<TableState>({
    doc,
    plugins: tablePlugins(),
  });

  describe('Tab keypress', () => {
    context('when the cursor is at the first cell of the first row', () => {
      it('it should select next cell of the current row', () => {
        const { editorView, refs } = editor(
          doc(table(tr(tdCursor, td({})(p('{nextPos}')), tdEmpty )))
        );
        const { nextPos } = refs;
        sendKeyToPm(editorView, 'Tab');
        expect(editorView.state.selection.$from.pos).to.equal(nextPos);
      });
    });

    context('when the cursor is at the last cell of the first row', () => {
      it('it should select first cell of the next row', () => {
        const { editorView, refs } = editor(
          doc(table(
            tr(tdEmpty, tdEmpty, tdCursor ),
            tr(td({})(p('{nextPos}')), tdEmpty, tdEmpty )
          ))
        );
        const { nextPos } = refs;
        sendKeyToPm(editorView, 'Tab');
        expect(editorView.state.selection.$from.pos).to.equal(nextPos);
      });
    });

    context('when the cursor is at the last cell of the last row', () => {
      it('it should create a new row and select the first cell of the new row', () => {
        const { editorView, pluginState } = editor(
          doc(table(
            tr(tdEmpty, tdEmpty, tdEmpty ),
            tr(tdEmpty, tdEmpty, tdCursor )
          ))
        );
        sendKeyToPm(editorView, 'Tab');
        const map = TableMap.get(pluginState.tableNode!);
        expect(map.height).to.equal(3);
        expect(editorView.state.selection.$from.pos).to.equal(32);
      });
    });
  });

  describe('Shift-Tab keypress', () => {
    context('when the cursor is at the last cell of the first row', () => {
      it('it should select previous cell of the current row', () => {
        const { editorView, refs } = editor(
          doc(table(tr(tdEmpty, td({})(p('{nextPos}')), tdCursor )))
        );
        const { nextPos } = refs;
        sendKeyToPm(editorView, 'Shift-Tab');
        expect(editorView.state.selection.$from.pos).to.equal(nextPos);
      });
    });

    context('when the cursor is at the first cell of the second row', () => {
      it('it should select the last cell of the first row', () => {
        const { editorView, refs } = editor(
          doc(table(
            tr(tdEmpty, tdEmpty, td({})(p('{nextPos}'))),
            tr(tdCursor, tdEmpty, tdEmpty )
          ))
        );
        const { nextPos } = refs;
        sendKeyToPm(editorView, 'Shift-Tab');
        expect(editorView.state.selection.$from.pos).to.equal(nextPos);
      });
    });

    context('Shift-Alt-T keypress', () => {
      it('it should insert 3x3 table', () => {
        const tableNode = table(
          tr(thEmpty, thEmpty, thEmpty ),
          tr(tdEmpty, tdEmpty, tdEmpty ),
          tr(tdEmpty, tdEmpty, tdEmpty )
        );
        const { editorView } = editor(doc(p('{<>}')));
        sendKeyToPm(editorView, 'Shift-Alt-T');
        expect(editorView.state.doc).to.deep.equal(doc(tableNode));
      });
    });
  });

  describe('Backspace keypress', () => {
    context('when table is selected', () => {
      it('it should empty table cells', () => {
        const { editorView, plugin, pluginState } = editor(
          doc(table(tr(tdCursor, td({})(p('2')), td({})(p('3')))))
        );
        plugin.props.onFocus!(editorView, event);
        pluginState.selectTable();
        expect(editorView.state.selection instanceof CellSelection).to.equal(true);
        sendKeyToPm(editorView, 'Backspace');
        expect(editorView.state.doc).to.deep.equal(doc(table(tr(tdEmpty, tdEmpty, tdEmpty))));
      });
    });

    [0, 1, 2].forEach(index => {
      context(`when row ${index + 1} is selected`, () => {
        it(`it should empty cells in the row ${index + 1}`, () => {
          const { editorView, plugin, pluginState } = editor(
            doc(table(tr(td({})(p('{<>}1'))), tr(td({})(p('2'))), tr(td({})(p('3')))))
          );
          plugin.props.onFocus!(editorView, event);
          pluginState.selectRow(index);
          expect(editorView.state.selection instanceof CellSelection).to.equal(true);
          sendKeyToPm(editorView, 'Backspace');
          const rows: any = [];
          for (let i = 0; i < 3; i++) {
            rows.push(tr(td({})(p( i === index ? '' : `${i + 1}`))));
          }
          expect(editorView.state.doc).to.deep.equal(doc(table(rows)));
        });
      });

      context(`when column ${index + 1} is selected`, () => {
        it(`it should empty cells in the column ${index + 1}`, () => {
          const { editorView, plugin, pluginState } = editor(
            doc(table(tr(td({})(p('{<>}1')), td({})(p('2')), td({})(p('3')))))
          );
          plugin.props.onFocus!(editorView, event);
          pluginState.selectColumn(index);
          expect(editorView.state.selection instanceof CellSelection).to.equal(true);
          sendKeyToPm(editorView, 'Backspace');
          const columns: any = [];
          for (let i = 0; i < 3; i++) {
            columns.push(td({})(p( i === index ? '' : `${i + 1}`)));
          }
          expect(editorView.state.doc).to.deep.equal(doc(table(tr(columns))));
        });
      });
    });
  });
});
