import * as chai from 'chai';
import { expect } from 'chai';
import { mount, setProps } from 'enzyme';
import * as React from 'react';
import { ToolbarButton, ToolbarMedia } from '@atlaskit/editor-core';
import { chaiPlugin, storyMediaProviderFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import Editor from '../src';

chai.use(chaiPlugin);

describe('media', () => {
  const resolvedProvider = storyMediaProviderFactory();
  const rejectedProvider = Promise.reject(new Error('foo'));
  const noop = () => {};

  it('should show media icon if provider is set', async () => {
    const editor = mount(<Editor
      isExpandedByDefault
      mediaProvider={resolvedProvider}
      onCancel={noop}
      onSave={noop}
      onChange={noop}
    />);

    await resolvedProvider;
    expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(1);
  });

  it('should not show media icon if provider is not set', () => {
    const editor = mount(<Editor
      isExpandedByDefault
      onCancel={noop}
      onSave={noop}
      onChange={noop}
    />);

    expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(0);
  });

  it('should not show media icon if provider setting promise has been rejected', async () => {
    const rejectedProvider = Promise.reject(new Error('foo'));

    const editor = mount(<Editor
      isExpandedByDefault
      mediaProvider={rejectedProvider}
      onCancel={noop}
      onSave={noop}
      onChange={noop}
    />);

    await rejectedProvider.catch(noop);
    expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(0);
  });

  it('should hide media icon if provider setting promise has been updated to rejected', async () => {
    const editor = mount(<Editor
      isExpandedByDefault
      mediaProvider={resolvedProvider}
      onCancel={noop}
      onSave={noop}
      onChange={noop}
    />);

    // wait while the changes apply
    await resolvedProvider;

    editor.setProps({ mediaProvider: rejectedProvider });

    // wait while the changes apply
    await rejectedProvider.catch(noop);

    expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(0);
  });

  it('should show media icon if provider setting promise has been updated to resolved', async () => {
    const editor = mount(<Editor
      isExpandedByDefault
      mediaProvider={rejectedProvider}
      onCancel={noop}
      onSave={noop}
      onChange={noop}
    />);

    // wait while the changes apply
    await rejectedProvider.catch(noop);

    editor.setProps({ mediaProvider: resolvedProvider });

    // wait while the changes apply
    await resolvedProvider;

    expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(1);
  });
});
