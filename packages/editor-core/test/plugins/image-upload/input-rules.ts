import * as chai from 'chai';
import { expect } from 'chai';
import ImageUploadPlugin from '../../../src/plugins/image-upload';
import {
  chaiPlugin, doc, fixtures, insertText, makeEditor, p, img
} from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('inputrules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: ImageUploadPlugin,
    place: fixture()
  });

  describe('image rule', () => {
    it('should convert `![text](url)` to image', () => {
      const { editorView, sel} = editor(doc(p('{<>}')));

      insertText(editorView, `![text](url)`, sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(img({ src: 'url', alt: 'text', title: 'text' }))));
    });
  });
});
