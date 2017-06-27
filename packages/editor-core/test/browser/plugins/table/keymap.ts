import * as chai from 'chai';
import { expect } from 'chai';
import tablePlugin from '../../../../src/plugins/table';

import {
  chaiPlugin, doc, fixtures, makeEditor, sendKeyToPm, table, tr, tdEmpty, tdCursor
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
        const { editorView } = editor(
          doc(table(
            tr( /*4*/ tdCursor, /*8*/  tdEmpty, /*12*/ tdEmpty ),
            tr(/*18*/ tdEmpty, /*22*/ tdEmpty, /*26*/ tdEmpty ),
            tr(/*32*/ tdEmpty, /*36*/ tdEmpty, /*40*/ tdEmpty )
          ))
        );
        expect(editorView.state.selection.$from.pos).to.equal(4);
        sendKeyToPm(editorView, 'Tab');
        expect(editorView.state.selection.$from.pos).to.equal(8);
      });
    });

    context('when the cursor is at the last cell of the first row', () => {
      it('it should select first cell of the next row', () => {
        const { editorView } = editor(
          doc(table(
            tr( /*4*/ tdEmpty, /*8*/  tdEmpty, /*12*/ tdCursor ),
            tr(/*18*/ tdEmpty, /*22*/ tdEmpty, /*26*/ tdEmpty ),
            tr(/*32*/ tdEmpty, /*36*/ tdEmpty, /*40*/ tdEmpty )
          ))
        );
        expect(editorView.state.selection.$from.pos).to.equal(12);
        sendKeyToPm(editorView, 'Tab');
        expect(editorView.state.selection.$from.pos).to.equal(18);
      });
    });
  });

 describe('Shift-Tab keypress', () => {
    context('when the cursor is at the last cell of the first row', () => {
      it('it should select previous cell of the current row', () => {
        const { editorView } = editor(
          doc(table(
            tr( /*4*/ tdEmpty, /*8*/  tdEmpty, /*12*/ tdCursor ),
            tr(/*18*/ tdEmpty, /*22*/ tdEmpty, /*26*/ tdEmpty ),
            tr(/*32*/ tdEmpty, /*36*/ tdEmpty, /*40*/ tdEmpty )
          ))
        );
        expect(editorView.state.selection.$from.pos).to.equal(12);

        sendKeyToPm(editorView, 'Shift-Tab');
        expect(editorView.state.selection.$from.pos).to.equal(8);
      });
    });

    context('when the cursor is at the first cell of the second row', () => {
      it('it should select the last cell of the first row', () => {
        const { editorView } = editor(
          doc(table(
            tr( /*4*/ tdEmpty, /*8*/  tdEmpty, /*12*/ tdEmpty ),
            tr(/*18*/ tdCursor, /*22*/ tdEmpty, /*26*/ tdEmpty ),
            tr(/*32*/ tdEmpty, /*36*/ tdEmpty, /*40*/ tdEmpty )
          ))
        );
        expect(editorView.state.selection.$from.pos).to.equal(18);
        sendKeyToPm(editorView, 'Shift-Tab');
        expect(editorView.state.selection.$from.pos).to.equal(12);
      });
    });
  });
});
