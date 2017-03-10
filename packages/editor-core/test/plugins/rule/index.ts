import * as chai from 'chai';
import { expect } from 'chai';

import { browser } from '../../../src';
import RulePlugin from '../../../src/plugins/rule';
import { chaiPlugin, doc, hr, makeEditor, p } from '../../../test-helper';

chai.use(chaiPlugin);

describe('rule', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: RulePlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  describe('keymap', () => {
    if (browser.mac) {
      context('when hits Shift-Cmd--', () => {
        it('calls splitCodeBlock', () => {
          const { pm } = editor(doc(p('text{<>}')));

          pm.input.dispatchKey('Shift-Cmd--');

          expect(pm.doc).to.deep.equal(doc(p('text'), hr));
        });
      });
    } else {
      context('when hits Shift-Ctrl--', () => {
        it('calls splitCodeBlock', () => {
          const { pm } = editor(doc(p('text{<>}')));

          pm.input.dispatchKey('Shift-Ctrl--');

          expect(pm.doc).to.deep.equal(doc(p('text'), hr));
        });
      });
    }
  });
});
