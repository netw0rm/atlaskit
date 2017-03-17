import * as chai from 'chai';
import { expect } from 'chai';
import MarkdownInputRulesPlugin from '../../../src/plugins/inputrules';
import {
  a, blockquote, br, chaiPlugin, code_block, doc, em, h1, h2,
  h3, hr, img, li, makeEditor, code, ol, p, strike, strong, ul, mention
} from '../../../test-helper';
chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: MarkdownInputRulesPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = MarkdownInputRulesPlugin as any; // .State is not public API.
    expect(plugin.State.name).is.be.a('string');
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
    context('when node is not convertable to code block', () => {
      it('should not convert "```" to a code block\t', () => {
        const { pm, sel } = editor(doc(ul(li(p('{<>}hello')))));

        pm.input.insertText(sel, sel, '```');
        expect(pm.doc).to.deep.equal(doc(ul(li(p('```hello')))));
      });
    });

    context('when node is convertable to code block', () => {
      context('when converted node has content', () => {
        it('should convert "```" to a code block', () => {
          const { pm, sel } = editor(doc(p('{<>}hello', br, 'world')));

          pm.input.insertText(sel, sel, '```');
          expect(pm.doc).to.deep.equal(doc(code_block()('hello\nworld')));
        });
      });

      context('when converted node has no content', () => {
        it('should not convert "```" to a code block\t', () => {
          const { pm, sel } = editor(doc(p('{<>}')));

          pm.input.insertText(sel, sel, '```');
          expect(pm.doc).to.deep.equal(doc(p('```')));
        });
      });

    });

  });

});
