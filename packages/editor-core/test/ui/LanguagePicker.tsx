import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import CodeBlockPlugin from '../../src/plugins/code-block';
import LanguagePicker from '../../src/ui/LanguagePicker';
import { code_block, doc, makeEditor, p } from '../../test-helper';


describe('ak-editor-core/ui/LanguagePicker', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: CodeBlockPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('should produce null HTML when editor is blur', () => {
    const { pm, plugin } = editor(doc(p('paragraph{pPos}'), code_block()('codeBlock{<>}')));
    const languagePicker = mount(<LanguagePicker pluginState={plugin}/>);
    expect(languagePicker.html()).to.not.equal(null);
    pm.on.blur.dispatch();
    expect(languagePicker.html()).to.equal(null);
  });

  it('should not produce null HTML when editor is focused', () => {
    const { pm, plugin } = editor(doc(p('paragraph{pPos}'), code_block()('codeBlock{<>}')));
    const languagePicker = mount(<LanguagePicker pluginState={plugin}/>);
    pm.on.blur.dispatch();
    pm.on.focus.dispatch();
    expect(languagePicker.html()).to.not.equal(null);
  });
});
