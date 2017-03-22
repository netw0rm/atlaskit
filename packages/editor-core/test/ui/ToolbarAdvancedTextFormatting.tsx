import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import TextFormattingPlugin from '../../src/plugins/text-formatting';
import ToolbarAdvancedTextFormatting from '../../src/ui/ToolbarAdvancedTextFormatting';
import { doc, p, makeEditor, fixtures } from '../../src/test-helper';


describe('ak-editor-core/ui/ToolbarAdvancedTextFormatting', () => {

  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: TextFormattingPlugin,
    place: fixture()
  });

  it('should return null if both strikethrough and monospace are hidden', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarOption = shallow(<ToolbarAdvancedTextFormatting pluginState={pluginState} editorView={editorView} />);
    expect(toolbarOption.html()).to.not.equal(null);
    toolbarOption.setState({ strikeHidden: true, codeHidden: true });
    expect(toolbarOption.html()).to.equal(null);
  });

  it('should open drop-down when clicked', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pluginState} editorView={editorView} />);
    expect(toolbarOption.state('isOpen')).to.be.false;
    toolbarOption.find('svg').simulate('click');
    expect(toolbarOption.state('isOpen')).to.be.true;
  });

  it('should have 2 child elements with title attribute', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pluginState} editorView={editorView} />);
    toolbarOption.setState({ isOpen: true });
    expect(toolbarOption.find('[title]').length).to.equal(2);
  });

  it('should trigger toggleCode of pluginState when code option is clicked', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pluginState} editorView={editorView} />);
    toolbarOption.find('svg').simulate('click');
    pluginState.toggleCode = sinon.spy();
    const codeButton = toolbarOption.find('[title]').findWhere(wrapper => wrapper.text() === 'Code');
    codeButton.simulate('click');
    expect(pluginState.toggleCode.callCount).to.equal(1);
  });

  it('should trigger toggleStrike of pluginState when strikethrough option is clicked', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pluginState} editorView={editorView} />);
    toolbarOption.find('svg').simulate('click');
    pluginState.toggleStrike = sinon.spy();
    const strikeButton = toolbarOption.find('[title]').findWhere(wrapper => wrapper.text() === 'Strikethrough');
    strikeButton.simulate('click');
    expect(pluginState.toggleStrike.callCount).to.equal(1);
  });

  it('should be disabled if both codeDisabled and strikeDisabled are true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    pluginState.codeDisabled = true;
    pluginState.strikeDisabled = true;
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pluginState} editorView={editorView} />);
    const disabledButton = toolbarOption.find('button');
    expect(disabledButton.prop('disabled')).to.be.true;
  });
});
