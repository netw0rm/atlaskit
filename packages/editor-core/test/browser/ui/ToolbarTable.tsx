import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import tablePlugins from '../../../src/plugins/table';
import ToolbarTable from '../../../src/ui/ToolbarTable';
import AkButton from '@atlaskit/button';
import { doc, p, makeEditor, fixtures } from '../../../src/test-helper';

describe('@atlaskit/editor-core/ui/ToolbarTable', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: [...tablePlugins()],
    place: fixture()
  });

  it('should render disabled ToolbarButton if isDisabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTable = mount(
      <ToolbarTable
        pluginState={pluginState}
        editorView={editorView}
        disabled={true}
      />
    );
    expect(toolbarTable.find(AkButton).prop('isDisabled')).to.equal(true);
  });
});
