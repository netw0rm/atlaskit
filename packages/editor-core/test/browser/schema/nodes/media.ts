import { expect } from 'chai';
import { media } from '../../../../src';
import { fromHTML, toDOM } from '../../../../src/test-helper';
import { default as schema } from '../../../../src/test-helper/schema';
import { MediaNode } from '../../../../src/plugins';

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
    }) as MediaNode;
    mediaNode.fileName = 'file.jpg';
    mediaNode.fileSize = 123456;
    mediaNode.fileMimeType = 'image/jpeg';

    const domNode = toDOM(mediaNode, schema).firstChild as HTMLElement;
    expect(domNode.dataset.id).to.equal('id');
    expect(domNode.dataset.type).to.equal('file');
    expect(domNode.dataset.collection).to.equal('collection');
    expect(domNode.hasAttribute('file-name')).to.equal(true);
    expect(domNode.hasAttribute('file-size')).to.equal(true);
    expect(domNode.hasAttribute('file-mime-type')).to.equal(true);
    expect(domNode.attributes['file-name'].value).to.equal('file.jpg');
    expect(domNode.attributes['file-size'].value).to.equal('123456');
    expect(domNode.attributes['file-mime-type'].value).to.equal('image/jpeg');
  });

});
