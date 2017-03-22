import { expect } from 'chai';
import * as chai from 'chai';

import { browser } from '../../../src/prosemirror';
import ClearFormattingPlugin from '../../../src/plugins/clear-formatting';
import {
  a as link, blockquote, chaiPlugin, code_block, code, doc, em, fixtures, h1,
  li, linkable, makeEditor, ol, p, panel, sendKeyToPm, strike, strong, u
} from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('clear-formatting', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: ClearFormattingPlugin,
    place: fixture()
  });

  describe('formattingIsPresent', () => {
    it('should be true if some marks are present', () => {
      const { pluginState } = editor(doc(p(strong('t{<ex>}t'))));
      expect(pluginState.formattingIsPresent).to.be.true;
    });

    it('should be true if code blocks is present', () => {
      const { pluginState } = editor(doc(p('paragraph'), code_block({language: 'java'})('code{<>}Block')));
      expect(pluginState.formattingIsPresent).to.be.true;
    });

    it('should be false if no marks are present', () => {
      const { pluginState } = editor(doc(p('text')));
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });

    it('should be false if all present marks are cleared', () => {
      const { editorView, pluginState } = editor(doc(p(strong('{<}text{>}'))));

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });

    it('should be false if all present blocks are cleared', () => {
      const { editorView, pluginState } = editor(doc(p('paragraph'), code_block({language: 'java'})('code{<>}Block')));
      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });

    it('should be false if all present marks and blocks are cleared', () => {
      const { editorView, pluginState } = editor(doc(p('parag{<raph'), code_block({language: 'java'})('code>}Block')));
      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });
  });

  describe('clearFormatting', () => {
    [
      {nodeName: 'strong', nodeType: strong},
      {nodeName: 'italic', nodeType: em},
      {nodeName: 'underline', nodeType: u},
      {nodeName: 'monospace', nodeType: code},
      {nodeName: 'strikeout', nodeType: strike},
    ].forEach(({nodeName, nodeType}) => {
      it(`should clear ${nodeName} if present`, () => {
        const { editorView, pluginState } = editor(doc(p(nodeType('t{<}ex{>}t'))));
        expect(pluginState.formattingIsPresent).to.be.true;

        pluginState.clearFormatting(editorView);
        expect(pluginState.formattingIsPresent).not.to.be.true;
      });
    });

    it('should remove heading blocks if present', () => {
      const { editorView, pluginState } = editor(doc(h1(strike('t{<}ex{>}t'))));
      expect(pluginState.formattingIsPresent).to.be.true;

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });

    it('should remove panel block if present', () => {
      const { editorView, pluginState } = editor(doc(panel(p('te{<>}xt'))));
      expect(pluginState.formattingIsPresent).to.be.true;

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });

    it('should remove block-quote if present', () => {
      const { editorView, pluginState } = editor(doc(blockquote(p('te{<>}xt'))));
      expect(pluginState.formattingIsPresent).to.be.true;

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });

    it('should remove link if present', () => {
      const { editorView, pluginState } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('t{<ex>}t'))));
      expect(pluginState.formattingIsPresent).to.be.true;

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });

    it('should remove ordered list item if present', () => {
      const { editorView, pluginState } = editor(doc(ol(li(p('te{<>}xt')))));
      expect(pluginState.formattingIsPresent).to.be.true;

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.be.true;
    });
  });

  describe('keymap', () => {
    it('should clear formatting', () => {
      const { editorView, pluginState } = editor(doc(p(strong('t{<}ex{>}t'))));
      expect(pluginState.formattingIsPresent).to.be.true;

      if (browser.mac) {
        sendKeyToPm(editorView, 'Cmd-\\');
      } else {
        sendKeyToPm(editorView, 'Ctrl-\\');
      }

      expect(pluginState.formattingIsPresent).not.to.be.true;
    });
  });

});
