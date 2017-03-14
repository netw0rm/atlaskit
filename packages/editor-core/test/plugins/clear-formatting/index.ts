import { expect } from 'chai';
import * as chai from 'chai';

import { browser } from '../../../src';
import { ClearFormattingPlugin } from '../../../src';
import { chaiPlugin, makeEditor } from '../../../src/test-helper';
import { doc, mono, p, schema, strong, em, u, strike, code_block, h1, panel, link, linkable, blockquote, li, ol } from '../../_schema-builder';

chai.use(chaiPlugin);

describe('clear-formatting', () => {
  const editor = (doc: any) => makeEditor({ doc, plugin: ClearFormattingPlugin, schema });

  describe('formattingIsPresent', () => {
    it('should be true if some marks are present', () => {
      const { plugin } = editor(doc(p(strong('t{<ex>}t'))));
      expect(plugin.formattingIsPresent).to.be.true;
    });

    it('should be true if code blocks is present', () => {
      const { plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('code{<>}Block')));
      expect(plugin.formattingIsPresent).to.be.true;
    });

    it('should be false if no marks are present', () => {
      const { plugin } = editor(doc(p('text')));
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should be false if all present marks are cleared', () => {
      const { plugin } = editor(doc(p(strong('{<text>}'))));
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should be false if all present blocks are cleared', () => {
      const { plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('code{<>}Block')));
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should be false if all present marks and blocks are cleared', () => {
      const { plugin } = editor(doc(p('parag{<raph'), code_block({language: 'java'})('code>}Block')));
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });
  });

  describe('clearFormatting', () => {
    it('should clear strong if present', () => {
      const { plugin } = editor(doc(p(strong('t{<ex>}t'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should clear italic if present', () => {
      const { plugin } = editor(doc(p(em('t{<ex>}t'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should clear underline if present', () => {
      const { plugin } = editor(doc(p(u('t{<ex>}t'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should clear monospace if present', () => {
      const { plugin } = editor(doc(p(mono('t{<ex>}t'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should clear strikeout if present', () => {
      const { plugin } = editor(doc(p(strike('t{<ex>}t'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should remove heading blocks if present', () => {
      const { plugin } = editor(doc(h1(strike('t{<ex>}t'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should remove panel block if present', () => {
      const { plugin } = editor(doc(panel(p('te{<>}xt'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should remove block-quote if present', () => {
      const { plugin } = editor(doc(blockquote(p('te{<>}xt'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should remove link if present', () => {
      const { plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('t{<ex>}t'))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });

    it('should remove ordered list item if present', () => {
      const { plugin } = editor(doc(ol(li(p('te{<>}xt')))));
      expect(plugin.formattingIsPresent).to.be.true;
      plugin.clearFormatting();
      expect(plugin.formattingIsPresent).not.to.be.true;
    });
  });

  describe('keymap', () => {
    context('Cmd-\\', () => {
      it('clear formatting', () => {
        const { pm, plugin } = editor(doc(p(strong('t{<ex>}t'))));
        expect(plugin.formattingIsPresent).to.be.true;
        if (browser.mac) {
          pm.input.dispatchKey('Cmd-\\');
        } else {
          pm.input.dispatchKey('Ctrl-\\');
        }
        expect(plugin.formattingIsPresent).not.to.be.true;
      });
    });
  });

});
