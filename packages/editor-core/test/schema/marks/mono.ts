import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, doc, paragraph, text, code } from '../../../src';
import { DOMNode } from '../../../src/prosemirror/dom';
import { chaiPlugin, toDOM, fromHTML } from '../../../test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema code mark', () => {
  itMatches('<tt>text</tt>', 'text');
  itMatches('<code>text</code>', 'text');
  itMatches('<span style="font-family: monospace">text</span>', 'text');
  itMatches('<span style="font-family: monospace; white-space: pre">text</span>', 'text');
  itMatches('<span style="font-family: monospace; white-space: pre-wrap">text</span>', 'text');
  itMatches('<span style="font-family: monospace; white-space: pre-line">text</span>', 'text');

  it('serializes to <span style="font-family: monospace; white-space: pre-wrap" class="code">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.code.create() ] );
    // at this moment DOMNode doesn't have getAttribute/classList
    const domNode: DOMNode = toDOM(node, schema);
    const domNodeAttributes = domNode.attributes;
    expect(domNodeAttributes.getNamedItem('style').value).to.equal('font-family: monospace; white-space: pre-wrap;');
    expect(domNodeAttributes.getNamedItem('class').value).to.equal('code');
  });
});

function makeSchema () {
  const nodes = {doc, paragraph, text};
  const marks = {code};
  return new Schema<typeof nodes, typeof marks>({ nodes, marks });
}

function itMatches (html: string, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(html, schema);
    const code = schema.marks.code.create();

    expect(doc).to.have.textWithMarks(expectedText, [ code ]);
  });
}
