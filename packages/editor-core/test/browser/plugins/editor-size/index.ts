import { expect } from 'chai';
import editorSizePlugins from '../../../../src/plugins/editor-size';
import { doc, p, makeEditor, fixtures, sendKeyToPm } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core ui/EditorSizePlugin', () => {

  describe('plugin', () => {
    const fixture = fixtures();
    const editor = (doc: any) => makeEditor({
      doc,
      plugins: editorSizePlugins(defaultSchema, '50px'),
      place: fixture()
    });
    it('should set height and scroll proeprties of editor dom tag as height grows beyond maxheight', () => {
      const { editorView } = editor(doc(p('{<>}')));
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      expect(editorView.dom.style.height).to.equal('50px');
      expect(editorView.dom.style.overflow).to.equal('scroll');
    });

    it('should set height and scroll proeprties of editor dom tag if maxHeight property value is not valid', () => {
      const fixture = fixtures();
      const editor = (doc: any) => makeEditor({
        doc,
        plugins: editorSizePlugins(defaultSchema, '50xp'),
        place: fixture()
      });
      const { editorView } = editor(doc(p('{<>}')));
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      sendKeyToPm(editorView, 'Enter');
      expect(editorView.dom.style.height).to.equal(undefined);
    });
  });

});
