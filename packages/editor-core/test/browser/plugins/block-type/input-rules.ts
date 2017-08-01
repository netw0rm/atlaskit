import * as chai from 'chai';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { default as blockTypePlugins, BlockTypeState } from '../../../../src/plugins/block-type';
import {
  sendKeyToPm, blockquote, br, code_block, chaiPlugin, doc, h1, h2, h3, insertText, li, makeEditor, p, ul
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { analyticsService } from '../../../../src/analytics';

chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => makeEditor<BlockTypeState>({
    doc,
    plugins: blockTypePlugins(defaultSchema),
  });
  let trackEvent;
  beforeEach(() => {
    trackEvent = sinon.spy();
    analyticsService.trackEvent = trackEvent;
  });

  describe('heading rule', () => {
    it('should convert "# " to heading 1', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h1()));
      expect(trackEvent.calledWith('atlassian.editor.format.heading1.autoformatting')).to.equal(true);
    });

    it('should convert "# " to heading 1 inside list', () => {
      const { editorView, sel } = editor(doc(ul(li(p('{<>}')))));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(h1()))));
    });

    it('should not convert "# " to heading 1 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('# ')));
    });

    it('should convert "## " to heading 2', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '## ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h2()));
      expect(trackEvent.calledWith('atlassian.editor.format.heading2.autoformatting')).to.equal(true);
    });

    it('should not convert "## " to heading 1 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '## ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('## ')));
    });

    it('should convert "### " to heading 3', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '### ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h3()));
      expect(trackEvent.calledWith('atlassian.editor.format.heading3.autoformatting')).to.equal(true);
    });

    it('should not convert "### " to heading 3 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '### ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('### ')));
    });
  });

  describe('blockquote rule', () => {
    it('should convert "> " to a blockquote', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p())));
      expect(trackEvent.calledWith('atlassian.editor.format.blockquote.autoformatting')).to.equal(true);
    });

    it('should convert "> " to a blockquote inside list', () => {
      const { editorView, sel } = editor(doc(ul(li(p('{<>}')))));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(blockquote(p())))));
    });

    it('should convert "> " to a blockquote when inside another blockquote (nesting)', () => {
      const { editorView, sel } = editor(doc(blockquote(p('{<>}'))));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(blockquote(p()))));
    });

    it('should not convert "> " to a blockquote when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('> ')));
    });
  });

  describe('codeblock rule', () => {
    context('when node is convertable to code block', () => {
      context('when three backticks are entered followed by space', () => {
        it('should convert "``` " to a code block', () => {
          const { editorView, sel } = editor(doc(p('{<>}hello', br, 'world')));

          insertText(editorView, '``` ', sel);
          expect(editorView.state.doc).to.deep.equal(doc(code_block()('hello\nworld')));
          expect(trackEvent.calledWith('atlassian.editor.format.codeblock.autoformatting')).to.equal(true);
        });

        it('should convert "```java " to a code block with language java', () => {
          const { editorView, sel } = editor(doc(p('{<>}hello', br, 'world')));

          insertText(editorView, '```java ', sel);
          expect(editorView.state.doc).to.deep.equal(doc(code_block({ language: 'java' })('hello\nworld')));
        });
      });

      context('when there are more than 3 backticks', () => {
        it('should convert "`````js" to a code block with attr "language: js"', () => {
          const { editorView } = editor(doc(p('`````js{<>}')));
          sendKeyToPm(editorView, 'Enter');
          expect(editorView.state.doc).to.deep.equal(doc(code_block({ language: 'js' })('')));
        });
      });
    });
  });
});
