import { expect } from 'chai';
import { fromHTML, toDOM } from '../../../../src/test-helper';
import { default as schema } from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema media node', () => {
  describe('parse html', () => {
    it('gets attributes from html', () => {
      const doc = fromHTML(`
        <div
          data-node-type="singleImage"
          data-alignment="left"
        />
        `, schema);

      const singleImageNode = doc.firstChild!;

      expect(singleImageNode.type).to.equal(schema.nodes.singleImage);
      expect(singleImageNode.attrs.alignment).to.equal('left');
    });

    it('auto creates a media node inside single image node', () => {
      const doc = fromHTML(`
        <div
          data-node-type="singleImage"
          data-alignment="left"
        />
        `, schema);

      const singleImageNode = doc.firstChild!;

      expect(singleImageNode.childCount).to.equal(1);
      expect(singleImageNode.child(0)).to.deep.equal(schema.nodes.media.create());
    });
  });

  describe('encode node', () => {
    it('converts attributes to related data attribute in html', () => {
      const singleImageNode = schema.nodes.singleImage.create({
        alignment: 'right'
      });

      const singleImageDom = toDOM(singleImageNode, schema).firstChild as HTMLElement;

      const { alignment, nodeType } = singleImageDom.dataset;

      expect(alignment).to.equal('right');
      expect(nodeType).to.equal('singleImage');
    });
  });

  it('encodes and decodes to the same node', () => {
    const { singleImage, media } = schema.nodes;
    const singleImageNode = singleImage.create({
      alignment: 'center'
    }, media.create());

    const singleImageDom = toDOM(singleImageNode, schema).firstChild as HTMLElement;

    const parsedSingleImage = fromHTML(singleImageDom.outerHTML, schema).firstChild;

    expect(parsedSingleImage).to.deep.equal(singleImageNode);
  });
});
