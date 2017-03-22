import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as React from 'react';
import CodeBlockPlugin from '../../src/plugins/code-block';
import FloatingToolbar from '../../src/ui/FloatingToolbar';
import LanguagePicker from '../../src/ui/LanguagePicker';
import { code_block, doc, p, makeEditor, fixtures } from '../../src/test-helper';

describe('LanguagePicker', () => {

  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: CodeBlockPlugin,
    place: fixture()
  });

  context('when toolbarVisible is false', () => {
    it('does not render toolbar', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={pluginState} editorView={editorView} />);
      languagePicker.setState({ toolbarVisible: false });

      expect(languagePicker.find(FloatingToolbar)).to.have.length(0);
    });
  });

  context('when toolbarVisible is true', () => {
    it('renders toolbar', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={pluginState} editorView={editorView} />);
      languagePicker.setState({ toolbarVisible: true });

      expect(languagePicker.find(FloatingToolbar)).to.have.length(1);
    });
  });

  context('click on a code block element', () => {
    it('sets toolbarVisible to be true', () => {
      const { editorView, plugin, pluginState } = editor(doc(code_block()('text')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      plugin.props.onFocus(editorView);
      plugin.props.handleClick(editorView);

      expect(languagePicker.state('toolbarVisible')).to.be.true;
    });
  });

  context('click on a non code block element', () => {
    it('sets current code-block element to be undefined', () => {
      const { editorView, plugin, pluginState } = editor(doc(p('text')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      plugin.props.handleClick(editorView);

      expect(languagePicker.state('element')).to.be.undefined;
    });
  });

  it('editor is blur', () => {
    it('LanguagePicker produce null HTML', () => {
      const { editorView, plugin, pluginState } = editor(doc(p('paragraph'), code_block()('codeBlock{<>}')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);
      expect(languagePicker.html()).to.not.equal(null);

      plugin.props.onBlur(editorView);

      expect(languagePicker.html()).to.equal(null);
    });
  });

  context('when code block has a language', () => {
    it('shows the formatted language', () => {
      const { editorView, pluginState } = editor(doc(code_block({ language: 'js' })('text')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      expect(languagePicker.state('language')).to.be.equal('JavaScript');
    });

    it('updates plugin with the formatted langauge', () => {
      const { editorView, pluginState } = editor(doc(code_block({ language: 'js' })('text')));
      mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      expect(pluginState.language).to.equal('JavaScript');
    });
  });

  context('when code block has no language set', () => {
    it('shows no specific language', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      expect(languagePicker.state('language')).to.be.equal('Language');
    });
  });
});
