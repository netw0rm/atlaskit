import { expect } from 'chai';
import { Schema, doc, paragraph, text, heading } from '../../../src';
import { fromHTML, toHTML } from '../../../test-helper';

const schema = makeSchema();

describe('ak-editor-core/schema heading node', () => {
  it('serializes to <h4>', () => {
    const html = toHTML(schema.nodes.heading.create({level: 4}), schema);
    expect(html).to.have.string('<h4>');
  });

  it('matches <h3>', () => {
    const doc = fromHTML('<h3>', schema);
    const h3 = doc.firstChild!;
    expect(h3.type.name).to.equal('heading');
  });
});

function makeSchema () {
  const nodes = {doc, paragraph, heading, text};
  const marks = {};
  return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}
