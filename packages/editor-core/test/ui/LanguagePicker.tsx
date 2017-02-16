import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as React from 'react';
import CodeBlockPlugin from '../../src/plugins/code-block';
import FloatingToolbar from '../../src/ui/FloatingToolbar';
import LanguagePicker from '../../src/ui/LanguagePicker';
import { makeEditor } from '../../test-helper';
import { code_block, doc, p, schema } from '../_schema-builder';

describe('LanguagePicker', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: CodeBlockPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  context('when showToolbar is false', () => {
    it('does not render toolbar', () => {
      const { plugin } = editor(doc(code_block()('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={plugin} />);
      languagePicker.setState({ showToolbar: false });

      expect(languagePicker.find(FloatingToolbar)).to.have.length(0);
    });
  });

  context('when showToolbar is true', () => {
    it('renders toolbar', () => {
      const { plugin } = editor(doc(code_block()('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={plugin} />);
      languagePicker.setState({ showToolbar: true });

      expect(languagePicker.find(FloatingToolbar)).to.have.length(1);
    });
  });

  context('click on a code block element', () => {
    it('sets showToolbar to be true', () => {
      const { pm, plugin } = editor(doc(code_block()('text')));
      const languagePicker = mount(<LanguagePicker pluginState={plugin} />);

      pm.on.click.dispatch();

      expect(languagePicker.state('showToolbar')).to.be.true;
    });
  });

  context('click on a non code block element', () => {
    it('sets showToolbar to be false', () => {

      const { pm, plugin } = editor(doc(p('text')));
      const languagePicker = mount(<LanguagePicker pluginState={plugin} />);

      pm.on.click.dispatch();

      expect(languagePicker.state('showToolbar')).to.be.false;
    });
  });

  it('editor is blur', () => {
    it('LanguagePicker produce null HTML', () => {
      const { pm, plugin } = editor(doc(p('paragraph{pPos}'), code_block()('codeBlock{<>}')));
      const languagePicker = mount(<LanguagePicker pluginState={plugin}/>);
      expect(languagePicker.html()).to.not.equal(null);
      pm.on.blur.dispatch();
      expect(languagePicker.html()).to.equal(null);
    });
  });

  it('editor is focused', () => {
    it('LanguagePicker will not produce null HTML', () => {
      const { pm, plugin } = editor(doc(p('paragraph{pPos}'), code_block()('codeBlock{<>}')));
      const languagePicker = mount(<LanguagePicker pluginState={plugin}/>);
      pm.on.blur.dispatch();
      pm.on.focus.dispatch();
      expect(languagePicker.html()).to.not.equal(null);
    });
  });
});
