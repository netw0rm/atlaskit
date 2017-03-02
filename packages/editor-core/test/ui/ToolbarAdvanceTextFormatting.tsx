import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import TextFormattingPlugin from '../../src/plugins/text-formatting';
import ToolbarAdvancedTextFormatting from '../../src/ui/ToolbarAdvancedTextFormatting';
import ToolbarButton from '../../src/ui/ToolbarButton';
import { makeEditor } from '../../src/test-helper';
import { doc, p, schema } from '../_schema-builder';

describe('@atlaskit/editor-core/ui/ToolbarAdvancedTextFormatting', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: TextFormattingPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('should return null if both strikethrough and monospace are hidden', () => {
    const { pm } = editor(doc(p('text')));
    const toolbarOption = shallow(<ToolbarAdvancedTextFormatting pluginState={pm && TextFormattingPlugin.get(pm)}/>);
    expect(toolbarOption.html()).to.not.equal(null);
    toolbarOption.setState({ strikeHidden: true, monoHidden: true });
    expect(toolbarOption.html()).to.equal(null);
  });

  it('should open drop-down when clicked', () => {
    const { pm } = editor(doc(p('text')));
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pm && TextFormattingPlugin.get(pm)}/>);
    expect(toolbarOption.state('isOpen')).to.be.false;
    toolbarOption.find(ToolbarButton).simulate('click');
    expect(toolbarOption.state('isOpen')).to.be.true;
  });

  it('should have 2 child elements with title attribute', () => {
    const { pm } = editor(doc(p('text')));
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pm && TextFormattingPlugin.get(pm)}/>);
    toolbarOption.setState({ isOpen: true });
    expect(toolbarOption.find('[title]').length).to.equal(2);
  });

  it('should trigger toggleMono of plugin when monospace option is clicked', () => {
    const { pm, plugin } = editor(doc(p('text')));
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pm && TextFormattingPlugin.get(pm)}/>);
    toolbarOption.find(ToolbarButton).simulate('click');
    plugin.toggleMono = sinon.spy();
    const monospaceButton = toolbarOption.find('[title]').findWhere(wrapper => wrapper.text() === 'Monospace');
    monospaceButton.simulate('click');
    expect(plugin.toggleMono.callCount).to.equal(1);
  });

  it('should trigger toggleStrike of plugin when strikethrough option is clicked', () => {
    const { pm, plugin } = editor(doc(p('text')));
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pm && TextFormattingPlugin.get(pm)}/>);
    toolbarOption.find(ToolbarButton).simulate('click');
    plugin.toggleStrike = sinon.spy();
    const strikeButton = toolbarOption.find('[title]').findWhere(wrapper => wrapper.text() === 'Strikethrough');
    strikeButton.simulate('click');
    expect(plugin.toggleStrike.callCount).to.equal(1);
  });

  it('should be disabled if both monoDisabled and strikeDisabled are true', () => {
    const { pm } = editor(doc(p('text')));
    const pluginState = pm && TextFormattingPlugin.get(pm);
    if (pluginState) {
      pluginState.monoDisabled = true;
      pluginState.strikeDisabled = true;
    }
    const toolbarOption = mount(<ToolbarAdvancedTextFormatting pluginState={pluginState}/>);
    const disabledButton = toolbarOption.find('button');
    expect(disabledButton.prop('disabled')).to.be.true;
  });
});
