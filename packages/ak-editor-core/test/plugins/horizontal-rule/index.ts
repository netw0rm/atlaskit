import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import * as mocha from 'mocha';
import { commands, browser, chaiPlugin, makeEditor, doc, p, hr, schema as schemaBasic, Schema } from '../../../src';

import HorizontalRulePlugin from '../../../src/plugins/horizontal-rule';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('horizontal_rule', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HorizontalRulePlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  describe('keymap', () => {
    if(browser.mac) {
      context('when hits Shift-Cmd--', () => {
        it('calls splitCodeBlock', () => {
          const { pm, plugin } = editor(doc(p('text{<>}')));

          pm.input.dispatchKey("Shift-Cmd--");

          expect(pm.doc).to.deep.equal(doc(p('text'), hr));
        });
      });
    } else {
      context('when hits Shift-Ctrl--', () => {
        it('calls splitCodeBlock', () => {
          const { pm, plugin } = editor(doc(p('text{<>}')));

          pm.input.dispatchKey("Shift-Ctrl--");

          expect(pm.doc).to.deep.equal(doc(p('text'), hr));
        });
      });
    }
  });
});
