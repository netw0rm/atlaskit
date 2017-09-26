import { expect } from 'chai';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import blockTypePlugins from '../../../src/plugins/block-type';
import tablePlugins from '../../../src/plugins/table';
import tableCommands from '../../../src/plugins/table/commands';
import mediaPlugins from '../../../src/plugins/media';
import mentionsPlugins from '../../../src/plugins/mentions';
import DropdownMenu from '../../../src/ui/DropdownMenu';
import ToolbarInsertBlock from '../../../src/ui/ToolbarInsertBlock';
import AkButton from '@atlaskit/button';
import { doc, p, makeEditor, code_block } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import { MediaProvider } from '@atlaskit/media-core';
import ProviderFactory from '../../../src/providerFactory';
import { analyticsService } from '../../../src/analytics';
import EditorWidth from '../../../src/utils/editor-width';
import ToolbarButton from '../../../src/ui/ToolbarButton';

const mediaProvider: Promise<MediaProvider> = Promise.resolve({
  viewContext: Promise.resolve({}),
  uploadContext: Promise.resolve({})
});

const providerFactory = new ProviderFactory();
providerFactory.setProvider('mediaProvider', mediaProvider);

describe('@atlaskit/editor-core/ui/ToolbarInsertBlock', () => {
  const blockTypePluginsSet = blockTypePlugins(defaultSchema);
  const tablePluginsSet = tablePlugins();
  const mediaPluginsSet = mediaPlugins(defaultSchema, { providerFactory });
  const mentionsPluginsSet = mentionsPlugins(defaultSchema, new ProviderFactory());
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: [...blockTypePluginsSet, ...tablePluginsSet, ...mediaPluginsSet, ...mentionsPluginsSet],
  });
  let trackEvent;
  beforeEach(() => {
    trackEvent = sinon.spy();
    analyticsService.trackEvent = trackEvent;
  });

  it('should render disabled ToolbarButtons if isDisabled property is true', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        tableSupported={true}
        tableHidden={false}
        editorView={editorView}
        availableWrapperBlockTypes={blockTypePluginsSet[0].getState(editorView.state).availableWrapperBlockTypes}
        isDisabled={true}
      />
    );
    expect(toolbarOption.find(ToolbarButton).length).to.equal(2);
    toolbarOption.find(ToolbarButton).forEach(btn => expect(btn!.prop('disabled')).to.equal(true));
    toolbarOption.unmount();
  });

  it('should return null if none of the plugins are present', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        editorView={editorView}
      />
    );
    expect(toolbarOption.html()).to.equal(null);
    toolbarOption.unmount();
  });

  it('should disable mention option if current selection is code block', () => {
    const { editorView } = editor(doc(code_block({ language: 'js' })('te{<>}xt')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        mentionsSupported={true}
        mentionsEnabled={true}
        editorView={editorView}
      />
    );
    expect(toolbarOption.find(ToolbarButton).prop('disabled')).to.equal(false);
    toolbarOption.unmount();
  });

  it('should have 1 child elements if mediaSupported and mediaUploadsEnabled is defined and equals true', async () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        mediaSupported={true}
        mediaUploadsEnabled={true}
        editorView={editorView}
      />
    );
    expect(toolbarOption.find(ToolbarButton).length).to.equal(1);
    toolbarOption.unmount();
  });

  it('should have spacing of toolbar button set to none if editorWidth is not defined', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        mediaSupported={true}
        mediaUploadsEnabled={true}
        editorView={editorView}
      />
    );
    expect(toolbarOption.find(ToolbarButton).first().prop('spacing')).to.equal('none');
    toolbarOption.unmount();
  });

  it('should have spacing of toolbar button set to none if editorWidth is less then breakpoint6', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        mediaSupported={true}
        mediaUploadsEnabled={true}
        editorView={editorView}
        editorWidth={EditorWidth.BreakPoint6 - 1}
      />
    );
    expect(toolbarOption.find(ToolbarButton).first().prop('spacing')).to.equal('none');
    toolbarOption.unmount();
  });

  it('should call onShowMediaPicker when media option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const funcSpy = sinon.spy();
    const toolbarOption = mount(
      <ToolbarInsertBlock
        mediaSupported={true}
        mediaUploadsEnabled={true}
        onShowMediaPicker={funcSpy}
        editorView={editorView}
        editorWidth={EditorWidth.BreakPoint6 + 1}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    const mediaButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Files and images') > 0)
      .find('Element');
    mediaButton.simulate('click');
    expect(funcSpy.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.media.button')).to.equal(true);
    toolbarOption.unmount();
  });

  it('should have spacing of toolbar button set to default if editorWidth is greater then breakpoint6', () => {
    const { editorView } = editor(doc(p('text')));
    const funcSpy = sinon.spy();
    const toolbarOption = mount(
      <ToolbarInsertBlock
        mediaSupported={true}
        mediaUploadsEnabled={true}
        onShowMediaPicker={funcSpy}
        editorView={editorView}
        editorWidth={EditorWidth.BreakPoint6 + 1}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    const mediaButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Files and images') > 0)
      .find('Element');
    mediaButton.simulate('click');
    expect(toolbarOption.find(ToolbarButton).first().prop('spacing')).to.equal('default');
    toolbarOption.unmount();
  });

  it('should trigger insertBlockType when Panel option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const pluginStateBlockType = blockTypePluginsSet[0].getState(editorView.state);
    const funcSpy = sinon.spy();

    const toolbarOption = mount(
      <ToolbarInsertBlock
        availableWrapperBlockTypes={pluginStateBlockType.availableWrapperBlockTypes}
        onInsertBlockType={funcSpy}
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
    expect(funcSpy.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.panel.button')).to.equal(true);
    toolbarOption.unmount();
  });

  it('should trigger insertBlockType when code block option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const pluginStateBlockType = blockTypePluginsSet[0].getState(editorView.state);
    const funcSpy = sinon.spy();

    const toolbarOption = mount(
      <ToolbarInsertBlock
        availableWrapperBlockTypes={pluginStateBlockType.availableWrapperBlockTypes}
        onInsertBlockType={funcSpy}
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
    expect(funcSpy.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.codeblock.button')).to.equal(true);
    toolbarOption.unmount();
  });

  it('should trigger insertBlockType when blockquote option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const pluginStateBlockType = blockTypePluginsSet[0].getState(editorView.state);
    const funcSpy = sinon.spy();

    const toolbarOption = mount(
      <ToolbarInsertBlock
        availableWrapperBlockTypes={pluginStateBlockType.availableWrapperBlockTypes}
        onInsertBlockType={funcSpy}
        editorView={editorView}
      />
    );
    toolbarOption.find(ToolbarButton).simulate('click');
    const blockquoteButton = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('Block quote') > 0)
      .find('Element');

    blockquoteButton.simulate('click');
    expect(funcSpy.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.blockquote.button')).to.equal(true);
    toolbarOption.unmount();
  });

  it('should track table creation event when table menu is clicked option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarInsertBlock
        tableSupported={true}
        tableHidden={false}
        editorView={editorView}
        editorWidth={EditorWidth.BreakPoint3 - 1}
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
    toolbarOption.unmount();
  });

  it('should trigger insertMacroFromMacroBrowser when "[...] View More" option is clicked', () => {
    const { editorView } = editor(doc(p('text')));
    const insertMacroFromMacroBrowser = sinon.spy();
    const macroProvider = {} as any;

    const toolbarOption = mount(
      <ToolbarInsertBlock
        macroProvider={macroProvider}
        onInsertMacroFromMacroBrowser={insertMacroFromMacroBrowser}
        editorView={editorView}
      />
    );

    toolbarOption.find(ToolbarButton).simulate('click');
    const button = toolbarOption
      .find('Item')
      .filterWhere(n => n.text().indexOf('View more') > -1)
      .find('Element');
    button.simulate('click');
    expect(insertMacroFromMacroBrowser.callCount).to.equal(1);
    expect(trackEvent.calledWith('atlassian.editor.format.macro.button')).to.equal(true);
    toolbarOption.unmount();
  });

  describe('Options in insert toolbar', () => {
    it('should have table option if tableSupported is true', () => {
      const { editorView } = editor(doc(p('text')));
      const toolbarOption = mount(
        <ToolbarInsertBlock
          tableSupported={true}
          tableHidden={false}
          editorView={editorView}
        />
      );
      expect(toolbarOption.find(AkButton).text()).to.equal('Insert table');
    });

    it('should have 3 child elements if availableWrapperBlockTypes is defined', () => {
      const { editorView } = editor(doc(p('text')));
      const pluginStateBlockType = blockTypePluginsSet[0].getState(editorView.state);
      const toolbarOption = mount(
        <ToolbarInsertBlock
          availableWrapperBlockTypes={pluginStateBlockType.availableWrapperBlockTypes}
          editorView={editorView}
        />
      );
      const items = toolbarOption.find(DropdownMenu).prop('items');
      expect((items[0] as any).items.length).to.equal(3);
      toolbarOption.unmount();
    });

    it('should have first ToolbarButton mention if the width greater then BreakPoint5', () => {
      const { editorView } = editor(doc(p('text')));
      const toolbarOption = mount(
        <ToolbarInsertBlock
          mentionsSupported={true}
          mentionsEnabled={true}
          editorView={editorView}
          editorWidth={EditorWidth.BreakPoint5 + 1}
        />
      );
      expect(toolbarOption.find(ToolbarButton).first().prop('title')).to.equal('Mention a person (@)');
      toolbarOption.unmount();
    });

    it('should have ToolbarButton media if the width greater then BreakPoint4', () => {
      const { editorView } = editor(doc(p('text')));
      const pluginStateMedia = mediaPluginsSet[0].getState(editorView.state);
      pluginStateMedia.allowsUploads = true;
      const toolbarOption = mount(
        <ToolbarInsertBlock
          mediaSupported={true}
          mediaUploadsEnabled={true}
          editorView={editorView}
          editorWidth={EditorWidth.BreakPoint4 + 1}
        />
      );
      expect(toolbarOption.find('ToolbarButton').first().prop('title')).to.equal('Insert files and images');
      toolbarOption.unmount();
    });

    it('should have mention option in dropdown if the width is greater then BreakPoint5', () => {
      const { editorView } = editor(doc(p('text')));
      const toolbarOption = mount(
        <ToolbarInsertBlock
          mentionsSupported={true}
          mentionsEnabled={true}
          editorView={editorView}
          editorWidth={EditorWidth.BreakPoint5 - 1}
        />
      );
      expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'][0].content).to.equal('Mention');
      toolbarOption.unmount();
    });

    it('should have media option in dropdown if the width is less then BreakPoint4', () => {
      const { editorView } = editor(doc(p('text')));
      const toolbarOption = mount(
        <ToolbarInsertBlock
          mediaSupported={true}
          mediaUploadsEnabled={true}
          editorView={editorView}
          editorWidth={EditorWidth.BreakPoint4 - 1}
        />
      );
      expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'][0].content).to.equal('Files and images');
      toolbarOption.unmount();
    });

    it('should have 1 child elements if pluginStateTable is defined and width is less then BreakPoint3', () => {
      const { editorView } = editor(doc(p('text')));
      const toolbarOption = mount(
        <ToolbarInsertBlock
          tableSupported={true}
          tableHidden={false}
          editorView={editorView}
          editorWidth={EditorWidth.BreakPoint3 - 1}
        />
      );
      expect(toolbarOption.find(DropdownMenu).prop('items')[0]['items'].length).to.equal(1);
      toolbarOption.unmount();
    });
  });
});
