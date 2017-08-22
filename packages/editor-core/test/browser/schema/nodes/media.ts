import { expect } from 'chai';
import { media } from '../../../../src';
import { toJSON } from '../../../../src/schema/nodes/media';
import { fromHTML, toDOM } from '../../../../src/test-helper';
import { default as schema } from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema media node', () => {

  it('should parse html', () => {
    const doc = fromHTML(`
    <div
      data-node-type="media"
      data-id="id"
      data-type="file"
      data-collection="collection"
      data-file-name="file.jpg"
      data-file-size="123456"
      data-file-mime-type="image/jpeg"
    />
    `, schema);
    const mediaGroup = doc.firstChild!;
    const mediaNode = mediaGroup.firstChild!;

    expect(mediaNode.type.spec).to.equal(media);
    expect(mediaNode.attrs.id).to.equal('id');
    expect(mediaNode.attrs.type).to.equal('file');
    expect(mediaNode.attrs.collection).to.equal('collection');
    expect(mediaNode.attrs.__fileName).to.equal('file.jpg');
    expect(mediaNode.attrs.__fileSize).to.equal(123456);
    expect(mediaNode.attrs.__fileMimeType).to.equal('image/jpeg');
    expect(mediaNode.attrs.__displayType).to.equal(null);
  });

  it('should parse html (with occurrenceKey)', () => {
    const doc = fromHTML(`
    <div
      data-node-type="media"
      data-id="id"
      data-type="file"
      data-collection="collection"
      data-occurrence-key="key"
    />
    `, schema);
    const mediaGroup = doc.firstChild!;
    const mediaNode = mediaGroup.firstChild!;

    expect(mediaNode.type.spec).to.equal(media);
    expect(mediaNode.attrs.id).to.equal('id');
    expect(mediaNode.attrs.type).to.equal('file');
    expect(mediaNode.attrs.collection).to.equal('collection');
    expect(mediaNode.attrs.occurrenceKey).to.equal('key');
  });

  it('should encode to html', () => {
    const mediaNode = schema.nodes.media.create({
      id: 'id',
      type: 'file',
      collection: 'collection',
      __fileName: 'file.jpg',
      __fileSize: 123456,
      __fileMimeType: 'image/jpeg',
      __displayType: 'thumbnail',
    });

    const domNode = toDOM(mediaNode, schema).firstChild as HTMLElement;
    const {
      id, type, collection, occurrenceKey, fileName, fileSize, fileMimeType, displayType
    } = domNode.dataset;
    expect(id).to.equal('id');
    expect(type).to.equal('file');
    expect(collection).to.equal('collection');
    expect(occurrenceKey).to.equal(undefined);
    expect(fileName).to.equal('file.jpg');
    expect(fileSize).to.equal('123456');
    expect(fileMimeType).to.equal('image/jpeg');
    expect(displayType).to.equal('thumbnail');
  });

  it('should encode to html (with occurrenceKey)', () => {
    const mediaNode = schema.nodes.media.create({
      id: 'id',
      type: 'file',
      collection: 'collection',
      occurrenceKey: 'key',
    });

    const domNode = toDOM(mediaNode, schema).firstChild as HTMLElement;
    const {
      id, type, collection, occurrenceKey
    } = domNode.dataset;
    expect(id).to.equal('id');
    expect(type).to.equal('file');
    expect(collection).to.equal('collection');
    expect(occurrenceKey).to.equal('key');
  });

  it('should strip optional attrs during JSON serialization', () => {
    const mediaNode = schema.nodes.media.create({
      id: 'id',
      type: 'file',
      collection: 'collection',
      __fileName: 'file.jpg',
      __fileSize: 123456,
      __fileMimeType: 'image/jpeg',
      __displayType: 'thumbnail',
    });

    expect(toJSON(mediaNode)).to.deep.equal({
      attrs: {
        collection: 'collection',
        id: 'id',
        type: 'file',
      }
    });
  });

  it('should serialize occurrenceKey when available', () => {
    const mediaNode = schema.nodes.media.create({
      id: 'id',
      type: 'file',
      collection: 'collection',
      occurrenceKey: 'key',
    });

    expect(toJSON(mediaNode)).to.deep.equal({
      attrs: {
        collection: 'collection',
        id: 'id',
        type: 'file',
        occurrenceKey: 'key',
      }
    });
  });

});
