import * as chai from 'chai';
import { expect } from 'chai';
import tablePlugins, { TableState } from '../../../../src/plugins/table';
import { TableMap, browser } from '../../../../src/prosemirror';

import {
  chaiPlugin, doc, makeEditor, sendKeyToPm, table, tr, td, tdEmpty, tdCursor, th, thEmpty, p
} from '../../../../src/test-helper';

chai.use(chaiPlugin);

describe('table keymap', () => {
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

    context('Shift-Alt-i keypress', () => {
      it('it should insert 3x3 table', () => {
        const tableNode = table(
          tr(thEmpty, thEmpty, thEmpty ),
          tr(tdEmpty, tdEmpty, tdEmpty ),
          tr(tdEmpty, tdEmpty, tdEmpty )
        );
        const { editorView } = editor(doc(p('{<>}')));
        sendKeyToPm(editorView, 'Shift-Alt-i');
        expect(editorView.state.doc).to.deep.equal(doc(tableNode));
      });
    });
  });

  describe('Ctrl-Alt-ArrowDown keypress', () => {
    const shortcut = browser.mac ? 'Ctrl-Alt-ArrowDown' : 'Shift-Alt-ArrowDown';

    context('when the cursor is in the last row', () => {
      it('it should append a new empty row', () => {
        const { editorView } = editor(doc(
          table(
            tr(td({})(p('1')), td({})(p('2')), td({})(p('3')) ),
            tr(td({})(p('4')), td({})(p('5{<>}')), td({})(p('6')) )
          )
        ));
        sendKeyToPm(editorView, shortcut);
        expect(editorView.state.doc).to.deep.equal(doc(
          table(
            tr(td({})(p('1')), td({})(p('2')), td({})(p('3')) ),
            tr(td({})(p('4')), td({})(p('5')), td({})(p('6')) ),
            tr(tdEmpty, tdEmpty, tdEmpty )
          )
        ));
      });
    });

    context('when the cursor is in the first row', () => {
      it('it should create a new second row', () => {
        const { editorView } = editor(doc(
          table(
            tr(td({})(p('1')), td({})(p('2{<>}')), td({})(p('3')) ),
            tr(td({})(p('4')), td({})(p('5')), td({})(p('6')) )
          )
        ));
        sendKeyToPm(editorView, shortcut);
        expect(editorView.state.doc).to.deep.equal(doc(
          table(
            tr(td({})(p('1')), td({})(p('2')), td({})(p('3')) ),
            tr(tdEmpty, tdEmpty, tdEmpty ),
            tr(td({})(p('4')), td({})(p('5')), td({})(p('6')) )
          )
        ));
      });
    });
  });

  describe('Ctrl-Alt-ArrowUp keypress', () => {
    const shortcut = browser.mac ? 'Ctrl-Alt-ArrowUp' : 'Shift-Alt-ArrowUp';

    context('when the cursor is in the last row', () => {
      it('it should create a new row in the middle', () => {
        const { editorView } = editor(doc(
          table(
            tr(td({})(p('1')), td({})(p('2')), td({})(p('3')) ),
            tr(td({})(p('4')), td({})(p('5{<>}')), td({})(p('6')) )
          )
        ));
        sendKeyToPm(editorView, shortcut);
        expect(editorView.state.doc).to.deep.equal(doc(
          table(
            tr(td({})(p('1')), td({})(p('2')), td({})(p('3')) ),
            tr(tdEmpty, tdEmpty, tdEmpty ),
            tr(td({})(p('4')), td({})(p('5')), td({})(p('6')) )
          )
        ));
      });
    });

    context('when the cursor is in the first row', () => {
      it('it should create a new first row', () => {
        const { editorView } = editor(doc(
          table(
            tr(td({})(p('1')), td({})(p('2{<>}')), td({})(p('3')) ),
            tr(td({})(p('4')), td({})(p('5')), td({})(p('6')) )
          )
        ));
        sendKeyToPm(editorView, shortcut);
        expect(editorView.state.doc).to.deep.equal(doc(
          table(
            tr(tdEmpty, tdEmpty, tdEmpty ),
            tr(td({})(p('1')), td({})(p('2')), td({})(p('3')) ),
            tr(td({})(p('4')), td({})(p('5')), td({})(p('6')) )
          )
        ));
      });
    });

    context('when the cursor is in the first row', () => {
      context('when the first row is a header row', () => {
        it('it should not create a new row', () => {
          const { editorView } = editor(doc(
            table(
              tr(th({})(p('1')), th({})(p('2{<>}')), th({})(p('3')) ),
              tr(td({})(p('4')), td({})(p('5')), td({})(p('6')) )
            )
          ));
          sendKeyToPm(editorView, shortcut);
          expect(editorView.state.doc).to.deep.equal(doc(
            table(
              tr(th({})(p('1')), th({})(p('2{<>}')), th({})(p('3')) ),
              tr(td({})(p('4')), td({})(p('5')), td({})(p('6')) )
            )
          ));
        });
      });
    });
  });

});
