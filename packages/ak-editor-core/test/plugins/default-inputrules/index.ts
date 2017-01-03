import DefaultInputRulesPlugin from '../../../src/plugins/default-inputrules';
import * as chai from 'chai';
import { expect } from 'chai';
import { chaiPlugin, makeEditor, doc, p } from '../../../test-helper';

chai.use(chaiPlugin);

describe('default-inputrules', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: DefaultInputRulesPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = DefaultInputRulesPlugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
  });

  it('should convert "-- " to emdash', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '-- ');
    expect(pm.doc).to.deep.equal(doc(p('— ')));
  });
});
