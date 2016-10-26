import BlockTypePlugin from '../src';
import { Slice, ProseMirror } from 'ak-editor-prosemirror';
import { chaiPlugin, code_block, fixtures, makeEditor, h1, doc, h2, slice, text, dispatchPasteEvent } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

chai.use(chaiPlugin);

describe('ak-editor-plugin-block-type paste transformer', () => {
  const fixture = fixtures();
  const editor = (code: string = "") => makeEditor({
    doc: doc(code_block()(code)),
    plugin: BlockTypePlugin,
    place: fixture(),
  });

  it('should preserve existing code block content when pasting plain text', () => {
    const { pm } = editor("foo{<>}");
    dispatchPasteEvent(pm, { plain: 'bar' });
    const expected = doc(code_block()("foobar"));
    expect(pm.doc).to.deep.equal(expected);
  });

  it('should preserve existing code block content when pasting plain text', () => {
    const { pm } = editor("foo{<>}");
    dispatchPasteEvent(pm, { plain: 'bar' });
    const expected = doc(code_block()("foobar"));
    expect(pm.doc).to.deep.equal(expected);
  });
  //
  // it('should preserve existing code block content when pasting heading', () => {
  //   debugger
  //   const { pm } = editor("foo{<>}");
  //   dispatchPasteEvent(pm, { html: '<h1>bar</h1>' });
  //   const expected = doc(code_block()("foobar"));
  //   expect(pm.doc).to.deep.equal(expected);
  // });
});
