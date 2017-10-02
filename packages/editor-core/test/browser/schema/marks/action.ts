import * as chai from 'chai';
import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { chaiPlugin, toHTML, fromHTML } from '../../../../src/test-helper';

chai.use(chaiPlugin);
const target = 'test-target';
const content = 'foo';
const sampleAction = `<span data-target="${target}">${content}</span>`;

describe('@atlaskit/editor-core/schema action mark', () => {
  itMatches(`${sampleAction}`, target, content);

  it(`serializes to ${sampleAction}`, () => {
    const schema = makeSchema();
    const node = schema.text(content, [schema.marks.action.create({ target })]);
    const html: string = toHTML(node, schema);
    expect(html).to.have.string(`${sampleAction}`);
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text'],
    marks: ['action', 'textColor']
  });
}

function itMatches(html: string, target, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(html, schema);
    const action = schema.marks.action.create({ target });
    expect(doc).to.have.textWithMarks(expectedText, [action]);
  });
}
