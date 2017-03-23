import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, doc, paragraph, text, link } from '../../../src';
import { chaiPlugin, toHTML, fromHTML } from '../../../src/test-helper';

chai.use(chaiPlugin);
const href = 'http://atlassian.com';
const href2 = 'http://atlassian.com/test';
const href3 = 'http://atlassian.com?test=123';
const content = 'foo';
const sampleLink = `<a href="${href}">${content}</a>`;

describe('@atlaskit/editor-core/schema link mark', () => {
  itMatches(`${sampleLink}`, href, content);
  itMatches(`<a href="${href}" title="test" alt="hello">${content}</a>`, href, content);
  itMatches(`<a href="${href2}">${content}</a>`, href2, content);
  itMatches(`<a href="${href3}">${content}</a>`, href3, content);

  it(`serializes to ${sampleLink}`, () => {
    const schema = makeSchema();
    const node = schema.text(content, [schema.marks.link.create({ href })]);
    const html: string = toHTML(node, schema);
    expect(html).to.have.string(`${sampleLink}`);
  });
});

function makeSchema() {
  const nodes = { doc, paragraph, text };
  const marks = { link };
  return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}

function itMatches(html: string, href, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(html, schema);
    const link = schema.marks.link.create({ href });
    expect(doc).to.have.textWithMarks(expectedText, [link]);
  });
}
