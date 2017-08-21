import { expect } from 'chai';
import { fromHTML, toDOM } from '../../../../src/test-helper';
import { default as schema } from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema media node', () => {
  describe('parse html', () => {
    it('gets attributes from html', () => {
      const doc = fromHTML(`
        <div
          data-node-type="mediaGroup"
        />
        `, schema);

      const mediaGroupNode = doc.firstChild!;

      expect(mediaGroupNode.type).to.equal(schema.nodes.mediaGroup);
    });

    it('auto creates a media node inside single image node', () => {
      const doc = fromHTML(`
        <div
          data-node-type="mediaGroup"
        />
        `, schema);

      const mediaGroupNode = doc.firstChild!;

      expect(mediaGroupNode.childCount).to.equal(1);
      expect(mediaGroupNode.child(0)).to.deep.equal(schema.nodes.media.create());
    });
  });

  describe('encode node', () => {
    it('converts attributes to related data attribute in html', () => {
      const mediaGroupNode = schema.nodes.mediaGroup.create();

      const mediaGroupDom = toDOM(mediaGroupNode, schema).firstChild as HTMLElement;

      const { nodeType } = mediaGroupDom.dataset;

      expect(nodeType).to.equal('mediaGroup');
    });
  });

  it('encodes and decodes to the same node', () => {
    const { mediaGroup, media } = schema.nodes;
    const mediaGroupNode = mediaGroup.create({}, media.create());

    const mediaGroupDom = toDOM(mediaGroupNode, schema).firstChild as HTMLElement;

    const parsedMediaGroup = fromHTML(mediaGroupDom.outerHTML, schema).firstChild;

    expect(parsedMediaGroup).to.deep.equal(mediaGroupNode);
  });
});
