import * as chai from 'chai';
import { expect } from 'chai';
import tablePlugin from '../../../../src/plugins/table';

import {
  chaiPlugin, doc, fixtures, makeEditor, sendKeyToPm, table, tr, td, tdEmpty, tdCursor, thEmpty, p
} from '../../../../src/test-helper';

chai.use(chaiPlugin);
const fixture = fixtures();

describe('table keymap', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: tablePlugin(),
    place: fixture()
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

    context('Cmd-Ctrl-t keypress', () => {
      it('it should insert 3x3 table', () => {
        const tableNode = table(
          tr(thEmpty, thEmpty, thEmpty ),
          tr(tdEmpty, tdEmpty, tdEmpty ),
          tr(tdEmpty, tdEmpty, tdEmpty )
        );
        const { editorView } = editor(doc(p('{<>}')));
        sendKeyToPm(editorView, 'Mod-Ctrl-t');
        expect(editorView.state.doc).to.deep.equal(doc(tableNode));
      });
    });
  });
});
