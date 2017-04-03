import { expect } from 'chai';
import { Schema, doc, paragraph, text, emoji } from '../../../src';
import { fromHTML as fromHTML_, toHTML } from '../../../src/test-helper';

const schema = makeSchema();
const fromHTML = (html: string) => fromHTML_(html, schema);

describe.skip('@atlaskit/editor-core/schema emoji node', () => {
    it('should have emoji id when serializing to DOM', () => {
        const html = toHTML(schema.nodes.emoji.create({ id: '123' }), schema);
        expect(html).to.have.string('data-emoji-id="123"');
        expect(html).to.have.string('contenteditable="false"');
    });

    it('should extract the correct values of emoji id', () => {
        const doc = fromHTML('<span data-emoji-id=\'123\'></span>');
        const emoji = doc.firstChild!.firstChild!;

        expect(emoji.type.name).to.equal('emoji');
        expect(emoji.attrs.id).to.equal('123');
    });
});

function makeSchema () {
    const nodes = {doc, paragraph, emoji, text};
    const marks = {};
    return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}
