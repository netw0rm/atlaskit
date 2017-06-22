import * as chai from 'chai';
import { expect } from 'chai';
import tablePlugin from '../../../../src/plugins/table';

import {
  chaiPlugin, doc, fixtures, makeEditor, sendKeyToPm, table, tr, cEmpty, cCursor
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
            tr( /*4*/ cCursor, /*8*/  cEmpty, /*12*/ cEmpty ),
            tr(/*18*/ cEmpty, /*22*/ cEmpty, /*26*/ cEmpty ),
            tr(/*32*/ cEmpty, /*36*/ cEmpty, /*40*/ cEmpty )
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
            tr( /*4*/ cEmpty, /*8*/  cEmpty, /*12*/ cCursor ),
            tr(/*18*/ cEmpty, /*22*/ cEmpty, /*26*/ cEmpty ),
            tr(/*32*/ cEmpty, /*36*/ cEmpty, /*40*/ cEmpty )
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
            tr( /*4*/ cEmpty, /*8*/  cEmpty, /*12*/ cCursor ),
            tr(/*18*/ cEmpty, /*22*/ cEmpty, /*26*/ cEmpty ),
            tr(/*32*/ cEmpty, /*36*/ cEmpty, /*40*/ cEmpty )
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
            tr( /*4*/ cEmpty, /*8*/  cEmpty, /*12*/ cEmpty ),
            tr(/*18*/ cCursor, /*22*/ cEmpty, /*26*/ cEmpty ),
            tr(/*32*/ cEmpty, /*36*/ cEmpty, /*40*/ cEmpty )
          ))
        );
        expect(editorView.state.selection.$from.pos).to.equal(18);
        sendKeyToPm(editorView, 'Shift-Tab');
        expect(editorView.state.selection.$from.pos).to.equal(12);
      });
    });
  });
});
