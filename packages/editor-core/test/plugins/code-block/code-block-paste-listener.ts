import * as chai from 'chai';
import { expect } from 'chai';
import { EditorView } from '../../../src/prosemirror';
import CodeBlockPlugin from '../../../src/plugins/code-block';
import { blockquote, chaiPlugin, code_block, dispatchPasteEvent, doc, fixtures, makeEditor, p } from '../../../test-helper';
import { PasteContent } from '../../../test-helper/dispatch-paste-event';

chai.use(chaiPlugin);

describe('block-type paste listener', () => {
  const fixture = fixtures();
  const editor = (code: string = '') => makeEditor({
    doc: doc(code_block()(code)),
    plugin: CodeBlockPlugin,
    place: fixture(),
  });

  function maybeDispatchPasteEvent(editorView: EditorView, content: PasteContent, test: { skip: Function }) {
    if (!dispatchPasteEvent(editorView, content)) {
      console.warn('Synthetic event unsupported');
      test.skip();
    }
  }

  describe('non-empty code block', () => {
    it('should preserve existing code block content when pasting', function() {
      const { editorView } = editor('foo{<>}');
      maybeDispatchPasteEvent(editorView, { plain: 'bar' }, this);
      const expected = doc(code_block()('foobar'));
      expect(editorView.state.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting two lines', function() {
      const { editorView } = editor('foo{<>}');
      maybeDispatchPasteEvent(editorView, { plain: 'bar\nbaz' }, this);
      const expected = doc(code_block()('foobar\nbaz'));
      expect(editorView.state.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting two lines with an empty newline', function() {
      const { editorView } = editor('foo{<>}');
      maybeDispatchPasteEvent(editorView, { plain: 'bar\n\nbaz' }, this);
      const expected = doc(code_block()('foobar\n\nbaz'));
      expect(editorView.state.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting three lines', function() {
      const { editorView } = editor('foo{<>}');
      maybeDispatchPasteEvent(editorView, { plain: 'bar\n\nfoo\nbaz' }, this);
      const expected = doc(code_block()('foobar\n\nfoo\nbaz'));
      expect(editorView.state.doc).to.deep.equal(expected);
    });

    it('should be at the right position after pasting', function() {
      const { editorView } = editor('foo{<}bar{>}');
      const { state } = editorView;
      maybeDispatchPasteEvent(editorView, { plain: 'barbaz' }, this);
      const expected = doc(code_block()('foobarbaz'));
      expect(state.doc).to.deep.equal(expected);
      expect(state.selection.$from.pos).to.deep.equal(10);
      expect(state.selection.$to.pos).to.deep.equal(10);
    });

    it('should use our custom paste listener if the selected text block is inside of a blockquote', function() {
      const { editorView } = makeEditor({
        doc: doc(blockquote(p('p'), code_block()('foo{<}bar{>}'))),
        plugin: CodeBlockPlugin,
        place: fixture(),
      });
      const { state } = editorView;

      maybeDispatchPasteEvent(editorView, { plain: 'baz' }, this);
      const expected = doc(blockquote(p('p'), code_block()('foobaz')));
      expect(editorView.state.doc).to.deep.equal(expected);
      expect(state.selection.$from.pos).to.deep.equal(11);
      expect(state.selection.$to.pos).to.deep.equal(11);
    });
  });

  describe('empty code block', () => {
    it('should preserve existing code block content when pasting plain text', function() {
      const { editorView } = editor('{<>}');
      maybeDispatchPasteEvent(editorView, { plain: 'foo' }, this);
      const expected = doc(code_block()('foo'));
      expect(editorView.state.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting two lines', function() {
      const { editorView } = editor('{<>}');
      maybeDispatchPasteEvent(editorView, { plain: 'foo\nbar' }, this);
      const expected = doc(code_block()('foo\nbar'));
      expect(editorView.state.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting two lines with an empty newline', function() {
      const { editorView } = editor('{<>}');
      maybeDispatchPasteEvent(editorView, { plain: 'foo\n\nbar' }, this);
      const expected = doc(code_block()('foo\n\nbar'));
      expect(editorView.state.doc).to.deep.equal(expected);
    });

    it('should preserve existing code block content when pasting three lines', function() {
      const { editorView } = editor('{<>}');
      maybeDispatchPasteEvent(editorView, { plain: 'foo\n\nbar\nbaz' }, this);
      const expected = doc(code_block()('foo\n\nbar\nbaz'));
      expect(editorView.state.doc).to.deep.equal(expected);
    });
  });
});
