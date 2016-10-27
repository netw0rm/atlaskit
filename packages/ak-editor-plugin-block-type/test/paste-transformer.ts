import BlockTypePlugin from '../src';
import { Slice, ProseMirror } from 'ak-editor-prosemirror';
import { chaiPlugin, code_block, fixtures, makeEditor, h1, doc, h2, slice, text, dispatchPasteEvent } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

chai.use(chaiPlugin);

describe('ak-editor-plugin-block-type paste transformer', () => {
  const fixture = fixtures();
  const editor = (code: string = '') => makeEditor({
    doc: doc(code_block()(code)),
    plugin: BlockTypePlugin,
    place: fixture(),
  });

  describe('non-empty code block', () => {
    it('should preserve existing code block content when pasting plain text', () => {
      const { pm } = editor('foo{<>}');
      dispatchPasteEvent(pm, { plain: 'bar' });
      const expected = doc(code_block()('foobar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting heading', () => {
      const { pm } = editor('foo{<>}');
      dispatchPasteEvent(pm, { html: '<h1>bar</h1>' });
      const expected = doc(code_block()('foobar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting code block', () => {
      const { pm } = editor('foo{<>}');
      dispatchPasteEvent(pm, { html: '<pre>bar</pre>' });
      const expected = doc(code_block()('foobar'));
      expect(pm.doc).to.deep.equal(expected);
    });
  });

  describe('empty code block', () => {
    it('should preserve existing code block content when pasting plain text', () => {
      const { pm } = editor('{<>}');
      dispatchPasteEvent(pm, { plain: 'foo' });
      const expected = doc(code_block()('foo'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting heading', () => {
      const { pm } = editor('{<>}');
      dispatchPasteEvent(pm, { html: '<h1>foo</h1>' });
      const expected = doc(code_block()('foo'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting heading with multilines', () => {
      const { pm } = editor('{<>}');
      dispatchPasteEvent(pm, { html: '<h1>foo<br>bar</h1>' });
      const expected = doc(code_block()('foo\nbar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting code block', () => {
      const { pm } = editor('{<>}');
      dispatchPasteEvent(pm, { html: '<pre>foo</pre>' });
      const expected = doc(code_block()('foo'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting multiple block types', () => {
      const { pm } = editor('{<>}');
      dispatchPasteEvent(pm, { html: '<h1>foo</h1><h2>bar</h2>' });
      const expected = doc(code_block()('foo\n\nbar'));
      expect(pm.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting multiple block types and multilines', () => {
      const { pm } = editor('{<>}');
      dispatchPasteEvent(pm, { html: '<h1>foo</h1><h2>bar<br>baz</h2>' });
      const expected = doc(code_block()('foo\n\nbar\nbaz'));
      expect(pm.doc).to.deep.equal(expected);
    });
  });
});
