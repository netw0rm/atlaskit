import { expect } from 'chai';
import nodeToText from '../../../../../src/renderer/text/nodes/media';
import { media } from '../../../../../src/test-helper';

describe('Renderer - TextSerializer - Nodes', () => {
  it('should render media', () => {
    const node = media({
      id: 'foo',
      type: 'file',
      collection: 'bar',
    });

    expect(nodeToText(node)).to.equal('media attachment (foo in collection bar)');
  });
});
