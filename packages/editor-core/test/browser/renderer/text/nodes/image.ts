import { expect } from 'chai';
import ImageSerializer from '../../../../../src/renderer/text/nodes/image';
import customNodeSerializers from '../../../../../src/renderer/text/nodes';
import { img } from '../../../../../src/test-helper';

describe('Renderer - TextSerializer - Nodes', () => {
  describe('Image', () => {
    it('should render image alt as main text', () => {
      const node = img({ src: 'https://www.atlassian.com/image.png', alt: 'foo' });
      const nodeSerializer = new ImageSerializer(node, customNodeSerializers);
      expect(nodeSerializer.serialize()).to.equal('image (foo)');
    });

    it('should render image source if alt is absent', () => {
      const node = img({ src: 'https://www.atlassian.com/image.png' });
      const nodeSerializer = new ImageSerializer(node, customNodeSerializers);
      expect(nodeSerializer.serialize()).to.equal('image (https://www.atlassian.com/image.png)');
    });

    it('should just render "image" if both source and alt are nullable', () => {
      const node = img({ src: '', alt: '' });
      const nodeSerializer = new ImageSerializer(node, customNodeSerializers);
      expect(nodeSerializer.serialize()).to.equal('image');
    });
  });
});
