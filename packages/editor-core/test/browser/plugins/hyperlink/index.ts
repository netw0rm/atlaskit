import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import hyperlinkPlugins, { HyperlinkState } from '../../../../src/editor/plugins/hyperlink/pm-plugins';
import {
  chaiPlugin, createEvent, doc, insert, insertText, a as link, code_block,
  makeEditor, p as paragraph, sendKeyToPm, dispatchPasteEvent
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { setTextSelection } from '../../../../src/utils';
import { analyticsService } from '../../../../src/analytics';

chai.use(chaiPlugin);

describe('hyperlink', () => {
  const editor = (doc: any) => makeEditor<HyperlinkState>({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
  });

  const event = createEvent('event');

  describe('active', () => {
    context('when select the whole hyperlink text from start to end', () => {
      it('is active', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when select the whole hyperlink text from end to start', () => {
      it('is active', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos2, pos1);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when select part of the hyperlink text from the end', () => {
      it('is active', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos2, pos1);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when select part of the hyperlink text from the start', () => {
      it('is active', () => {
        const { editorView, pluginState, refs } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}t{pos2}ext'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when select part of the hyperlink text in the middle', () => {
      it('is active', () => {
        const { editorView, pluginState, refs } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ex{pos2}t'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when cursor is winthin hyperlink text', () => {
      it('is active', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('tex{<>}t'), 'after')));

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when cursor at the beginning of hyperlink text', () => {
      it('returns undefined', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{<>}text'), 'after')));

        expect(pluginState.active).to.equal(false);
      });
    });

    context('when cursor at the end of hyperlink text', () => {
      it('returns undefined', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('text{<>}'), 'after')));

        expect(pluginState.active).to.equal(false);
      });
    });
  });

  describe('API', () => {
    it('should allow a change handler to be registered', () => {
      const { pluginState } = editor(doc(paragraph('')));

      pluginState.subscribe(sinon.spy());
    });

    it('should get current state immediately once subscribed', () => {
      const { pluginState } = editor(doc(paragraph('{<}text{>}')));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      expect(spy.callCount).to.equal(1);
    });

    it('should be able to register handlers for state change events', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{pos}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      setTextSelection(editorView, refs['pos']);

      expect(spy.callCount).to.equal(2);
    });

    it('sets linkable to false when in a context where links are not supported by the schema', () => {
      const { pluginState } = editor(doc(code_block()('{<}text{>}')));

      expect(pluginState.linkable).to.equal(false);
    });

    it('sets active to true when link is already in place', () => {
      const { pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      expect(pluginState.active).to.equal(true);
    });

    it('does not emit `change` multiple times when the selection moves within a link', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph('{<>}text', link({ href: 'http://www.atlassian.com' })('l{pos1}i{pos2}nk'))));
      const spy = sinon.spy();
      const { pos1, pos2 } = refs;
      pluginState.subscribe(spy);

      setTextSelection(editorView, pos1);
      setTextSelection(editorView, pos2);

      expect(spy.callCount).to.equal(2);
    });

    it('emits change when the selection leaves a link', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph('te{textPos}xt {<>}')));
      const { textPos } = refs;
      const spy = sinon.spy();
      const { linkPos } = insert(editorView, link({ href: 'http://www.atlassian.com' })('li{linkPos}nk'));
      setTextSelection(editorView, linkPos);

      pluginState.subscribe(spy);
      setTextSelection(editorView, textPos);

      expect(spy.callCount).to.equal(2);
    });

    it('should escape from link mark when typing at the beginning of the link', () => {
      const { editorView } = editor(doc(paragraph(link({ href: 'http://example.com' })('text'))));

      insertText(editorView, '1', 1, 1);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('1', link({ href: 'http://example.com' })('text'))));
    });

    it('should not escape from link mark when typing at the middle of the link', () => {
      const { editorView } = editor(doc(paragraph(link({ href: 'http://example.com' })('text'))));

      insertText(editorView, '1', 2, 2);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.com' })('t1ext'))));
    });


    it('should call subscribers when link is clicked', () => {
      const { editorView, plugin, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
      const spy = sinon.spy();

      pluginState.subscribe(spy);
      plugin.props.handleClick!(editorView, 2, createEvent('event'));

      expect(spy.callCount).to.equal(2);
    });

    it('should call subscribers when link was focused and then editor is blur', () => {
      const { editorView, plugin, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
      const spy = sinon.spy();

      pluginState.subscribe(spy);
      plugin.props.onBlur!(editorView, event);

      expect(spy.callCount).to.equal(2);
    });

    it('should not call subscribers if link was not focused when editor is blur', () => {
      const { editorView, plugin, pluginState } = editor(doc(paragraph('te{<>}st'), paragraph(link({ href: 'http://www.atlassian.com' })('text'))));
      const spy = sinon.spy();

      pluginState.subscribe(spy);
      plugin.props.onBlur!(editorView, event);

      expect(spy.callCount).to.equal(1);
    });

    it('should not call subscribers if editor is focused but link is not focused', () => {
      const { editorView, plugin, pluginState } = editor(doc(paragraph('te{<>}st'), paragraph(link({ href: 'http://www.atlassian.com' })('text'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      plugin.props.onBlur!(editorView, event);
      plugin.props.onFocus!(editorView, event);

      expect(spy.callCount).to.equal(1);
    });

    context('should update both href and text on edit if they were same before edit', () => {
      it('inserts a character inside a link', () => {
        const { editorView, sel } = editor(doc(paragraph(link({ href: 'http://example.co' })('http://example.c{<>}o'))));
        insertText(editorView, 'x', sel);

        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.cxo' })('http://example.cxo'))));
      });

      it('inserts a character at the end of a link', () => {
        const { editorView, sel } = editor(doc(paragraph(link({ href: 'http://example.com' })('http://example.com{<>}'))));
        insertText(editorView, 'x', sel);

        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.com' })('http://example.com'), 'x')));
      });

      it('inserts a character at the beginning of a link', () => {
        const { editorView, sel } = editor(doc(paragraph(link({ href: 'http://example.com' })('{<>}http://example.com'))));
        insertText(editorView, 'x', sel);

        expect(editorView.state.doc).to.deep.equal(doc(paragraph('x', link({ href: 'http://example.com' })('http://example.com'))));
      });

      // Sending Backspace with a empty selection doesn't work
      it.skip('removes a character from the end of a link', () => {
        const { editorView } = editor(doc(paragraph(link({ href: 'http://example.com' })('http://example.com{<>}'))));
        sendKeyToPm(editorView, 'Backspace');

        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.co' })('http://example.co'))));
      });

      it('replaces a character inside a link', () => {
        const { editorView } = editor(doc(paragraph(link({ href: 'http://example.com' })('http://exampl{<}e{>}.com'))));
        sendKeyToPm(editorView, 'Backspace');
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://exampl.com' })('http://exampl.com'))));
      });

      it('replaces end of the link with extended content', () => {
        const { editorView } = editor(doc(paragraph(link({ href: 'http://example.com' })('http://example.co{<}m{>}'))));
        insert(editorView, [' Atlassian']);

        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.co' })('http://example.co'), ' Atlassian')));
      });

      it('works with valid URLs without scheme', () => {
        const { editorView } = editor(doc(paragraph(link({ href: 'http://www.example.com' })('www.exampl{<}e{>}.com'))));
        sendKeyToPm(editorView, 'Backspace');

        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.exampl.com' })('www.exampl.com'))));
      });
    });
  });

  describe('editorFocused', () => {
    context('when editor is focused', () => {
      it('it is true', () => {
        const { editorView, plugin, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));

        plugin.props.onBlur!(editorView, event);
        plugin.props.onFocus!(editorView, event);

        expect(pluginState.editorFocused).to.equal(true);
      });
    });

    context('when editor is blur', () => {
      it('it is false', () => {
        const { editorView, plugin, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));

        plugin.props.onBlur!(editorView, event);

        expect(pluginState.editorFocused).not.to.equal(true);
      });
    });
  });

  describe('showLinkPanel', () => {
    context('when called without any selection in the editor', () => {
      it('should set state value showToolbarPanel to true', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));
        pluginState.showLinkPanel(editorView, );
        expect(pluginState.showToolbarPanel).to.equal(true);
      });
    });

    context('when called without any selection in the editor', () => {
      it('should call subscribers', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));
        const spy = sinon.spy();
        pluginState.subscribe(spy);
        pluginState.showLinkPanel(editorView);
        expect(spy.callCount).to.equal(2);
      });
    });

    context('when called with cursor in a link', () => {
      it('should not call subscribers', () => {
        const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        pluginState.showLinkPanel(editorView);
        expect(spy.callCount).to.equal(1);
      });
    });

    context('when called with a selection in the editor', () => {
      it('should create a link node', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));

        setTextSelection(editorView, 4, 7);
        pluginState.showLinkPanel(editorView);

        expect(pluginState.activeLinkNode).not.to.equal(undefined);
        expect(pluginState.text).not.to.equal(undefined);
      });
    });
  });

  describe('Key Press Cmd-K', () => {
    context('when called without any selection in the editor', () => {
      it('should call subscribers', () => {
        const trackEvent = sinon.spy();
        analyticsService.trackEvent = trackEvent;
        const { editorView, pluginState } = editor(doc(paragraph('testing')));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        sendKeyToPm(editorView, 'Mod-k');

        expect(spy.callCount).to.equal(2);
        expect(trackEvent.calledWith('atlassian.editor.format.hyperlink.keyboard')).to.equal(true);
      });
    });

    context('when called with selection in the editor', () => {
      it('should call subscribers', () => {
        const { editorView, pluginState } = editor(doc(paragraph('{<}testing{>}')));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        sendKeyToPm(editorView, 'Mod-k');

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when called with a selection in the editor', () => {
      it('should create a link node', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));

        setTextSelection(editorView, 4, 7);
        sendKeyToPm(editorView, 'Mod-k');

        expect(pluginState.activeLinkNode).not.to.equal(undefined);
        expect(pluginState.text).not.to.equal(undefined);
      });
    });
  });

  describe.skip('paste', () => {
    context('url link is at beginning of plain text', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'http://www.atlassian.com test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('http://www.atlassian.com'), ' test')));
      });
    });

    context('a string which is valid email is present in url', () => {
      it('should not create separate mail link for email', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'http://www.atlassian.com/test@atlassian.com' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(
          link({
            href: 'http://www.atlassian.com/test@atlassian.com'
          })('http://www.atlassian.com/test@atlassian.com'),
        )));
      });
    });

    context('a string which is valid url is present in another url', () => {
      it('should not create separate mail link for email', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'http://www.atlassian.com/www.temp.com' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(
          link({
            href: 'http://www.atlassian.com/www.temp.com'
          })('http://www.atlassian.com/www.temp.com'),
        )));
      });
    });

    context('url link has brackets', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'http://www.(atlassian).com test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.(atlassian).com' })('http://www.(atlassian).com'), ' test')));
      });
    });

    context('url link is at end of html text', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: '<a href="http://www.atlassian.com">Atlassian</a> test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('Atlassian'), ' test')));
      });
    });

    context('url link without anchor tags in html', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'http://www.atlassian.com test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('Atlassian'), ' test')));
      });
    });

    context('url link without anchor tags in html in middle of other text', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'testing http://www.atlassian.com test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph('testing ', link({ href: 'http://www.atlassian.com' })('Atlassian'), ' test')));
      });
    });

    context('url link without anchor tags in html without other text', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'http://www.atlassian.com' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('Atlassian'))));
      });
    });

    context('email link is at middle of plain text', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'test test@atlassian.com test' })) {
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph('test ', link({ href: 'mailto:test@atlassian.com' })('test@atlassian.com'), ' test')));
      });
    });

    context('email link without anchor tags in html', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'test@atlassian.com test' })) {
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'mailto:test@atlassian.com' })('test@atlassian.com'), ' test')));
      });
    });

    context('email link without anchor tags in html in middle of other text', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'test test@atlassian.com test' })) {
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph('test ', link({ href: 'mailto:test@atlassian.com' })('test@atlassian.com'), ' test')));
      });
    });

    context('email link is at end of html', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: '<a href="mailto:test@atlassian.com">Atlassian</a> test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'mailto:test@atlassian.com' })('Atlassian'), ' test')));
      });
    });
  });

  context('when hitting backspace in a link', () => {
    it('removes link mark when its not more valid link', () => {
      const { editorView } = editor(doc(paragraph(link({ href: 'http://www.xxx.com' })('http://{<}www.xxx.com{>}'))));
      sendKeyToPm(editorView, 'Backspace');
      sendKeyToPm(editorView, 'Backspace');
      sendKeyToPm(editorView, 'Backspace');
      expect(editorView.state.doc).to.deep.equal(doc(paragraph('http://')));
    });
  });
});
