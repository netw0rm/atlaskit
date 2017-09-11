import { expect } from 'chai';
import { toDOM, fromHTML } from '../../../../src/test-helper';
import schema from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema unsupported-block', () => {
  it('should parse unsupported block nodes', () => {
    const doc = fromHTML('<div data-node-type="confluenceUnsupportedBlock" data-confluence-unsupported="block" data-confluence-unsupported-block-cxhtml="foobar"/>', schema);
    const unsupportedBlockNode = doc.firstChild!;
    expect(unsupportedBlockNode.type).to.equal(schema.nodes.confluenceUnsupportedBlock);
    expect(unsupportedBlockNode.attrs.cxhtml).to.be.equal('foobar');
  });

  it('should encode unsupported block nodes to html', () => {
    const unsupportedBlockNode = schema.nodes.confluenceUnsupportedBlock.create({ cxhtml: 'foobar' });
    const domNode = toDOM(unsupportedBlockNode, schema).firstChild as HTMLElement;

    expect(domNode.dataset.confluenceUnsupported).to.be.equal('block');
    expect(domNode.dataset.confluenceUnsupportedBlockCxhtml).to.be.equal('foobar');
  });
});
