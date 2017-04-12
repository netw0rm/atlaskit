import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import { Tooltip } from '@atlaskit/tooltip';
import Item from '@atlaskit/droplist-item';
import textFormattingPlugins from '../../src/plugins/text-formatting';
import clearFormattingPlugins from '../../src/plugins/clear-formatting';
import ToolbarAdvancedTextFormatting from '../../src/ui/ToolbarAdvancedTextFormatting';
import ToolbarButton from '../../src/ui/ToolbarButton';
import { doc, p, code, strike, makeEditor, fixtures } from '../../src/test-helper';
import defaultSchema from '../../src/test-helper/schema';

describe('@atlaskit/editor-core/ui/ToolbarAdvancedTextFormatting', () => {
    const fixture = fixtures();
    const textFormattingPluginSet = textFormattingPlugins(defaultSchema);
    const clearformattingPluginSet = clearFormattingPlugins(defaultSchema);
    const editor = (doc: any) => makeEditor({
        doc,
        plugins: [...textFormattingPluginSet, ...clearformattingPluginSet],
        place: fixture()
    });

    it('should return null both pluginStateTextFormatting and pluginStateClearFormatting are undefined', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting editorView={editorView} />
        );
        toolbarOption.setState({ isOpen: true });
        expect(toolbarOption.html()).to.equal(null);
    });

    it('should have 5 child elements if both pluginStateTextFormatting and pluginStateClearFormatting are defined', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        toolbarOption.setState({ isOpen: true });
        expect(toolbarOption.find(Item).length).to.equal(5);
    });

    it('should return only 4 items if only pluginStateTextFormatting is defined', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = shallow(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        expect(toolbarOption.find(Item).length).to.equal(4);
    });

    it('should return only 1 items if only pluginStateClearFormatting is defined', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = shallow(
            <ToolbarAdvancedTextFormatting
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        expect(toolbarOption.find(Item).length).to.equal(1);
    });

    it('should open drop-down when trigger clicked', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        expect(toolbarOption.state('isOpen')).to.be.false;
        toolbarOption.find(ToolbarButton).simulate('click');
        expect(toolbarOption.state('isOpen')).to.be.true;
    });

    it('should not open drop-down when trigger clicked but all code and strikethrough and clearformatting are disabled', () => {
        const { editorView } = editor(doc(p('text')));
        const pluginState = textFormattingPluginSet[0].getState(editorView.state);
        if (pluginState) {
            pluginState.codeDisabled = true;
            pluginState.strikeDisabled = true;
            pluginState.marksPresent = false;
        }
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        expect(toolbarOption.state('isOpen')).to.be.false;
        toolbarOption.find(ToolbarButton).simulate('click');
        expect(toolbarOption.state('isOpen')).to.be.false;
    });

    it('should have 5 child elements with title attribute', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        toolbarOption.setState({ isOpen: true });
        expect(toolbarOption.find(Tooltip).length).to.equal(5);
    });

    it('should trigger toggleCode of pluginStateTextFormatting when code option is clicked', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        textFormattingPluginSet[0].getState(editorView.state).toggleCode = sinon.spy();
        const codeButton = toolbarOption.find(Item).at(0).childAt(0);
        codeButton.simulate('click');
        expect(textFormattingPluginSet[0].getState(editorView.state).toggleCode.callCount).to.equal(1);
    });

    it('should trigger toggleStrike of pluginStateTextFormatting when strikethrough option is clicked', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        textFormattingPluginSet[0].getState(editorView.state).toggleStrike = sinon.spy();
        const strikeButton = toolbarOption.find(Item).at(1).childAt(0);
        strikeButton.simulate('click');
        expect(textFormattingPluginSet[0].getState(editorView.state).toggleStrike.callCount).to.equal(1);
    });

    it('should not have Code option if codeHidden is true', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        toolbarOption.setState({ codeHidden: true, isOpen: true });
        const codeButton = toolbarOption.find('span').findWhere(wrapper => wrapper.text() === 'Code');
        expect(codeButton.length).to.equal(0);
    });

    it('should not have Strikethrough option if strikeHidden is true', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        toolbarOption.setState({ strikeHidden: true, isOpen: true });
        const strikeButton = toolbarOption.find('span').findWhere(wrapper => wrapper.text() === 'Strikethrough');
        expect(strikeButton.length).to.equal(0);
    });

    it('should trigger clearFormatting function of pluginStateTextFormatting when clearFormatting option is clicked', () => {
        const { editorView } = editor(doc(p('text')));
        clearformattingPluginSet[0].getState(editorView.state).formattingIsPresent = true;
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        clearformattingPluginSet[0].getState(editorView.state).clearFormatting = sinon.spy();
        const clearFormattingButton = toolbarOption.find(Item).at(4).childAt(0);
        clearFormattingButton.simulate('click');
        expect(clearformattingPluginSet[0].getState(editorView.state).clearFormatting.callCount).to.equal(1);
    });

    it('should be disabled if all code and strikethrough and clearformatting are disabled', () => {
        const { editorView } = editor(doc(p('text')));
        const pluginState = textFormattingPluginSet[0].getState(editorView.state);
        if (pluginState) {
            pluginState.codeDisabled = true;
            pluginState.strikeDisabled = true;
            pluginState.marksPresent = false;
        }
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        const toolbarButton = toolbarOption.find(ToolbarButton);
        expect(toolbarButton.prop('disabled')).to.be.true;
    });

    it('should be selected inside code', () => {
        const { editorView } = editor(doc(p(code('text'))));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        const toolbarButton = toolbarOption.find(ToolbarButton);
        expect(toolbarButton.prop('selected')).to.be.true;
    });

    it('should be selected inside strike', () => {
        const { editorView } = editor(doc(p(strike('text'))));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
            />
        );
        const toolbarButton = toolbarOption.find(ToolbarButton);
        expect(toolbarButton.prop('selected')).to.be.true;
    });
});
