import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { toHTML, fromHTML } from '../../../../src/test-helper';

const schema = makeSchema();

describe('@atlaskit/editor-core/schema decisionItem node', () => {
  it('serializes to <li> with proper data-attributes', () => {
    const html = toHTML(schema.nodes.decisionItem.create(), schema);
    expect(html).to.have.string('<li');
    expect(html).to.have.string('data-decision-local-id');
    expect(html).to.have.string('data-decision-state');
  });

  it('matches <li data-decision-local-id>', () => {
    const doc = fromHTML('<li  data-decision-local-id>', schema);
    const decisionItem = doc.firstChild!.firstChild!;
    expect(decisionItem.type.name).to.equal('decisionItem');
  });

  it('does not match <li>', () => {
    const doc = fromHTML('<li>', schema);
    const listItem = doc.firstChild!.firstChild!;
    expect(listItem.type.name).to.equal('listItem');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'heading', 'text', 'decisionList', 'decisionItem', 'orderedList', 'bulletList', 'listItem']
  });
}
