import { default as plugin } from '../src';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { schema } from 'prosemirror/dist/schema-basic';
import * as chai from 'chai';
import { expect } from 'chai';
import testing from 'ak-editor-test';

const { builder, chaiEditor, insertText } = testing({ Fragment, schema, Node, Plugin, Slice })
const { doc, a, p, em, strong, code, hr, img } = builder;
chai.use(chaiEditor);

describe('ak-editor-plugin-markdown-inputrules', () => {
  const makeEditor = () => new ProseMirror({
    schema: schema,
    plugins: [plugin]
  });

  it('should convert "**text**" to strong', () => {
    const pm = makeEditor();
    insertText(pm, '**text**');
    expect(pm.doc).to.equal(doc(p(strong('text'))));
  });

  it('should convert "__text__" to strong', () => {
    const pm = makeEditor();
    insertText(pm, '__text__');
    expect(pm.doc).to.equal(doc(p(strong('text'))));
  });

  it('should convert "*text*" to em', () => {
    const pm = makeEditor();
    insertText(pm, '*text*');
    expect(pm.doc).to.equal(doc(p(em('text'))));
  });

  it('should convert "_text_" to italic', () => {
    const pm = makeEditor();
    insertText(pm, '_text_');
    expect(pm.doc).to.equal(doc(p(em('text'))));
  });

  it('should convert "[text](http://foo)" to hyperlink', () => {
    const pm = makeEditor();
    insertText(pm, '[text](http://foo)');
    expect(pm.doc).to.equal(doc(p(a({ href: 'http://foo' })('text'))));
  });

  it('should convert "***" at the start of a line to horizontal rule', () => {
    const pm = makeEditor();
    insertText(pm, '***');
    expect(pm.doc).to.equal(doc(p(), hr, p()));
  });

  it('should not convert "***" in the middle of a line to a horizontal rule', () => {
    const pm = makeEditor();
    insertText(pm, 'text***');
    expect(pm.doc).to.not.equal(doc(p(), hr, p()));
  });

  it('should convert "---" at the start of a line to horizontal rule', () => {
    const pm = makeEditor();
    insertText(pm, '---');
    expect(pm.doc).to.equal(doc(p(), hr, p()));
  });

  it('should not convert "---" in the middle of a line to a horizontal rule', () => {
    const pm = makeEditor();
    insertText(pm, 'text---');
    expect(pm.doc).to.not.equal(doc(p(), hr, p()));
  });

  it('should convert "`text`" to inline code', () => {
    const pm = makeEditor();
    insertText(pm, '`text`');
    expect(pm.doc).to.equal(doc(p(code('text'))));
  });

  it('should convert `![text](url)` to image', () => {
    const pm = makeEditor();
    insertText(pm, `![text](url)`);
    expect(pm.doc).to.equal(doc(p(img({ src: 'url', alt: 'text', title: 'text' }))));
  });

  it('should limit mark to surrounded text', () => {
    const pm = makeEditor();
    insertText(pm, '*italic*');
    insertText(pm, 'm');
    expect(pm.doc).to.equal(doc(p(em('italic'), 'm')));
  });
});
