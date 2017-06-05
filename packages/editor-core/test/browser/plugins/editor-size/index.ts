import { expect } from 'chai';
import editorSizePlugins from '../../../../src/plugins/editor-size';
import { doc, p, makeEditor, fixtures, sendKeyToPm } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core ui/EditorSizePlugin', () => {

  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: editorSizePlugins(defaultSchema, 75),
    place: fixture()
  });

  describe('plugin', () => {
    it('should set maxHeight and scroll properties of editor dom tag', () => {
      const { editorView } = editor(doc(p('{<>}')));
      expect(editorView.dom.style.maxHeight).to.equal('75px');
      expect(editorView.dom.style.overflow).to.equal('auto');
    });

    it('should set borderBottom property of editor dom tag as height grows beyond maxheight', () => {
      const { editorView } = editor(doc(p('{<>}')));
      editorView.focus();
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      expect(!editorView.dom.style.borderBottom).to.equal(false);
    });
  });

});
