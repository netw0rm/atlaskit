import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, doc, paragraph, text, mentionQuery } from '../../../src';
import { chaiPlugin, toHTML } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema mention-query mark', () => {
    it('serializes to <span data-mention-query="true">', () => {
        const schema = makeSchema();
        const node = schema.text('foo', [ schema.marks.mentionQuery.create() ] );
        expect(toHTML(node, schema)).to.have.string('data-mention-query="true"');
    });
});

function makeSchema () {
    const nodes = {doc, paragraph, text};
    const marks = {mentionQuery};
    return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}
