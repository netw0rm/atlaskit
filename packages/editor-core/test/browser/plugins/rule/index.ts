import * as chai from 'chai';
import { expect } from 'chai';

import { browser } from '../../../../src/prosemirror';
import rulePlugins from '../../../../src/plugins/rule';
import {
  chaiPlugin, doc, fixtures, hr, makeEditor, p, sendKeyToPm
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('rule', () => {
  const fixture = fixtures();
  const editor = (doc: any) => {
    const ed = makeEditor({
      doc,
      plugins: rulePlugins(defaultSchema),
      place: fixture()
    });

    afterEach(() => {
      ed.editorView.destroy();
    });

    return ed;
  };

  describe('keymap', () => {
    if (browser.mac) {
      context('when hits Shift-Cmd--', () => {
        it('calls splitCodeBlock', () => {
          const { editorView } = editor(doc(p('text{<>}')));

          sendKeyToPm(editorView, 'Shift-Cmd--');

          expect(editorView.state.doc).to.deep.equal(doc(p('text'), hr));
        });
      });
      context('when hits Escape', () => {
        it('selection should not change', () => {
          const { editorView } = editor(doc(p('te{<>}xt')));
          const selectionFrom = editorView.state.selection.from;
          sendKeyToPm(editorView, 'Escape');
          const newSelectionFrom = editorView.state.selection.from;
          expect(selectionFrom).to.equal(newSelectionFrom);
        });
      });
    } else {
      context('when hits Shift-Ctrl--', () => {
        it('calls splitCodeBlock', () => {
          const { editorView } = editor(doc(p('text{<>}')));

          sendKeyToPm(editorView, 'Shift-Ctrl--');

          expect(editorView.state.doc).to.deep.equal(doc(p('text'), hr));
        });
      });
    }
  });
});
