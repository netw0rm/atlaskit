import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import {Tooltip} from '@atlaskit/tooltip';
import TextFormattingPlugin from '../../src/plugins/text-formatting';
import ClearFormattingPlugin from '../../src/plugins/clear-formatting';
import ToolbarAdvancedTextFormatting from '../../src/ui/ToolbarAdvancedTextFormatting';
import ToolbarButton from '../../src/ui/ToolbarButton';
import { makeEditor } from '../../src/test-helper';
import { doc, p, schema } from '../_schema-builder';
import Item from 'ak-droplist-item';

describe('@atlaskit/editor-core/ui/ToolbarAdvancedTextFormatting', () => {
  const editor = (doc: any) => {
    const { pm, plugin, plugins } = makeEditor({ doc, plugins: [TextFormattingPlugin, ClearFormattingPlugin], schema });
    return { pm, plugin, plugins, sel: pm.doc.refs['<>'] };
  };

  it('should return null both pluginStateTextFormatting and pluginStateClearFormatting are undefined', () => {
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting />
    );
    toolbarOption.setState({ isOpen: true });
    expect(toolbarOption.html()).to.equal(null);
  });

  it('should have 3 child elements if both pluginStateTextFormatting and pluginStateClearFormatting are defined', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    toolbarOption.setState({ isOpen: true });
    expect(toolbarOption.find(Item).length).to.equal(3);
  });

  it('should return only 2 items if only pluginStateTextFormatting is defined', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = shallow(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
      />
    );
    expect(toolbarOption.find(Item).length).to.equal(2);
  });

  it('should return only 1 items if only pluginStateClearFormatting is defined', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = shallow(
      <ToolbarAdvancedTextFormatting
        pluginStateClearFormatting={plugins[1]}
      />
    );
    expect(toolbarOption.find(Item).length).to.equal(1);
  });

  it('should open drop-down when trigger clicked', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    expect(toolbarOption.state('isOpen')).to.be.false;
    toolbarOption.find(ToolbarButton).simulate('click');
    expect(toolbarOption.state('isOpen')).to.be.true;
  });

  it('should not open drop-down when trigger clicked but all code and strikethrough and clearformatting are disabled', () => {
    const { plugins } = editor(doc(p('text')));
    const pluginState = plugins[0];
    if (pluginState) {
      pluginState.codeDisabled = true;
      pluginState.strikeDisabled = true;
      pluginState.marksPresent = false;
    }
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    expect(toolbarOption.state('isOpen')).to.be.false;
    toolbarOption.find(ToolbarButton).simulate('click');
    expect(toolbarOption.state('isOpen')).to.be.false;
  });

  it('should have 3 child elements with title attribute', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    toolbarOption.setState({ isOpen: true });
    expect(toolbarOption.find(Tooltip).length).to.equal(3);
  });

  it('should trigger toggleCode of pluginStateTextFormatting when code option is clicked', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    plugins[0].toggleCode = sinon.spy();
    const codeButton = toolbarOption.find(Item).at(0).childAt(0);
    codeButton.simulate('click');
    expect(plugins[0].toggleCode.callCount).to.equal(1);
  });

  it('should trigger toggleStrike of pluginStateTextFormatting when strikethrough option is clicked', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    plugins[0].toggleStrike = sinon.spy();
    const strikeButton = toolbarOption.find(Item).at(1).childAt(0);
    strikeButton.simulate('click');
    expect(plugins[0].toggleStrike.callCount).to.equal(1);
  });

  it('should not have Code option if codeHidden is true', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    toolbarOption.setState({ codeHidden: true, isOpen: true });
    const codeButton = toolbarOption.find('span').findWhere(wrapper => wrapper.text() === 'Code');
    expect(codeButton.length).to.equal(0);
  });

  it('should not have Strikethrough option if strikeHidden is true', () => {
    const { plugins } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    toolbarOption.setState({ strikeHidden: true, isOpen: true });
    const strikeButton = toolbarOption.find('span').findWhere(wrapper => wrapper.text() === 'Strikethrough');
    expect(strikeButton.length).to.equal(0);
  });

  it('should trigger clearFormatting function of pluginStateTextFormatting when clearFormatting option is clicked', () => {
    const { plugins } = editor(doc(p('text')));
    plugins[1].formattingIsPresent = true;
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    plugins[1].clearFormatting = sinon.spy();
    const clearFormattingButton = toolbarOption.find(Item).at(2).childAt(0);
    clearFormattingButton.simulate('click');
    expect(plugins[1].clearFormatting.callCount).to.equal(1);
  });

  it('should be disabled if all code and strikethrough and clearformatting are disabled', () => {
    const { plugins } = editor(doc(p('text')));
    const pluginState = plugins[0];
    if (pluginState) {
      pluginState.codeDisabled = true;
      pluginState.strikeDisabled = true;
      pluginState.marksPresent = false;
    }
    const toolbarOption = mount(
      <ToolbarAdvancedTextFormatting
        pluginStateTextFormatting={plugins[0]}
        pluginStateClearFormatting={plugins[1]}
      />
    );
    const toolbarButton = toolbarOption.find(ToolbarButton);
    expect(toolbarButton.prop('disabled')).to.be.true;
  });
});
