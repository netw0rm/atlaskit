import { expect } from 'chai'; import {
  chaiPlugin, doc, insertText, a as link, code_block,
  makeEditor, p as paragraph
} from '../../../../../../src/test-helper';
import { setTextSelection } from '../../../../../../src/utils';
import hyperlinkPlugins, { HyperlinkState } from '../../../../../../src/editor/plugins/hyperlink/pm-plugins';
import {
  addLink, removeLink, updateLink, updateLinkText, showLinkPanel
} from '../../../../../../src/editor/plugins/hyperlink/pm-plugins/commands';
import defaultSchema from '../../../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('hyperlink/pm-plugins/commands', () => {
  const editor = (doc: any) => makeEditor<HyperlinkState>({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
  });

  describe('addLink', () => {
    it('permits adding a link to an empty selection using the href', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
      const href = 'http://www.atlassian.com';

      addLink({ href }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href })(href))));
    });

    it('permits adding a link to an empty selection using the href and text', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
      const href = 'http://www.atlassian.com';
      const text = 'Atlassian';

      addLink({ href, text }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href })(text))));
    });

    it('should add http:// for a link without protocol', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
      const href = 'www.atlassian.com';
      const hrefWithProtocol = 'http://' + href;

      addLink({ href }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: hrefWithProtocol })(href))));
    });

    it('should add mailto: for a link if it is an email', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
      const href = 'test@atlassian.com';
      const hrefWithProtocol = 'mailto:' + href;

      addLink({ href }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: hrefWithProtocol })(href))));
    });

    it('does not permit adding a link to an existing link', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('{<}link{>}'))));

      addLink({ href: 'http://www.example.com' }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('link'))));
    });

    it('does not permit adding a link when not supported by the schema', () => {
      const { editorView, pluginState } = editor(doc(code_block()('{<}text{>}')));

      addLink({ href: 'http://www.atlassian.com' }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('text')));
    });

    it('requires href when adding a link', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<}text{>}')));

      addLink({ href: 'http://example.com' }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.com' })('text'))));
    });

    it('should not be a part of the link when typing before it', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph('a{before}{<}text{>}')));
      const { before } = refs;
      const href = 'http://example.com';

      addLink({ href }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);
      insertText(editorView, 'bar', before);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(`abar`, link({ href })('text'))));
    });

    it('should be a part of the link when typing in it', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph('{<}te{middle}xt{>}')));
      const { middle } = refs;
      const href = 'http://example.com';

      addLink({ href }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);
      insertText(editorView, 'bar', middle);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href })('tebarxt'))));
    });

    it('should create a link if href is invalid', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
      const href = 'pig';

      addLink({ href }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href })(href))));
    });

    it('should not be a part of the link when typing after it', () => {
      const { refs, editorView, pluginState } = editor(doc(paragraph('{<}text{>}{end}')));
      const { end } = refs;
      const href = 'http://example.com';

      addLink({ href }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);
      insertText(editorView, 'bar', end);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href })('text'), 'bar')));
    });

    it('should allow links to be added when the selection is empty', () => {
      const { pluginState } = editor(doc(paragraph('{<>}text')));

      expect(pluginState.linkable).to.equal(true);
    });

    it('should add link in the correct position', () => {
      const { editorView, pluginState } = editor(doc(paragraph('text'), paragraph('{<}text{>}')));
      const href = 'http://example.com';

      addLink({ href }, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('text'), paragraph(link({ href })('text'))));
    });
  });

  describe('removeLink', () => {
    it('should not be able to unlink a node that has no link', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<}text{>}')));

      removeLink(editorView, pluginState.activeLinkStartPos, pluginState.text, pluginState.activeLinkMark)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('text')));
    });

    it('should be able to unlink an existing link', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      removeLink(editorView, pluginState.activeLinkStartPos, pluginState.text, pluginState.activeLinkMark)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('text')));
    });

    it('should be able to unlink an existing link', () => {
      const { editorView, pluginState } = editor(doc(paragraph('hello ', link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      removeLink(editorView, pluginState.activeLinkStartPos, pluginState.text, pluginState.activeLinkMark)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('hello text')));
    });

    context('when a link is in the second paragraph', () => {
      it('should be able to unlink that link', () => {
        const { editorView, pluginState } = editor(doc(paragraph('hello'), paragraph(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

        removeLink(editorView, pluginState.activeLinkStartPos, pluginState.text, pluginState.activeLinkMark)(editorView.state, editorView.dispatch);

        expect(editorView.state.doc).to.deep.equal(doc(paragraph('hello'), paragraph('text')));
      });
    });
  });

  describe('updateLink', () => {
    it('should be able to update existing links with href', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      updateLink({ href: 'http://example.com' }, pluginState.activeLinkStartPos, pluginState.text, pluginState.activeLinkMark)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.com' })('text'))));
    });

    it('should allow updating a link if new href is empty', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://example.com' })('{<}text{>}'))));

      updateLink({ href: '' }, pluginState.activeLinkStartPos, pluginState.text, pluginState.activeLinkMark)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: '' })('text'))));
    });

    it('should not be able to update when not in a link', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<}text{>}')));

      updateLink({ href: 'http://example.com/foo' }, pluginState.activeLinkStartPos, pluginState.text, pluginState.activeLinkMark)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('text')));
    });
  });

  describe('updateLinkText', () => {
    it('should be able to update existing links text', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('www.atlas{<>}sian.com'))));

      updateLinkText(editorView, 'Atlassian', pluginState.activeLinkStartPos, pluginState.text, pluginState.activeLinkMark)(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('Atlassian'))));
    });
  });

  describe('showLinkPanel', () => {
    context('when called without any selection in the editor', () => {
      it('should set state value showToolbarPanel to true', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));
        showLinkPanel(pluginState.showToolbarPanel, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);
        expect(pluginState.showToolbarPanel).to.equal(true);
      });
    });

    context('when called with a selection in the editor', () => {
      it('should create a link node', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));

        setTextSelection(editorView, 4, 7);
        showLinkPanel(pluginState.showToolbarPanel, pluginState.linkable, pluginState.active)(editorView.state, editorView.dispatch);

        expect(editorView.state.doc).to.deep.equal(doc(paragraph('tes', link({ href: '' })('tin'), 'g')));
      });
    });
  });
});
