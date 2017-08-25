import * as chai from 'chai';
import * as sinon from 'sinon';
import { expect } from 'chai';

import {
  mention, em, strike, code, strong, insertText, chaiPlugin, doc, makeEditor, p, code_block
} from '../../../../src/test-helper';

import textFormattingPlugins from '../../../../src/plugins/text-formatting';
import defaultSchema from '../../../../src/test-helper/schema';
import { analyticsService } from '../../../../src/analytics';

chai.use(chaiPlugin);

describe('text-formatting input rules', () => {
  const editor = (doc: any, schema: any = defaultSchema) => makeEditor({
    doc,
    plugins: textFormattingPlugins(schema),
  });
  let trackEvent;
  beforeEach(() => {
    trackEvent = sinon.spy();
    analyticsService.trackEvent = trackEvent;
  });

  describe('strong rule', () => {
    it('should convert "**text**" to strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '**text**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(strong('text'))));
      expect(trackEvent.calledWith('atlassian.editor.format.strong.autoformatting')).to.equal(true);
    });

    it('should not convert "** text**" to strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '** text**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('** text**')));
    });

    it('should convert "__text__" to strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '__text__', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(strong('text'))));
      expect(trackEvent.calledWith('atlassian.editor.format.strong.autoformatting')).to.equal(true);
    });

    it('should not convert "**text**" to strong inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '**text**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('**text**')));
    });

    it('should not convert the surrounding text to strong', () => {
      const { editorView, sel } = editor(doc(p('hello{<>}there')));

      insertText(editorView, '**text**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('hello', strong('text'), 'there')));
    });

    it('should not be inclusive right after autoformatting conversion', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '**text**', sel);
      insertText(editorView, 'text', editorView.state.selection.$from.pos);
      expect(editorView.state.doc).to.deep.equal(doc(p(strong('text'), 'text')));
    });

    it('should not convert "`**text**" to strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`**text**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`**text**')));
    });

    it('should not convert "`__text__" to strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`__text__', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`__text__')));
    });

    it('should not convert "`some**variables**" to strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`some**variables**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`some**variables**')));
    });

    it('should not convert "`some__variables__" to strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`some__variables__', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`some__variables__')));
    });
  });

  describe('em rule', () => {
    it('should convert "*text*" to em', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '*text*', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(em('text'))));
      expect(trackEvent.calledWith('atlassian.editor.format.em.autoformatting')).to.equal(true);
    });

    it('should not convert "* text*" to em', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '* text*', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('* text*')));
    });

    it('should convert "_text_" to em', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '_text_', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(em('text'))));
      expect(trackEvent.calledWith('atlassian.editor.format.em.autoformatting')).to.equal(true);
    });

    it('should not be inclusive right after autoformatting conversion', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '*italic*', sel);
      insertText(editorView, 'text', editorView.state.selection.$from.pos);
      expect(editorView.state.doc).to.deep.equal(doc(p(em('italic'), 'text')));
    });

    it('should keep current marks when converting from markdown', () => {
      const { editorView, sel } = editor(doc(p(strong('This is bold {<>}'))));

      insertText(editorView, '*italic*', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(strong('This is bold '), em(strong('italic')))));
    });

    it('should not convert "*text*" to em inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '*text*', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('*text*')));
    });

    it('should not convert "`*text*" to em', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`*text*', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`*text*')));
    });

    it('should not convert "`some*variables*" to em', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`some*variables*', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`some*variables*')));
    });

    it('should not convert "`_text_" to em', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`_text_', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`_text_')));
    });

    it('should not convert "`some_variables_" to em', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`some_variables_', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`some_variables_')));
    });
  });

  describe('stike rule', () => {
    it('should convert "~~text~~" to strike', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '~~text~~', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(strike('text'))));
      expect(trackEvent.calledWith('atlassian.editor.format.strike.autoformatting')).to.equal(true);
    });

    it('should not convert "~~text~~" to strike', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '~~ text~~', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('~~ text~~')));
    });

    it('should not convert "~~text~~" to strike inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '~~text~~', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('~~text~~')));
    });

    it('should not be inclusive right after autoformatting conversion', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '~~text~~', sel);
      insertText(editorView, 'text', editorView.state.selection.$from.pos);
      expect(editorView.state.doc).to.deep.equal(doc(p(strike('text'), 'text')));
    });

    it('should not convert "`~~text~~" to strike', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`~~text~~', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`~~text~~')));
    });

    it('should not convert "`some~~texts~~" to strike', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`some~~texts~~', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('`some~~texts~~')));
    });
  });

  describe('code rule', () => {
    it('should convert "`text`" to code text', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`text`', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(code('text'))));
      expect(trackEvent.calledWith('atlassian.editor.format.code.autoformatting')).to.equal(true);
    });

    it('should not convert "` text`" to code text', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '` text`', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('` text`')));
    });

    it('should convert mention to plaint text', () => {
      const mentionNode = mention({ id: '1234', text: '@helga' });
      const { editorView, sel } = editor(
        doc(p(
          'hey! `hello, ',
          mentionNode,
          ' there{<>}?'
        )));
      insertText(editorView, '`', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('hey! ', code('hello, @helga there'), '?')));
    });

    it('should cleanup other formatting', () => {
      const mentionNode = mention({ id: '1234', text: '@helga' });
      const { editorView, sel } = editor(
        doc(p(
          '`',
          strong('hello '),
          mentionNode,
          em(', '),
          strike('there?{<>}')
        )));
      insertText(editorView, '`', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(code('hello @helga, there?'))));
    });

    it('should not convert "`text`" to code text inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '`text`', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('`text`')));
    });

    it('should not be inclusive right after autoformatting conversion', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '`text`', sel);
      insertText(editorView, 'text', editorView.state.selection.$from.pos);
      expect(editorView.state.doc).to.deep.equal(doc(p(code('text'), 'text')));
    });
  });

  describe('nested rules', () => {
    it('should work without code-mark in the schema', () => {
      const simpleSchema = {
        ...defaultSchema,
        marks: {
          strong: defaultSchema.marks.strong
        }
      };

      const { editorView, sel } = editor(doc(p('{<>}')), simpleSchema);

      insertText(editorView, '**text**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(strong('text'))));
    });

    it('should convert "*`text`*" to italic code text', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '*`text`', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('*', code('text'))));

      insertText(editorView, '*', editorView.state.selection.from);
      expect(editorView.state.doc).to.deep.equal(doc(p(em(code('text')))));
    });

    it('should convert "~~**text**~~" to strike strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '~~**text**', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('~~', strong('text'))));
      insertText(editorView, '~~', editorView.state.selection.from);
      expect(editorView.state.doc).to.deep.equal(doc(p(strike(strong('text')))));
      expect(trackEvent.calledWith('atlassian.editor.format.strong.autoformatting')).to.equal(true);
      expect(trackEvent.calledWith('atlassian.editor.format.strike.autoformatting')).to.equal(true);
    });
  });
});
