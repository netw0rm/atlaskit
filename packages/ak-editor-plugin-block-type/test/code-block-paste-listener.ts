import BlockTypePlugin from '../src';
import { Slice, ProseMirror } from 'ak-editor-prosemirror';
import { chaiPlugin, code_block, fixtures, makeEditor, h1, doc, h2, slice, text, dispatchPasteEvent } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';
import { PasteContent } from 'ak-editor-test/src/dispatch-paste-event';

chai.use(chaiPlugin);

describe('ak-editor-plugin-block-type paste listener', () => {
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
    it('should preserve existing code block content when pasting', function () {
      const { pm } = editor('foo{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'bar' }, this);
      const expected = doc(code_block()('foobar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting two lines', function () {
      const { pm } = editor('foo{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'bar\nbaz' }, this);
      const expected = doc(code_block()('foobar\nbaz'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting two lines with an empty newline', function () {
      const { pm } = editor('foo{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'bar\n\nbaz' }, this);
      const expected = doc(code_block()('foobar\n\nbaz'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting three lines', function () {
      const { pm } = editor('foo{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'bar\n\nfoo\nbaz' }, this);
      const expected = doc(code_block()('foobar\n\nfoo\nbaz'));
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

    it('should preserve existing code block content when pasting two lines', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'foo\nbar' }, this);
      const expected = doc(code_block()('foo\nbar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting two lines with an empty newline', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'foo\n\nbar' }, this);
      const expected = doc(code_block()('foo\n\nbar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting three lines', function () {
      const { pm } = editor('{<>}');
      maybeDispatchPasteEvent(pm, { plain: 'foo\n\nbar\nbaz' }, this);
      const expected = doc(code_block()('foo\n\nbar\nbaz'));
      expect(pm.doc).to.deep.equal(expected);
    });
  });
});
