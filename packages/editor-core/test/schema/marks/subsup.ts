import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, doc, paragraph, text, subsup } from '../../../src';
import { chaiPlugin, fromHTML, toHTML } from '../../../test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema subsup mark', () => {
  itMatches('<sub>text</sub>', 'text', { type: 'sub' });
  itMatches('<sup>text</sup>', 'text', { type: 'sup' });

  it('serializes to <sub>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.subsup.create({ type: 'sub' }) ] );
    expect(toHTML(node, schema)).to.equal('<sub>foo</sub>');
  });

  it('serializes to <sup>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.subsup.create({ type: 'sup' }) ] );
    expect(toHTML(node, schema)).to.equal('<sup>foo</sup>');
  });
});

function makeSchema () {
  const nodes = {doc, paragraph, text};
  const marks = {subsup};
  return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}

function itMatches(html: string, expectedText: string, attrs: { type: 'sub' | 'sup' }) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(`${html}`, schema);
    const u = schema.marks.subsup.create(attrs);

    expect(doc).to.have.textWithMarks(expectedText, [ u ]);
  });
}
