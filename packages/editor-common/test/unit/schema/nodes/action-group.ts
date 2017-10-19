import { name } from '../../../../package.json';
import { createSchema } from '../../../../src';
import { toHTML, fromHTML } from '../../../helpers';

const schema = makeSchema();

describe(`${name}/schema actionGroup node`, () => {
  it('serializes to <p> with proper data-attributes', () => {
    const html = toHTML(schema.nodes.actionGroup.create({ localId: 'cheese' }), schema);
    expect(html).toContain('<p');
    expect(html).toContain('data-action-group-local-id="cheese"');
  });

  it('matches <p data-action-group-local-id>', () => {
    const doc = fromHTML('<p data-action-group-local-id>', schema);
    const decisionList = doc.firstChild!;
    expect(decisionList.type.name).toEqual('actionGroup');
    expect(decisionList.attrs.localId).not.toEqual(undefined);
  });

  it('does not match <p>', () => {
    const doc = fromHTML('<p>', schema);
    const orderedList = doc.firstChild!;
    expect(orderedList.type.name).toEqual('paragraph');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'heading', 'text', 'decisionList', 'decisionItem', 'orderedList', 'bulletList', 'listItem', 'actionGroup', 'action']
  });
}
