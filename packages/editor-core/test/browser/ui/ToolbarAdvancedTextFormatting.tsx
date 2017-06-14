import { expect } from 'chai';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';
import textFormattingPlugins from '../../../src/plugins/text-formatting';
import clearFormattingPlugins from '../../../src/plugins/clear-formatting';
import ToolbarAdvancedTextFormatting from '../../../src/ui/ToolbarAdvancedTextFormatting';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import { doc, p, code, strike, makeEditor, fixtures } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

const noop = () => {};

describe('@atlaskit/editor-core/ui/ToolbarAdvancedTextFormatting', () => {
    const fixture = fixtures();
    const textFormattingPluginSet = textFormattingPlugins(defaultSchema);
    const clearformattingPluginSet = clearFormattingPlugins(defaultSchema);
    const editor = (doc: any) => makeEditor({
        doc,
        plugins: [...textFormattingPluginSet, ...clearformattingPluginSet],
        place: fixture()
    });

    it('should render disabled ToolbarButton if both pluginStateTextFormatting and pluginStateClearFormatting are undefined', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
          <ToolbarAdvancedTextFormatting editorView={editorView} focusEditor={noop} softBlurEditor={noop} />
        );

        expect(toolbarOption.find(ToolbarButton).prop('disabled')).to.equal(true);
    });

    it('should have 5 child elements if both pluginStateTextFormatting and pluginStateClearFormatting are defined', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'].length).to.equal(5);
    });

    it('should return only 4 items if only pluginStateTextFormatting is defined', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'].length).to.equal(4);
    });

    it('should return only 1 items if only pluginStateClearFormatting is defined', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'].length).to.equal(1);
    });

    it('should render disabled toolbar button when all code and strikethrough and clearformatting are disabled', () => {
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
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        expect(toolbarOption.find(ToolbarButton).prop('disabled')).to.equal(true);
    });

    it('should trigger toggleCode of pluginStateTextFormatting when code option is clicked', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        textFormattingPluginSet[0].getState(editorView.state).toggleCode = sinon.spy();
        const codeButton = toolbarOption
            .find('Item')
            .filterWhere(n => n.text() === 'Code')
            .find('Element');
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
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        textFormattingPluginSet[0].getState(editorView.state).toggleStrike = sinon.spy();
        const strikeButton = toolbarOption
            .find('Item')
            .filterWhere(n => n.text() === 'Strikethrough')
            .find('Element');
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
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        toolbarOption.setState({ codeHidden: true });
        toolbarOption.find(ToolbarButton).simulate('click');
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
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        toolbarOption.setState({ strikeHidden: true });
        toolbarOption.find(ToolbarButton).simulate('click');
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
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        toolbarOption.find(ToolbarButton).simulate('click');
        clearformattingPluginSet[0].getState(editorView.state).clearFormatting = sinon.spy();
        const clearFormattingButton = toolbarOption
          .find('Item')
          .filterWhere(n => n.text() === 'Clear Formatting')
          .find('Element');
        clearFormattingButton.simulate('click');
        expect(clearformattingPluginSet[0].getState(editorView.state).clearFormatting.callCount).to.equal(1);
    });

    it('should render disabled ToolbarButton if isDisabled property is true', () => {
        const { editorView } = editor(doc(p('text')));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
                focusEditor={noop}
                softBlurEditor={noop}
                isDisabled={true}
            />
        );
        expect(toolbarOption.find(ToolbarButton).prop('disabled')).to.equal(true);
    });

    it('should render disabled ToolbarButton if all code and strikethrough and clearformatting are disabled', () => {
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
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        expect(toolbarOption.find(ToolbarButton).prop('disabled')).to.equal(true);
    });

    it('should be selected after convertion to code', () => {
        const { editorView } = editor(doc(p(code('text'))));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        const toolbarButton = toolbarOption.find(ToolbarButton);
        expect(toolbarButton.prop('selected')).to.equal(true);
    });

    it('should be selected inside strike', () => {
        const { editorView } = editor(doc(p(strike('text'))));
        const toolbarOption = mount(
            <ToolbarAdvancedTextFormatting
                pluginStateTextFormatting={textFormattingPluginSet[0].getState(editorView.state)}
                pluginStateClearFormatting={clearformattingPluginSet[0].getState(editorView.state)}
                editorView={editorView}
                focusEditor={noop}
                softBlurEditor={noop}
            />
        );
        const toolbarButton = toolbarOption.find(ToolbarButton);
        expect(toolbarButton.prop('selected')).to.equal(true);
    });
});
