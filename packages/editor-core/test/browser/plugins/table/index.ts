import { expect } from 'chai';
import * as sinon from 'sinon';
import tablePlugin from '../../../../src/plugins/table';
import { CellSelection, TableMap } from '../../../../src/prosemirror';
import {
  createEvent, setTextSelection, chaiPlugin, doc, p, fixtures, makeEditor, thEmpty, table, tr, td,
  tdEmpty, tdCursor, code_block, code
} from '../../../../src/test-helper';

chai.use(chaiPlugin);
const fixture = fixtures();

const editor = (doc: any) => makeEditor({
  doc,
  plugins: tablePlugin(),
  place: fixture()
});

const event = createEvent('event');

describe('table plugin', () => {
  describe('subscribe', () => {
    it('calls subscriber with plugin', () => {
      const { pluginState } = editor(doc(p('paragraph')));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      expect(spy.calledWith(pluginState)).to.equal(true);
    });

    context('when leaving table', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, editorView } = editor(doc(p('{pPos}'), table(tr(tdCursor, tdEmpty, tdEmpty ))));
        const spy = sinon.spy();
        const { pPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(editorView, pPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when entering table', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, editorView } = editor(doc(p('{<>}'), table(tr(td({})(p('{nextPos}')), tdEmpty, tdEmpty ))));
        const spy = sinon.spy();
        const { nextPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(editorView, nextPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when moving cursor to a different table', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, editorView } = editor(doc(table(tr(tdCursor, tdEmpty, tdEmpty )), table(tr(td({})(p('{nextPos}')), tdEmpty, tdEmpty ))));
        const spy = sinon.spy();
        const { nextPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(editorView, nextPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when moving within the same table', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, editorView } = editor(doc(table(tr(tdCursor, tdEmpty, td({})(p('{nextPos}')) ))));
        const spy = sinon.spy();
        const { nextPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(editorView, nextPos);

        expect(spy.callCount).to.not.equal(2);
      });
    });

    context('when unsubscribe', () => {
      it('does not notify the subscriber', () => {
        const { pluginState } = editor(doc(table(tr(tdCursor, tdEmpty, tdEmpty ))));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        pluginState.unsubscribe(spy);

        expect(spy.callCount).to.equal(1);
      });
    });
  });

  describe('editorFocued', () => {
    context('when editor is focused', () => {
      it('it is true', () => {
        const { plugin, editorView, pluginState } = editor(doc(table(tr(tdCursor, tdEmpty, tdEmpty ))));
        plugin.props.onFocus!(editorView, event);
        expect(pluginState.editorFocused).to.equal(true);
      });
    });

    context('when editor is blur', () => {
      it('it is false', () => {
        const { plugin, editorView, pluginState } = editor(doc(table(tr(tdCursor, tdEmpty, tdEmpty ))));
        plugin.props.onBlur!(editorView, event);
        expect(pluginState.editorFocused).to.equal(false);
      });
    });
  });

  describe('createTable()', () => {
    context('when the cursor is inside the table', () => {
      it('it should not create a new table and return false', () => {
        const tableNode = table(tr( tdCursor ));
        const { plugin, pluginState, editorView } = editor(doc(tableNode));
        plugin.props.onFocus!(editorView, event);
        expect(pluginState.createTable()(editorView.state, editorView.dispatch)).to.equal(false);
        expect(editorView.state.doc).to.deep.equal(doc(tableNode));
      });
    });

    context('when the cursor is inside a codeblock', () => {
      it('it should not create a new table and return false', () => {
        const node = code_block()('{<>}');
        const { pluginState, editorView } = editor(doc(node));
        expect(pluginState.createTable()(editorView.state, editorView.dispatch)).to.equal(false);
        expect(editorView.state.doc).to.deep.equal(doc(node));
      });
    });

    context('when the cursor is inside inline code', () => {
      it('it should not create a new table and return false', () => {
        const node = p(code('te{<>}xt'));
        const { pluginState, editorView } = editor(doc(node));
        expect(pluginState.createTable()(editorView.state, editorView.dispatch)).to.equal(false);
        expect(editorView.state.doc).to.deep.equal(doc(node));
      });
    });

    context('when the cursor is outside the table', () => {
      it('it should create a new table and return true', () => {
        const { pluginState, editorView } = editor(doc(p('{<>}')));
        expect(pluginState.createTable()(editorView.state, editorView.dispatch)).to.equal(true);
        const tableNode = table(
          tr(thEmpty, thEmpty, thEmpty ),
          tr(tdEmpty, tdEmpty, tdEmpty ),
          tr(tdEmpty, tdEmpty, tdEmpty )
        );
        expect(editorView.state.doc).to.deep.equal(doc(tableNode));
      });
    });
  });

  describe('insertColumn(number)', () => {
    context('when table has 1 column', () => {
      context('when it called with 0', () => {
        it('it should prepend a new column and move cursor inside it\'s first cell', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor))));
          plugin.props.onFocus!(editorView, event);
          pluginState.insertColumn(0);
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr( tdCursor, tdEmpty ))));
        });
      });

      context('when it called with 1', () => {
        it('it should append a new column and move cursor inside it\'s first cell', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor))));
          plugin.props.onFocus!(editorView, event);
          pluginState.insertColumn(1);
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr( tdEmpty, tdCursor ))));
        });
      });
    });

    context('when table has 2 columns', () => {
      context('when it called with 1', () => {
        it('it should insert a new column in the middle and move cursor inside it\'s first cell', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty))));
          plugin.props.onFocus!(editorView, event);
          pluginState.insertColumn(1);
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr( tdEmpty, tdCursor, tdEmpty ))));
        });
      });
    });
  });

  describe('insertRow(number)', () => {
    context('when table has 1 row', () => {
      context('when it called with 0', () => {
        it('it should prepend a new row and move cursor inside it\'s first cell', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor))));
          plugin.props.onFocus!(editorView, event);
          pluginState.insertRow(0);
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdCursor), tr(tdEmpty))));
        });
      });

      context('when it called with 1', () => {
        it('it should append a new row and move cursor inside it\'s first cell', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor))));
          plugin.props.onFocus!(editorView, event);
          pluginState.insertRow(1);
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdEmpty), tr(tdCursor))));
        });
      });
    });

    context('when table has 2 row', () => {
      context('when it called with 1', () => {
        it('it should insert a new row in the middle and move cursor inside it\'s first cell', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty))));
          plugin.props.onFocus!(editorView, event);
          pluginState.insertRow(1);
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdEmpty), tr(tdCursor), tr(tdEmpty))));
        });
      });
    });
  });

  describe('selectColumn(number)', () => {
    context('when table has 3 columns', () => {
      [0, 1, 2].forEach(column => {
        context(`when called with ${column}`, () => {
          it(`it should select ${column} column`, () => {
            const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
            plugin.props.onFocus!(editorView, event);
            pluginState.selectColumn(column);
            const selection = editorView.state.selection as CellSelection;
            const map = TableMap.get(pluginState.tableNode);
            const start = selection.$anchorCell.start(-1);
            const anchor = map.colCount(selection.$anchorCell.pos - start);
            const head = map.colCount(selection.$headCell.pos - start);
            expect(anchor).to.equal(column);
            expect(head).to.equal(column);
            expect(selection.isRowSelection()).to.equal(true);
          });
        });
      });
    });
  });

  describe('selectRow(number)', () => {
    context('when table has 3 rows', () => {
      [0, 1, 2].forEach(row => {
        context(`when called with ${row}`, () => {
          it(`it should select ${row} row`, () => {
            const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))));
            plugin.props.onFocus!(editorView, event);
            pluginState.selectRow(row);
            const selection = editorView.state.selection as CellSelection;
            const anchor = selection.$anchorCell.index(-1);
            const head = selection.$headCell.index(-1);
            expect(anchor).to.equal(row);
            expect(head).to.equal(row);
            expect(selection.isColSelection()).to.equal(true);
          });
        });
      });
    });
  });

  describe('selectTable()', () => {
    it('it should select the whole table', () => {
      const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))));
      plugin.props.onFocus!(editorView, event);
      pluginState.selectTable();
      const selection = editorView.state.selection as CellSelection;
      expect(selection.isRowSelection()).to.equal(true);
      expect(selection.isColSelection()).to.equal(true);
    });
  });

  describe('isColumnSelected(number)', () => {
    context('when table has 3 columns', () => {
      [0, 1, 2].forEach(column => {
        context(`when column ${column} is selected`, () => {
          context(`when called with ${column}`, () => {
            it(`it should return true`, () => {
              const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
              plugin.props.onFocus!(editorView, event);
              pluginState.selectColumn(column);
              expect(pluginState.isColumnSelected(column)).to.equal(true);
            });
          });
        });
      });
    });
  });

  describe('isRowSelected(number)', () => {
    context('when table has 3 rows', () => {
      [0, 1, 2].forEach(row => {
        context(`when row ${row} is selected`, () => {
          context(`when called with ${row}`, () => {
            it(`it should return true`, () => {
              const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))));
              plugin.props.onFocus!(editorView, event);
              pluginState.selectRow(row);
              expect(pluginState.isRowSelected(row)).to.equal(true);
            });
          });
        });
      });
    });
  });

  describe('remove()', () => {
    context('when table has 3 columns', () => {
      context('when the first column is selected', () => {
        it('it should remove the first column and move cursor to the first cell of the first column', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
          plugin.props.onFocus!(editorView, event);
          pluginState.selectColumn(0);
          pluginState.remove();
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdCursor, tdEmpty))));
        });
      });

      context('when the middle column is selected', () => {
        it('it should remove the middle column and move cursor to the first cell of the first column', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
          plugin.props.onFocus!(editorView, event);
          pluginState.selectColumn(1);
          pluginState.remove();
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdCursor, tdEmpty))));
        });
      });

      context('when the last column is selected', () => {
        it('it should remove the middle column and move cursor to the first cell of the first column', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor, tdEmpty, tdEmpty))));
          plugin.props.onFocus!(editorView, event);
          pluginState.selectColumn(2);
          pluginState.remove();
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdCursor, tdEmpty))));
        });
      });
    });

    context('when table has 3 rows', () => {
      context('when the first row is selected', () => {
        it('it should remove the first row and move cursor to the first cell of the first row', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))));
          plugin.props.onFocus!(editorView, event);
          pluginState.selectRow(0);
          pluginState.remove();
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdCursor), tr(tdEmpty))));
        });
      });

      context('when the middle row is selected', () => {
        it('it should remove the middle row and move cursor to the first cell of the first row', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))));
          plugin.props.onFocus!(editorView, event);
          pluginState.selectRow(1);
          pluginState.remove();
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdCursor), tr(tdEmpty))));
        });
      });

      context('when the last row is selected', () => {
        it('it should remove the middle row and move cursor to the first cell of the first row', () => {
          const { plugin, pluginState, editorView } = editor(doc(p('text'), table(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))));
          plugin.props.onFocus!(editorView, event);
          pluginState.selectRow(2);
          pluginState.remove();
          expect(editorView.state.doc).to.deep.equal(doc(p('text'), table(tr(tdCursor), tr(tdEmpty))));
        });
      });
    });
  });

});
