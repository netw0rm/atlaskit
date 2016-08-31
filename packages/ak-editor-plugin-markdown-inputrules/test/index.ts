import MarkdownInputRulesPlugin from '../src';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { Plugin } from 'prosemirror/dist/edit';
import { schema } from 'prosemirror/dist/schema-basic';
import * as chai from 'chai';
import { expect } from 'chai';
import testing from 'ak-editor-test';

const { builder, chaiPlugin, makeEditor } = testing({
  Fragment, schema, Node, Plugin, Slice })
const { doc, a, p, em, strong, code, hr, img } = builder;
chai.use(chaiPlugin);

describe('ak-editor-plugin-markdown-inputrules', () => {
  const editor = (...content: any[]) => {
    const { pm, plugin } = makeEditor({
      doc: doc(p(...content)),
      plugin: MarkdownInputRulesPlugin
    });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  }

  it('should convert "**text**" to strong', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '**text**');
    expect(pm.doc).to.deep.equal(doc(p(strong('text'))));
  });

  it('should convert "__text__" to strong', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '__text__');
    expect(pm.doc).to.deep.equal(doc(p(strong('text'))));
  });

  it('should convert "*text*" to em', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '*text*');
    expect(pm.doc).to.deep.equal(doc(p(em('text'))));
  });

  it('should convert "_text_" to italic', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '_text_');
    expect(pm.doc).to.deep.equal(doc(p(em('text'))));
  });

  it('should convert "[text](http://foo)" to hyperlink', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '[text](http://foo)');
    expect(pm.doc).to.deep.equal(doc(p(a({ href: 'http://foo' })('text'))));
  });

  it('should convert "***" at the start of a line to horizontal rule', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '***');
    expect(pm.doc).to.deep.equal(doc(p(), hr, p()));
  });

  it('should not convert "***" in the middle of a line to a horizontal rule', () => {
    const { pm, sel } = editor('test{<>}');

    pm.input.insertText(sel, sel, 'text***');
    expect(pm.doc).to.not.equal(doc(p(), hr, p()));
  });

  it('should convert "---" at the start of a line to horizontal rule', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '---');
    expect(pm.doc).to.deep.equal(doc(p(), hr, p()));
  });

  it('should not convert "---" in the middle of a line to a horizontal rule', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, 'text---');
    expect(pm.doc).to.not.equal(doc(p('text'), hr, p()));
  });

  it('should convert "`text`" to inline code', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '`text`');
    expect(pm.doc).to.deep.equal(doc(p(code('text'))));
  });

  it('should convert `![text](url)` to image', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, `![text](url)`);
    expect(pm.doc).to.deep.equal(doc(p(img({ src: 'url', alt: 'text', title: 'text' }))));
  });

  it('should limit mark to surrounded text', () => {
    const { pm, sel } = editor('{<>}');

    pm.input.insertText(sel, sel, '*italic*');
    pm.input.insertText(pm.selection.from, pm.selection.from, 'm');
    expect(pm.doc).to.deep.equal(doc(p(em('italic'), 'm')));
  });
});
