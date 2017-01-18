import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';

import { browser } from '../../../src';
import HorizontalRulePlugin from '../../../src/plugins/horizontal-rule';
import { chaiPlugin, doc, hr, makeEditor, p } from '../../../test-helper';

chai.use(chaiPlugin);
chai.use((sinonChai as any).default || sinonChai);

describe('horizontal_rule', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HorizontalRulePlugin });
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
