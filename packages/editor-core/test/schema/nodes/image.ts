import { expect } from 'chai';
import { Schema, doc, paragraph, text, image } from '../../../src';
import { fromHTML, toHTML } from '../../../src/test-helper';

const schema = makeSchema();
const src = 'http://test.com';

describe('ak-editor-core/schema image node', () => {
    it('serializes to <img>', () => {
        const html = toHTML(schema.nodes.image.create({src}), schema);
        expect(html).to.have.string(`<img src="${src}">`);
    });

    it('matches <img src="...">', () => {
        const doc = fromHTML(`<img src="${src}" />`, schema);
        const img = doc.firstChild!.firstChild!;
        expect(img.type.name).to.equal('image');
    });
});

function makeSchema () {
    const nodes = {doc, paragraph, image, text};
    const marks = {};
    return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}
