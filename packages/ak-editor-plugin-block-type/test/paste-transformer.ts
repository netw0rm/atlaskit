import BlockTypePlugin from '../src';
import { Slice, ProseMirror } from 'ak-editor-prosemirror';
import { chaiPlugin, code_block, fixtures, makeEditor, h1, doc, h2, slice, text, dispatchPasteEvent } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';
import { PasteContent } from 'ak-editor-test/src/dispatch-paste-event';

chai.use(chaiPlugin);

describe('ak-editor-plugin-block-type paste transformer', () => {
  const fixture = fixtures();
  const editor = (code: string = '') => makeEditor({
    doc: doc(code_block()(code)),
    plugin: BlockTypePlugin,
    place: fixture(),
  });

  function maybeDispatchPasteEvent(pm: ProseMirror, content: PasteContent, test: { skip: Function }) {
    if (!dispatchPasteEvent(pm, content)) {
      console.warn('Synthetic event unsupported');
      test.skip();
    }
  }

  describe('non-empty code block', () => {
    it('should preserve existing code block content when pasting plain text', function () {
      const { pm } = editor('foo{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'bar' }, this);
      const expected = doc(code_block()('foobar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting heading', function () {
      const { pm } = editor('foo{<>}');
      maybeDispatchPasteEvent(pm, { html: '<h1>bar</h1>' }, this);
      const expected = doc(code_block()('foobar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting code block', function () {
      const { pm } = editor('foo{<>}');
      maybeDispatchPasteEvent(pm, { html: '<pre>bar</pre>' }, this);
      const expected = doc(code_block()('foobar'));
      expect(pm.doc).to.deep.equal(expected);
    });
  });

  describe('empty code block', () => {
    it('should preserve existing code block content when pasting plain text', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'foo' }, this);
      const expected = doc(code_block()('foo'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting heading', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { html: '<h1>foo</h1>' }, this);
      const expected = doc(code_block()('foo'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting heading with multilines', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { html: '<h1>foo<br>bar</h1>' }, this);
      const expected = doc(code_block()('foo\nbar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting code block', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { html: '<pre>foo</pre>' }, this);
      const expected = doc(code_block()('foo'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting multiple block types', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { html: '<h1>foo</h1><h2>bar</h2>' }, this);
      const expected = doc(code_block()('foo\n\nbar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting multiple block types and multilines', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { html: '<h1>foo</h1><h2>bar<br>baz</h2>' }, this);
      const expected = doc(code_block()('foo\n\nbar\nbaz'));
      expect(pm.doc).to.deep.equal(expected);
    });
  });
});
