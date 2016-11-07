import MarkdownInputRulesPlugin from '../src';
import * as chai from 'chai';
import { expect } from 'chai';
import {
  chaiPlugin, makeEditor, doc, a, p, em, strong, code, 
  hr,img, h1, h2, h3, ul, li, blockquote, code_block
} from 'ak-editor-test';

chai.use(chaiPlugin);

describe('ak-editor-plugin-markdown-inputrules', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: MarkdownInputRulesPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  }

  it('should convert "**text**" to strong', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '**text**');
    expect(pm.doc).to.deep.equal(doc(p(strong('text'))));
  });

  it('should convert "__text__" to strong', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '__text__');
    expect(pm.doc).to.deep.equal(doc(p(strong('text'))));
  });

  it('should convert "*text*" to em', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '*text*');
    expect(pm.doc).to.deep.equal(doc(p(em('text'))));
  });

  it('should convert "_text_" to italic', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '_text_');
    expect(pm.doc).to.deep.equal(doc(p(em('text'))));
  });

  it('should convert "[text](http://foo)" to hyperlink', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '[text](http://foo)');
    expect(pm.doc).to.deep.equal(doc(p(a({ href: 'http://foo' })('text'))));
  });

  it('should convert "***" at the start of a line to horizontal rule', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '***');
    expect(pm.doc).to.deep.equal(doc(p(), hr, p()));
  });

  it('should not convert "***" in the middle of a line to a horizontal rule', () => {
    const { pm, sel } = editor(doc(p('test{<>}')));

    pm.input.insertText(sel, sel, 'text***');
    expect(pm.doc).to.not.equal(doc(p(), hr, p()));
  });

  it('should convert "---" at the start of a line to horizontal rule', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '---');
    expect(pm.doc).to.deep.equal(doc(p(), hr, p()));
  });

  it('should not convert "---" in the middle of a line to a horizontal rule', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, 'text---');
    expect(pm.doc).to.not.equal(doc(p('text'), hr, p()));
  });

  it('should convert "`text`" to inline code', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '`text`');
    expect(pm.doc).to.deep.equal(doc(p(code('text'))));
  });

  it('should convert `![text](url)` to image', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, `![text](url)`);
    expect(pm.doc).to.deep.equal(doc(p(img({ src: 'url', alt: 'text', title: 'text' }))));
  });

  it('should limit mark to surrounded text', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '*italic*');
    pm.input.insertText(pm.selection.from, pm.selection.from, 'm');
    expect(pm.doc).to.deep.equal(doc(p(em('italic'), 'm')));
  });

  it('should keep current marks when converting from markdown', () => {
    const { pm, sel } = editor(doc(p(strong('This is bold {<>}'))));

    pm.input.insertText(sel, sel, '*italic*');
    expect(pm.doc).to.deep.equal(doc(p(strong('This is bold '), em(strong('italic')))));    
  });

  it('should convert "# " to heading 1', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '# ');
    expect(pm.doc).to.deep.equal(doc(h1()));
  });

  it('should convert "## " to heading 2', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '## ');
    expect(pm.doc).to.deep.equal(doc(h2()));
  });

  it('should convert "### " to heading 3', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '### ');
    expect(pm.doc).to.deep.equal(doc(h3()));
  });

  it('should convert "* " to a bullet list item', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '* ');
    expect(pm.doc).to.deep.equal(doc(ul(li(p()))));
  });

  it('should convert "+ " to a bullet list item', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '+ ');
    expect(pm.doc).to.deep.equal(doc(ul(li(p()))));
  });

  it('should convert "- " to a bullet list item', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '- ');
    expect(pm.doc).to.deep.equal(doc(ul(li(p()))));
  });

  it('should not convert "** " to a nested bullet list item', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '** ');
    expect(pm.doc).to.deep.equal(doc(p('** ')));
  });

  it('should not convert "* " to a bullet list item when already inside a list', () => {
    const { pm, sel } = editor(doc(ul(li(p('{<>}')))));

    pm.input.insertText(sel, sel, '* ');
    expect(pm.doc).to.deep.equal(doc(ul(li(p('* ')))));
  });

  it('should convert "* " to a bullet list item when inside a blockquote', () => {
    const { pm, sel } = editor(doc(blockquote(p('{<>}'))));

    pm.input.insertText(sel, sel, '* ');
    expect(pm.doc).to.deep.equal(doc(blockquote(ul(li(p())))));
  });

  it('should not convert "* " to a bullet list item when inside a codeblock', () => {
    const { pm, sel } = editor(doc(code_block()('{<>}')));

    pm.input.insertText(sel, sel, '* ');
    expect(pm.doc).to.deep.equal(doc(code_block()('* ')));
  });
});
