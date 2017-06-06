import { expect } from 'chai';
import customNodeSerializers from '../../../../../src/renderer/text/nodes';
import MediaSerializer from '../../../../../src/renderer/text/nodes/media';
import { media } from '../../../../../src/test-helper';

describe('Renderer - TextSerializer - Nodes', () => {
  it('should render media', () => {
    const node = media({
      id: 'foo',
      type: 'file',
      collection: 'bar',
    });

    const nodeSerializer = new MediaSerializer(node, customNodeSerializers);
    expect(nodeSerializer.serialize()).to.equal('media attachment (foo in collection bar)');
  });
});
