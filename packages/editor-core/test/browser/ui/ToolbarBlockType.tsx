import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import blockTypePlugins from '../../../src/plugins/block-type';
import ToolbarBlockType from '../../../src/ui/ToolbarBlockType';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import AkButton from '@atlaskit/button';
import TextColorIcon from '@atlaskit/icon/glyph/editor/text-color';
import { doc, p, makeEditor, code_block, blockquote, panel } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import { analyticsService } from '../../../src/analytics';
import EditorWidth from '../../../src/utils/editor-width';

describe('@atlaskit/editor-core/ui/ToolbarBlockType', () => {
  const blockTypePluginsSet = blockTypePlugins(defaultSchema);
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: [...blockTypePluginsSet],
  });

  it('should render disabled ToolbarButton if isDisabled property is true', () => {
      const { editorView } = editor(doc(p('text')));
      const toolbarOption = mount(
        <ToolbarBlockType
          pluginState={blockTypePluginsSet[0].getState(editorView.state)}
          editorView={editorView}
          isDisabled={true}
        />
      );
      expect(toolbarOption.find(AkButton).prop('isDisabled')).to.equal(true);
      toolbarOption.unmount();
  });

  it('should render disabled ToolbarButton if current selection is blockquote', () => {
      const { editorView } = editor(doc(blockquote('te{<>}xt')));
      const toolbarOption = mount(
        <ToolbarBlockType
          pluginState={blockTypePluginsSet[0].getState(editorView.state)}
          editorView={editorView}
          isDisabled={true}
        />
      );
      expect(toolbarOption.find(AkButton).prop('isDisabled')).to.equal(true);
      toolbarOption.unmount();
  });

  it('should have spacing of toolbar button set to none if editorWidth is less then breakpoint6', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
      />
    );
    expect(toolbarOption.find(ToolbarButton).prop('spacing')).to.equal('none');
    toolbarOption.unmount();
  });

  it('should have spacing of toolbar button set to default if editorWidth is greater then breakpoint6', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        editorWidth={EditorWidth.BreakPoint6 + 1}
      />
    );
    expect(toolbarOption.find(ToolbarButton).prop('spacing')).to.equal('default');
    toolbarOption.unmount();
  });

  it('should render icon in dropdown-menu if editorWidth is less then BreakPoint1', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        editorWidth={EditorWidth.BreakPoint1 - 1}
      />
    );
    expect(toolbarOption.find(ToolbarButton).find(TextColorIcon).length).to.equal(1);
    toolbarOption.unmount();
  });

  it('should render current block type in dropdown-menu if editorWidth is greater then BreakPoint1', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mount(
      <ToolbarBlockType
        pluginState={blockTypePluginsSet[0].getState(editorView.state)}
        editorView={editorView}
        editorWidth={EditorWidth.BreakPoint1 + 1}
      />
    );
    expect(toolbarOption.find(ToolbarButton).first().text().indexOf('Normal text') >=0 ).to.equal(true);
    toolbarOption.unmount();
  });

  it('should not render disabled ToolbarButton if current selection is panel', () => {
      const { editorView } = editor(doc(panel(p('te{<>}xt'))));
      const toolbarOption = mount(
        <ToolbarBlockType
          pluginState={blockTypePluginsSet[0].getState(editorView.state)}
          editorView={editorView}
        />
      );
      expect(toolbarOption.find(AkButton).prop('isDisabled')).to.equal(false);
      toolbarOption.unmount();
  });

  it('should render disabled ToolbarButton if code-block is selected', () => {
      const { editorView } = editor(doc(code_block({ language: 'js' })('te{<>}xt')));
      const toolbarOption = mount(
        <ToolbarBlockType
          pluginState={blockTypePluginsSet[0].getState(editorView.state)}
          editorView={editorView}
          isDisabled={true}
        />
      );
      expect(toolbarOption.find(AkButton).prop('isDisabled')).to.equal(true);
      toolbarOption.unmount();
  });

  describe('analytics', () => {
    let trackEvent;
    let toolbarOption;
    beforeEach(() => {
      const { editorView } = editor(doc(p('text')));
      toolbarOption = mount(
        <ToolbarBlockType
          pluginState={blockTypePluginsSet[0].getState(editorView.state)}
          editorView={editorView}
        />
      );
      toolbarOption.find(ToolbarButton).simulate('click');
      trackEvent = sinon.spy();
      analyticsService.trackEvent = trackEvent;
    });

    afterEach(() => {
      toolbarOption.unmount();
    });

    [
      { value: 'normal', name: 'Normal text' },
      { value: 'heading1', name: 'Heading 1' },
      { value: 'heading2', name: 'Heading 2' },
      { value: 'heading3', name: 'Heading 3' },
      { value: 'heading4', name: 'Heading 4' },
      { value: 'heading5', name: 'Heading 5' },
    ].forEach(blockType => {
      it(`should trigger analyticsService.trackEvent when ${blockType.name} is clicked`, () => {
          toolbarOption.find('Item')
            .filterWhere(n => n.text() === blockType.name)
            .find('Element')
            .simulate('click');
          expect(trackEvent.calledWith(`atlassian.editor.format.${blockType.value}.button`)).to.equal(true);
        });
    });
  });
});
