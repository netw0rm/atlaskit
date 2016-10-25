import BlockTypePlugin from '../src';
import { Slice, ProseMirror } from 'ak-editor-prosemirror';
import { chaiPlugin, code_block, makeEditor, h1, doc, h2, slice, text } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

chai.use(chaiPlugin);

describe('ak-editor-plugin-block-type paste transformer', () => {
  const editor = () => makeEditor({
    doc: doc(code_block()()),
    plugin: BlockTypePlugin,
  });

  function pasted(pm: ProseMirror, slice: Slice): Slice {
    return pm.on.transformPasted.dispatch(slice);
  };

  it('should convert heading to code block if code block is empty', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(h1('foo')));
    const expected = slice(code_block()('foo'));
    expect(actual).to.deep.equal(expected);
  });

  it('should convert heading with multilines to code block if code block is empty', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(h1('foo\nbar')));
    const expected = slice(code_block()('foo\nbar'));
    expect(actual).to.deep.equal(expected);
  });

  it('should convert heading with multinodes to code block if code block is empty', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(h1('foo'), h2('bar')));
    const expected = slice(code_block()('foo\n\nbar'));
    expect(actual).to.deep.equal(expected);
  });

  it('should keep text in code block to continue in the same node', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(text('foo')));
    const expected = slice(text('foo'));
    expect(actual).to.deep.equal(expected);
  });

  it('should keep text with multilines in code block to continue in the same node', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(text('foo\nbar')));
    const expected = slice(text('foo\nbar'));
    expect(actual).to.deep.equal(expected);
  });

  it('should keep text with multinodes in code block to continue in the same node', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(text('foo'), text('bar')));
    const expected = slice(text('foo\n\nbar'));
    expect(actual).to.deep.equal(expected);
  });

  it('should convert to text if with multinodes in code block to continue in the same node', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(text('foo'), h1('bar')));
    const expected = slice(text('foo\n\nbar'));
    expect(actual).to.deep.equal(expected);
  });

  it('should convert to code block with multinodes in code block', () => {
    const { pm } = editor();
    const actual = pasted(pm, slice(h2('foo'), text('bar')));
    const expected = slice(code_block()('foo\n\nbar'));
    expect(actual).to.deep.equal(expected);
  });
});
