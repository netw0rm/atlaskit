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
