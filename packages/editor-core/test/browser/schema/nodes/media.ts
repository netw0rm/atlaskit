import { expect } from 'chai';
import { media } from '../../../../src';
import { fromHTML, toDOM } from '../../../../src/test-helper';
import { default as schema } from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema media node', () => {

  it('should parse html', () => {
    const doc = fromHTML('<div data-node-type="media" data-id="id" data-type="file" data-collection="collection"/>', schema);
    const mediaGroup = doc.firstChild!;
    const mediaNode = mediaGroup.firstChild!;

    expect(mediaNode.type.spec).to.equal(media);
    expect(mediaNode.attrs.id).to.equal('id');
    expect(mediaNode.attrs.type).to.equal('file');
    expect(mediaNode.attrs.collection).to.equal('collection');
  });

  it('should encode to html', () => {
    const mediaNode = schema.nodes.media.create({
      id: 'id',
      type: 'file',
      collection: 'collection'
    });

    const domNode = toDOM(mediaNode, schema).firstChild as HTMLElement;
    expect(domNode.dataset.id).to.equal('id');
    expect(domNode.dataset.type).to.equal('file');
    expect(domNode.dataset.collection).to.equal('collection');
  });

});
