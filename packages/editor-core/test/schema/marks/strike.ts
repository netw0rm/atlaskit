import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, doc, paragraph, text, strike } from '../../../src';
import { chaiPlugin, fromHTML, toHTML } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema strike mark', () => {
  itMatches('<s>text</s>', 'text');
  itMatches('<strike>text</strike>', 'text');
  itMatches('<span style="text-decoration: line-through">text</span>', 'text');

  it('serializes to <s>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.strike.create() ] );
    expect(toHTML(node, schema)).to.equal('<s>foo</s>');
  });
});

function makeSchema () {
  const nodes = {doc, paragraph, text};
  const marks = {strike};
  return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}

function itMatches (html: string, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(html, schema);
    const strike = schema.marks.strike.create();

    expect(doc).to.have.textWithMarks(expectedText, [ strike ]);
  });
}
