import * as chai from 'chai';
import { expect } from 'chai';

import pastePlugins from '../../../../src/plugins/code-block';
import { browser } from '../../../../src/prosemirror';
import { chaiPlugin, code_block, doc, p, makeEditor, dispatchPasteEvent, isMobileBrowser } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

if(!browser.ie && !isMobileBrowser()) {
  describe('code-block', () => {
    const editor = (doc: any) => makeEditor<any>({
      doc,
      plugins: pastePlugins(defaultSchema),
    });

    describe('handlePaste', () => {
      it('should not create paragraph when plain text is copied in code-block', () => {
        const { editorView } = editor(doc(code_block()('{<>}')));
        dispatchPasteEvent(editorView, { plain: 'plain text' });
        expect(editorView.state.doc).to.deep.equal(doc(code_block()('plain text')));
      });

      it('should create paragraph when plain text is not copied in code-block', () => {
        const { editorView } = editor(doc(p('{<>}')));
        dispatchPasteEvent(editorView, { plain: 'plain text' });
        expect(editorView.state.doc).to.deep.equal(doc(p('plain text')));
      });
    });
  });
}
