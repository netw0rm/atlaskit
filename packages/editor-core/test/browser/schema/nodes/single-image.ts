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
          data-display="inline-block"
        />
        `, schema);

      const singleImageNode = doc.firstChild!;

      expect(singleImageNode.type).to.equal(schema.nodes.singleImage);
      expect(singleImageNode.attrs.alignment).to.equal('left');
      expect(singleImageNode.attrs.display).to.equal('inline-block');
    });

    it('auto creates a media node inside single image node', () => {
      const doc = fromHTML(`
        <div
          data-node-type="singleImage"
          data-alignment="left"
          data-display="block"
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
        alignment: 'right',
        display: 'block'
      });

      const singleImageDom = toDOM(singleImageNode, schema).firstChild as HTMLElement;

      const { alignment, display, nodeType } = singleImageDom.dataset;

      expect(alignment).to.equal('right');
      expect(display).to.equal('block');
      expect(nodeType).to.equal('singleImage');
    });
  });

  it('encodes and decodes to the same node', () => {
    const { singleImage, media } = schema.nodes;
    const singleImageNode = singleImage.create({
      alignment: 'center',
      display: 'inline-block'
    }, media.create());

    const singleImageDom = toDOM(singleImageNode, schema).firstChild as HTMLElement;

    const parsedSingleImage = fromHTML(singleImageDom.outerHTML, schema).firstChild;

    expect(parsedSingleImage).to.deep.equal(singleImageNode);
  });
});
