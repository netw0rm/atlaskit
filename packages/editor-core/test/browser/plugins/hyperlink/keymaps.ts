import * as chai from 'chai';
import { expect } from 'chai';
import HyperlinkPlugin from '../../../../src/plugins/hyperlink';
import {
  chaiPlugin, fixtures, makeEditor, doc, p, a as link, sendKeyToPm
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('hyperink - keymaps', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: HyperlinkPlugin(defaultSchema),
    place: fixture()
  });

  describe('Enter keypress', () => {
    context('when possible link text is at the end', () => {
      context('when it does not contain a link', () => {
        it('converts possible link text to hyperlink', () => {
          const { editorView } = editor(doc(p('hello www.atlassian.com{<>}')));

          sendKeyToPm(editorView, 'Enter');

          const a = link({ href: 'http://www.atlassian.com' })('www.atlassian.com');
          expect(editorView.state.doc).to.deep.equal(doc(p('hello ', a), p()));
        });
      });

      context('when it does not contain a link', () => {
        it('converts possible link text to hyperlink', () => {
          const a = link({ href: 'http://www.google.com' })('www.atlassian.com{<>}');
          const { editorView } = editor(doc(p('hello ', a)));

          sendKeyToPm(editorView, 'Enter');

          expect(editorView.state.doc).to.deep.equal(doc(p('hello ', a), p()));
        });
      });
    });

    context('when there is no possible link text at the end', () => {
      it('does not create new link', () => {
        const { editorView } = editor(doc(p('hello world{<>}')));

        sendKeyToPm(editorView, 'Enter');

        expect(editorView.state.doc).to.deep.equal(doc(p('hello world{<>}'), p()));
      });
    });
  });

  describe('Shift-Enter keypress', () => {
    it('converts possible link text to hyperlink', () => {
      const { editorView } = editor(doc(p('hello www.atlassian.com{<>}')));

      sendKeyToPm(editorView, 'Shift-Enter');

      const a = link({ href: 'http://www.atlassian.com' })('www.atlassian.com');
      expect(editorView.state.doc).to.deep.equal(doc(p('hello ', a)));
    });
  });
});
