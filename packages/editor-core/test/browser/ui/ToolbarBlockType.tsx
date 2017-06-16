import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import blockTypePlugins from '../../../src/plugins/block-type';
import ToolbarBlockType from '../../../src/ui/ToolbarBlockType';
import AkButton from '@atlaskit/button';
import { doc, p, makeEditor, fixtures } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

describe('@atlaskit/editor-core/ui/ToolbarBlockType', () => {
    const fixture = fixtures();
    const blockTypePluginsSet = blockTypePlugins(defaultSchema);
    const editor = (doc: any) => makeEditor({
        doc,
        plugins: [...blockTypePluginsSet],
        place: fixture()
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
});
