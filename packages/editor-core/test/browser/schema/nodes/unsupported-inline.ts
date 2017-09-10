import { expect } from 'chai';
import { toDOM, fromHTML } from '../../../../src/test-helper';
import schema from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema unsupported-inline', () => {
  it('should parse unsupported inline nodes', () => {
    const doc = fromHTML('<div data-node-type="confluenceUnsupportedInline" data-confluence-unsupported="inline" data-confluence-unsupported-inline-cxhtml="foobar"/>', schema);
    const paragraph = doc.firstChild!;
    const unsupportedInlineNode = paragraph.firstChild!;

    expect(unsupportedInlineNode.type).to.equal(schema.nodes.confluenceUnsupportedInline);
    expect(unsupportedInlineNode.attrs.cxhtml).to.be.equal('foobar');
  });

  it('should encode unsupported inline nodes to html', () => {
    const unsupportedInlineNode = schema.nodes.confluenceUnsupportedInline.create({ cxhtml: 'foobar' });
    const domNode = toDOM(unsupportedInlineNode, schema).firstChild as HTMLElement;

    expect(domNode.dataset.confluenceUnsupported).to.be.equal('inline');
    expect(domNode.dataset.confluenceUnsupportedInlineCxhtml).to.be.equal('foobar');
  });
});
