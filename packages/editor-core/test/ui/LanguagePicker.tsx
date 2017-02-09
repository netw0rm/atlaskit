import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import CodeBlockPlugin from '../../src/plugins/code-block';
import FloatingToolbar from '../../src/ui/FloatingToolbar';
import LanguagePicker from '../../src/ui/LanguagePicker';
import { makeEditor } from '../../test-helper';
import { doc, p, schema } from '../_schema-builder';

describe('ak-editor-core/ui/LanguagePicker', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: CodeBlockPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  context('when showToolbar is false', () => {
    it('does not render toolbar', () => {
      const { plugin } = editor(doc(p('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={plugin} />);
      languagePicker.setState({ showToolbar: false });

      expect(languagePicker.find(FloatingToolbar)).to.have.length(0);
    });
  });

  context('when showToolbar is true', () => {
    it('renders toolbar', () => {
      const { plugin } = editor(doc(p('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={plugin} />);
      languagePicker.setState({ showToolbar: true });

      expect(languagePicker.find(FloatingToolbar)).to.have.length(1);
    });
  });

  // it('should return null if state variable showToolbar is false or target is undefined', () => {
  //   const { pm } = editor(doc());
  //   const LanguagePickerOptions = shallow(<LanguagePicker pluginState={CodeBlockPlugin.get(pm)!}/>);
  //   LanguagePickerOptions.setState({ showToolbar: false });
  //   expect(LanguagePickerOptions.html()).to.equal(null);
  //   LanguagePickerOptions.setState({ showToolbar: true, target: document.createElement('div') });
  //   expect(LanguagePickerOptions.html()).to.not.equal(null);
  // });
});
