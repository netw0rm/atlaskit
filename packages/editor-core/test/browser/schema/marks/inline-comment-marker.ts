import * as chai from 'chai';
import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { chaiPlugin, toHTML } from '../../../../src/test-helper';

chai.use(chaiPlugin);

describe('@atlaskit/editor-core/schema confluence-inline-comment mark', () => {
  it('serializes to <span data-reference="hash-ref-goes-here">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [schema.marks.confluenceInlineComment.create({reference: 'hash-ref-goes-here'})]);
    expect(toHTML(node, schema)).to.have.string('data-reference="hash-ref-goes-here"');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text'],
    marks: ['confluenceInlineComment']
  });
}
