import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import ImageUploadPlugin from '../../src/plugins/image-upload';
import ToolbarImage from '../../src/ui/ToolbarImage';
import { makeEditor } from '../../src/test-helper';
import { code_block, doc, images, schema } from '../_schema-builder';

describe('ToolbarImage', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: ImageUploadPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  context('when plugin is enabled', () => {
    it('sets disabled to false', () => {
      const { plugin } = editor(doc(images('text')));
      const toolbarImage = mount(<ToolbarImage pluginState={plugin} />);

      expect(toolbarImage.state('disabled')).to.be.false;
      toolbarImage.unmount();
    });
  });

  context('when plugin is not enabled', () => {
    it('sets disabled to true', () => {
      const { plugin } = editor(doc(code_block()('text')));
      const toolbarImage = mount(<ToolbarImage pluginState={plugin} />);

      expect(toolbarImage.state('disabled')).to.be.true;
      toolbarImage.unmount();
    });
  });
});
