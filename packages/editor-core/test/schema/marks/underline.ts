import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, doc, paragraph, text, underline } from '../../../src';
import { chaiPlugin, fromHTML, toHTML } from '../../../test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema underline mark', () => {
  itMatches('<u>text</u>', 'text');
  itMatches('<span style="text-decoration: underline">text</span>', 'text');

  it('serializes to <u>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.underline.create() ] );
    expect(toHTML(node, schema)).to.equal('<u>foo</u>');
  });
});

function makeSchema () {
  const nodes = {doc, paragraph, text};
  const marks = {underline};
  return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}

function itMatches(html: string, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(`${html}`, schema);
    const underline = schema.marks.underline.create();

    expect(doc).to.have.textWithMarks(expectedText, [ underline ]);
  });
}
