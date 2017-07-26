import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import blockTypePlugins from '../../../src/plugins/block-type';
import ToolbarBlockType from '../../../src/ui/ToolbarBlockType';
import AkButton from '@atlaskit/button';
import { doc, p, makeEditor, code_block } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

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
    });

    it('should not blur editor when block type toolbar is opened', () => {
      const { editorView } = editor(doc(p('text')));
      editorView.focus();
      const toolbarBlockType = mount(
        <ToolbarBlockType
          pluginState={blockTypePluginsSet[0].getState(editorView.state)}
          editorView={editorView}
        />
      );
      toolbarBlockType.find('AkButton').simulate('click');
      expect(editorView.hasFocus()).to.equal(true);
      expect(toolbarBlockType.state('active')).to.equal(true);
    });
});
