import * as chai from 'chai';
import { expect } from 'chai';
import MarkdownInputRulesPlugin from '../../../src/plugins/markdown-inputrules';
import {
  a, blockquote, br, chaiPlugin, code_block, doc, em, h1, h2,
  h3, hr, img, li, makeEditor, mono, ol, p, strike, strong, ul, mention
} from '../../../test-helper';
chai.use(chaiPlugin);

describe('markdown-inputrules', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: MarkdownInputRulesPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = MarkdownInputRulesPlugin as any; // .State is not public API.
    expect(plugin.State.name).is.be.a('string');
  });

  describe('strong rule', () => {
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
  });

  describe('em rule', () => {
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

    it('should only replace text with italic if there is blank space or beginning of the line before underscore', () => {
      const text = '1_2_';
      const { pm, sel } = editor(doc(p('{<>}')));
      pm.input.insertText(sel, sel, text);

      expect(pm.doc).to.deep.equal(doc(p(text)));
    });
  });

  describe('stike rule', () => {
    it('should convert "~~text~~" to strike', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '~~text~~');
      expect(pm.doc).to.deep.equal(doc(p(strike('text'))));
    });
  });

  describe('hyperlink rule', () => {
    it('should convert "[text](http://foo)" to hyperlink', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '[text](http://foo)');
      expect(pm.doc).to.deep.equal(doc(p(a({ href: 'http://foo' })('text'))));
    });
  });

  describe('horizontal rule', () => {
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
  });

  describe('mono rule', () => {
    it('should convert "`text`" to mono text', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '`text`');
      expect(pm.doc).to.deep.equal(doc(p(mono('text'))));
    });

    it('should be able to preserve mention inside mono text', () => {
      const mentionNode = mention({ id: '1234', displayName: '@helga' });
      const { pm } = editor(
      doc(p(
        '`hello, ',
        mentionNode,
        'there'
      )));
      pm.input.insertText(15, 15, '`');
      expect(pm.doc).to.deep.equal(doc(p(mono('hello, '), mono(mentionNode), mono('there'))));
    });
  });

  describe('image rule', () => {
    it('should convert `![text](url)` to image', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, `![text](url)`);
      expect(pm.doc).to.deep.equal(doc(p(img({ src: 'url', alt: 'text', title: 'text' }))));
    });
  });

  describe('heading rule', () => {
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
  });

  describe('bullet list rule', () => {
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

    it('should not convert "* " to a bullet list item when inside a heading', () => {
      const { pm, sel } = editor(doc(h1('{<>}')));

      pm.input.insertText(sel, sel, '* ');
      expect(pm.doc).to.deep.equal(doc(h1('* ')));
    });
  });

  describe('ordered list rule', () => {
    it('should convert "[number]. " to a ordered list item', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '1. ');
      expect(pm.doc).to.deep.equal(doc(ol(li(p()))));
    });

    it('should always begin a new list on 1', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '3. ');
      expect(pm.doc).to.deep.equal(doc(ol(li(p()))));
    });

    it('should convert "[number]. " to a ordered list item when inside a blockquote', () => {
      const { pm, sel } = editor(doc(blockquote(p('{<>}'))));

      pm.input.insertText(sel, sel, '1. ');
      expect(pm.doc).to.deep.equal(doc(blockquote(ol(li(p())))));
    });

    it('should not convert "[number]. " to a ordered list item when inside a codeblock', () => {
      const { pm, sel } = editor(doc(code_block()('{<>}')));

      pm.input.insertText(sel, sel, '1. ');
      expect(pm.doc).to.deep.equal(doc(code_block()('1. ')));
    });
  });

  describe('blockquote rule', () => {
    it('should convert "> " to a blockquote', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '> ');
      expect(pm.doc).to.deep.equal(doc(blockquote(p())));
    });

    it('should convert "> " to a blockquote when inside another blockquote (nesting)', () => {
      const { pm, sel } = editor(doc(blockquote(p('{<>}'))));

      pm.input.insertText(sel, sel, '> ');
      expect(pm.doc).to.deep.equal(doc(blockquote(blockquote(p()))));
    });

    it('should not convert "> " to a blockquote when inside a list', () => {
      const { pm, sel } = editor(doc(ul(li(p('{<>}')))));

      pm.input.insertText(sel, sel, '> ');
      expect(pm.doc).to.deep.equal(doc(ul(li(p('> ')))));
    });
  });

  describe('codeblock rule', () => {
    it('should convert "```" to a code block', () => {
      const { pm, sel } = editor(doc(p('{<>}hello', br, 'world')));

      pm.input.insertText(sel, sel, '```');
      expect(pm.doc).to.deep.equal(doc(code_block()('hello\nworld')));
    });

    it('should not convert "```" to a code block when inside a list', () => {
      const { pm, sel } = editor(doc(ul(li(p('{<>}')))));

      pm.input.insertText(sel, sel, '```');
      expect(pm.doc).to.deep.equal(doc(ul(li(p('```')))));
    });
  });

  describe('nested rules', () => {
    it('should convert "_`text`_" to italic mono text', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '_`text`');
      expect(pm.doc).to.deep.equal(doc(p('_', mono('text'))));
      pm.input.insertText(sel + 5, sel + 5, '_');
      expect(pm.doc).to.deep.equal(doc(p(em(mono('text')))));
    });

    it('should convert "~~**text**~~" to strike strong', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '~~**text**');
      expect(pm.doc).to.deep.equal(doc(p('~~', strong('text'))));
      pm.input.insertText(sel + 6, sel + 6, '~~');
      expect(pm.doc).to.deep.equal(doc(p(strike(strong('text')))));
    });

    it('should convert "`_text_`" to "_text_"', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '`_text_');
      expect(pm.doc).to.deep.equal(doc(p('`_text_')));
      pm.input.insertText(sel + 7, sel + 7, '`');
      expect(pm.doc).to.deep.equal(doc(p(mono('_text_'))));
    });

    it('should not convert "`_text`_" to italic', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '`_text`');
      expect(pm.doc).to.deep.equal(doc(p(mono('_text'))));
      pm.input.insertText(sel + 5, sel + 5, '_');
      expect(pm.doc).to.deep.equal(doc(p(mono('_text'), '_')));
  });
  });
});
