import { expect } from 'chai'; import {
  chaiPlugin, doc, a as link,
  makeEditor, p as paragraph,
} from '../../../../../src/test-helper';
import defaultSchema from '../../../../../src/test-helper/schema';
import { setTextSelection } from '../../../../../src/utils';
import hyperlinkPlugins, { HyperlinkState } from '../../../../../src/editor/plugins/hyperlink/pm-plugins';
import { getDomElement } from '../../../../../src/editor/plugins/hyperlink/pm-plugins/utils';

chai.use(chaiPlugin);

describe('hyperlink/pm-plugins/commands', () => {
  const editor = (doc: any) => makeEditor<HyperlinkState>({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
  });

  describe('element', () => {
    context('when select the whole hyperlink text from start to end', () => {
      it('returns link element', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

        expect(element!.tagName).to.eq('A');
      });
    });

    context('when select the whole hyperlink text from end to start', () => {
      it('returns link element', () => {
        const { editorView, pluginState, refs } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos2, pos1);

        const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

        expect(element!.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text from the end', () => {
      it('returns link element', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos2, pos1);

        const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

        expect(element!.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text from the start', () => {
      it('returns link element', () => {
        const { editorView, pluginState, refs } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}t{pos2}ext'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

        expect(element!.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text in the middle', () => {
      it('returns link element', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ex{pos2}t'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

        expect(element!.tagName).to.eq('A');
      });
    });

    context('when cursor is winthin hyperlink text', () => {
      it('returns undefined', () => {
        const { editorView, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('tex{<>}t'), 'after')));

        const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

        expect(element!.tagName).to.eq('A');
      });
    });

    context('when cursor at the beginning of hyperlink text', () => {
      it('returns undefined', () => {
        const { editorView, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{<>}text'), 'after')));

        const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

        expect(element).to.equal(undefined);
      });
    });

    context('when cursor at the end of hyperlink text', () => {
      it('returns undefined', () => {
        const { editorView, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('text{<>}'), 'after')));

        const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

        expect(element).to.equal(undefined);
      });
    });

    it('should return referring DOM element', () => {
      const { editorView, pluginState } = editor(doc(
        paragraph(link({ href: 'http://www.atlassian.com' })('atlassian')),
        paragraph(link({ href: 'http://www.stypositive.ru' })('d{<>}sorin')))
      );

      const element = getDomElement(editorView.docView, pluginState.activeLinkStartPos);

      expect(element!.textContent).to.eq('dsorin');
    });
  });
});
