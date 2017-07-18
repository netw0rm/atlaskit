import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { toHTML, fromHTML } from '../../../../src/test-helper';

const schema = makeSchema();

describe('@atlaskit/editor-core/schema decisionList node', () => {
  it('serializes to <ol> with proper data-attributes', () => {
    const html = toHTML(schema.nodes.decisionList.create(), schema);
    expect(html).to.have.string('<ol');
    expect(html).to.have.string('data-decision-list="true"');
  });

  it('matches <ol data-decision-list="true">', () => {
    const doc = fromHTML('<ol data-decision-list="true">', schema);
    const decisionList = doc.firstChild!;
    expect(decisionList.type.name).to.equal('decisionList');
  });

  it('does not match <ol>', () => {
    const doc = fromHTML('<ol>', schema);
    const orderedList = doc.firstChild!;
    expect(orderedList.type.name).to.equal('orderedList');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'decisionList', 'decisionItem', 'orderedList', 'listItem']
  });
}
