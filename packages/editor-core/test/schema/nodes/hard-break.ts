import { expect } from 'chai';
import { Schema, doc, paragraph, text, hardBreak } from '../../../src';
import { toHTML, fromHTML } from '../../../src/test-helper';

const schema = makeSchema();

describe('ak-editor-core/schema hardBreak node', () => {
    it('serializes to <br>', () => {
        const html = toHTML(schema.nodes.hardBreak.create(), schema);
        expect(html).to.have.string('<br>');
    });

    it('matches <br>', () => {
        const doc = fromHTML('<br>', schema);
        const br = doc.firstChild!.firstChild!;
        expect(br.type.name).to.equal('hardBreak');
    });
});

function makeSchema () {
    const nodes = {doc, paragraph, hardBreak, text};
    const marks = {};
    return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}
