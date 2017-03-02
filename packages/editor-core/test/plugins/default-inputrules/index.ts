import * as chai from 'chai';
import { expect } from 'chai';
import DefaultInputRulesPlugin from '../../../src/plugins/default-inputrules';
import { chaiPlugin, doc, makeEditor, p } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('default-inputrules', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: DefaultInputRulesPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = DefaultInputRulesPlugin as any; // .State is not public API.
    expect(plugin.State.name).is.be.a('string');
  });

  it('should convert "-- " to emdash', () => {
    const { pm, sel } = editor(doc(p('{<>}')));

    pm.input.insertText(sel, sel, '-- ');
    expect(pm.doc).to.deep.equal(doc(p('— ')));
  });
});
