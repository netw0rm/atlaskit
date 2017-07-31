import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { toHTML, fromHTML } from '../../../../src/test-helper';

const schema = makeSchema();

describe('@atlaskit/editor-core/schema taskItem node', () => {
  it('serializes to <li> with proper data-attributes', () => {
    const html = toHTML(schema.nodes.taskItem.create(), schema);
    expect(html).to.have.string('<li');
    expect(html).to.have.string('data-task-local-id');
    expect(html).to.have.string('data-task-state');
  });

  it('matches <li data-task-local-id>', () => {
    const doc = fromHTML('<li data-task-local-id>', schema);
    const taskItem = doc.firstChild!.firstChild!;
    expect(taskItem.type.name).to.equal('taskItem');
  });

  it('does not match <li>', () => {
    const doc = fromHTML('<li>', schema);
    const listItem = doc.firstChild!.firstChild!;
    expect(listItem.type.name).to.equal('listItem');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'taskList', 'taskItem', 'orderedList', 'listItem']
  });
}
