import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import imageUploadPlugins from '../../../src/plugins/image-upload';
import ToolbarImage from '../../../src/ui/ToolbarImage';
import { doc, code_block, p, makeEditor, fixtures } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

describe('ToolbarImage', () => {

  const fixture = fixtures();
  const editor = (doc: any) => {
    const ed = makeEditor({
      doc,
      plugins: imageUploadPlugins(defaultSchema),
      place: fixture()
    });

    afterEach(() => {
      ed.editorView.destroy();
    });

    return ed;
  };

  context('when plugin is enabled', () => {
    it('sets disabled to false', () => {
      const { editorView, pluginState } = editor(doc(p('text')));
      const toolbarImage = mount(<ToolbarImage pluginState={pluginState} editorView={editorView} />);

      expect(toolbarImage.state('disabled')).to.equal(false);
    });
  });

  context('when plugin is not enabled', () => {
    it('sets disabled to true', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));
      const toolbarImage = mount(<ToolbarImage pluginState={pluginState} editorView={editorView} />);

      expect(toolbarImage.state('disabled')).to.equal(true);
    });
  });
});
