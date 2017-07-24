import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { toHTML, fromHTML } from '../../../../src/test-helper';

const schema = makeSchema();

describe('@atlaskit/editor-core/schema decisionList node', () => {
  it('serializes to <ol> with proper data-attributes', () => {
    const html = toHTML(schema.nodes.decisionList.create({ localId: 'cheese' }), schema);
    expect(html).to.have.string('<ol');
    expect(html).to.have.string('data-decision-list-local-id="cheese"');
  });

  it('matches <ol data-decision-list-local-id>', () => {
    const doc = fromHTML('<ol data-decision-list-local-id>', schema);
    const decisionList = doc.firstChild!;
    expect(decisionList.type.name).to.equal('decisionList');
    expect(decisionList.attrs.localId).to.not.equal(undefined);
  });

  it('does not match <ol>', () => {
    const doc = fromHTML('<ol>', schema);
    const orderedList = doc.firstChild!;
    expect(orderedList.type.name).to.equal('orderedList');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'heading', 'text', 'decisionList', 'decisionItem', 'orderedList', 'bulletList', 'listItem']
  });
}
