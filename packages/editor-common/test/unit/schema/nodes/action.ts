import { name } from '../../../../package.json';
import { createSchema } from '../../../../src';
import { toHTML, fromHTML } from '../../../helpers';

const schema = makeSchema();

describe(`${name}/schema action node`, () => {
  it('serializes to <button> with proper data-attributes', () => {
    const action = {
      text: 'test',
      target: {
        app: 'app',
        key: 'key'
      }
    };
    const html = toHTML(schema.nodes.action.create(action), schema);
    expect(html).toContain('<button');
    expect(html).toContain('data-action-local-id');
    expect(html).toContain('data-action-text');
    expect(html).toContain('data-action-target-app');
    expect(html).toContain('data-action-target-key');
  });

  it('matches <button data-action-local-id>', () => {
    const doc = fromHTML('<button data-action-local-id>', schema);
    const decisionItem = doc.firstChild!.firstChild!;
    expect(decisionItem.type.name).toEqual('action');
  });

  it('does not match <button>', () => {
    const doc = fromHTML('<button>', schema);
    const listItem = doc.firstChild!.firstChild!;
    expect(listItem).toEqual(null);
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'heading', 'text', 'decisionList', 'decisionItem', 'orderedList', 'bulletList', 'listItem', 'actionGroup', 'action']
  });
}
