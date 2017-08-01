import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { toHTML, fromHTML } from '../../../../src/test-helper';

const schema = makeSchema();

describe('@atlaskit/editor-core/schema taskList node', () => {
  it('serializes to <ol> with proper data-attributes', () => {
    const html = toHTML(schema.nodes.taskList.create({ localId: 'cheese' }), schema);
    expect(html).to.have.string('<ol');
    expect(html).to.have.string('data-task-list-local-id="cheese"');
  });

  it('matches <ol data-task-list-local-id>', () => {
    const doc = fromHTML('<ol data-task-list-local-id>', schema);
    const taskList = doc.firstChild!;
    expect(taskList.type.name).to.equal('taskList');
    expect(taskList.attrs.localId).to.not.equal(undefined);
  });

  it('does not match <ol>', () => {
    const doc = fromHTML('<ol>', schema);
    const orderedList = doc.firstChild!;
    expect(orderedList.type.name).to.equal('orderedList');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'taskList', 'taskItem', 'orderedList', 'listItem']
  });
}
