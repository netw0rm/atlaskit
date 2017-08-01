import { expect } from 'chai';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import blockTypePlugins from '../../../src/plugins/block-type';
import tablePlugins from '../../../src/plugins/table';
import tableCommands from '../../../src/plugins/table/commands';
import mediaPlugins from '../../../src/plugins/media';
import DropdownMenu from '@atlaskit/dropdown-menu';
import ToolbarInsertBlock from '../../../src/ui/ToolbarInsertBlock';
import AkButton from '@atlaskit/button';
import { doc, p, makeEditor, code_block } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import { MediaProvider } from '@atlaskit/media-core';
import ProviderFactory from '../../../src/providerFactory';
import { analyticsService } from '../../../src/analytics';

const mediaProvider: Promise<MediaProvider> = Promise.resolve({
  viewContext: Promise.resolve({})
});

const providerFactory = new ProviderFactory();
providerFactory.setProvider('mediaProvider', mediaProvider);

describe('@atlaskit/editor-core/ui/ToolbarInsertBlock', () => {
  const blockTypePluginsSet = blockTypePlugins(defaultSchema);
  const tablePluginsSet = tablePlugins();
  const mediaPluginsSet = mediaPlugins(defaultSchema, { providerFactory });
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: [...blockTypePluginsSet, ...tablePluginsSet, ...mediaPluginsSet],
  });
  let trackEvent;
  beforeEach(() => {
    trackEvent = sinon.spy();
    analyticsService.trackEvent = trackEvent;
  });

  it('should render disabled ToolbarButton if isDisabled property is true', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateBlockType={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        isDisabled={true}
      />
    );
    expect(toolbarOption.find(AkButton).prop('isDisabled')).to.equal(true);
  });

  it('should not render if none of the plugins are present', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        editorView={editorView}
      />
    );
    expect(toolbarOption.html()).to.equal(null);
  });

  it('should have 3 child elements if both pluginStateBlockType is defined', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateBlockType={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'].length).to.equal(3);
  });

  it('should have 1 child elements if both pluginStateTable is defined', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateTable={tablePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'].length).to.equal(1);
  });

  it('should have 1 child elements if both pluginStateMedia is defined', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateMedia={mediaPluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'].length).to.equal(1);
  });

  it('should trigger showMediaPicker of pluginStateMedia when File and Images option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateMedia={mediaPluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    mediaPluginsSet[0].getState(editorView.state).showMediaPicker = sinon.spy();
    const mediaButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Files and images') > 0)
      .find('Element');
    mediaButton.simulate('click');
    expect(mediaPluginsSet[0].getState(editorView.state).showMediaPicker.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.media.button')).to.equal(true);
  });

  it('should trigger insertBlockType of pluginStateBlockType when Panel option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateBlockType={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    blockTypePluginsSet[0].getState(editorView.state).insertBlockType = sinon.spy();
    const panelButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Panel') > 0)
      .find('Element');
    panelButton.simulate('click');
    expect(blockTypePluginsSet[0].getState(editorView.state).insertBlockType.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.panel.button')).to.equal(true);
  });

  it('should trigger insertBlockType of pluginStateBlockType when code block option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateBlockType={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    blockTypePluginsSet[0].getState(editorView.state).insertBlockType = sinon.spy();
    const codeblockButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Code block') > 0)
      .find('Element');
    codeblockButton.simulate('click');
    expect(blockTypePluginsSet[0].getState(editorView.state).insertBlockType.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.codeblock.button')).to.equal(true);
  });

  it('should trigger insertBlockType of pluginStateBlockType when blockquote option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateBlockType={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    blockTypePluginsSet[0].getState(editorView.state).insertBlockType = sinon.spy();
    const blockquoteButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Block quote') > 0)
      .find('Element');
    blockquoteButton.simulate('click');
    expect(blockTypePluginsSet[0].getState(editorView.state).insertBlockType.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.blockquote.button')).to.equal(true);
  });

  it('should track table creation event when table menu is clicked option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateTable={tablePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    const funcSpy = sinon.spy();
    tableCommands.createTable = () => funcSpy;
    const tableButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Table') > 0)
      .find('Element');
    tableButton.simulate('click');
    expect(funcSpy.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.table.button')).to.equal(true);
  });

  it('should disable table option if currently selected block is code', () => {
    const { editorView } = editor(doc(code_block({ language: 'js' })('te{<>}xt')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateTable={tablePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    const tableButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Table') > 0)
      .find('Element');
    expect(tableButton.prop('isDisabled')).to.equal(true);
  });

  it('should disable Panel option if currently selected block is code', () => {
    const { editorView } = editor(doc(code_block({ language: 'js' })('te{<>}xt')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        pluginStateBlockType={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    const panelButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Panel') > 0)
      .find('Element');
    expect(panelButton.prop('isDisabled')).to.equal(true);
  });
});
