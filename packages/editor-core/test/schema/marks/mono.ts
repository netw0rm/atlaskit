import * as chai from 'chai';
import { expect } from 'chai';
import { DocNodeType, MonoMarkType, Schema, Text } from '../../../src';
import { DOMNode } from '../../../src/prosemirror/dom';
import { chaiPlugin, fromHTML } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('@atlaskit/editor-core/schema mono mark', () => {
  it('throws an error if it is not named "mono"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          foo: MonoMarkType
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "mono"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          mono: MonoMarkType
        }
      });
    }).to.not.throw(Error);
  });

  it('declares itself as code', () => {
    const schema = makeSchema();
    expect(schema.marks.mono).to.have.property('isCode', true);
  });

  itMatches('<tt>text</tt>', 'text');
  itMatches('<code>text</code>', 'text');
  itMatches('<span style="font-family: monospace">text</span>', 'text');
  itMatches('<span style="font-family: monospace; white-space: pre">text</span>', 'text');
  itMatches('<span style="font-family: monospace; white-space: pre-wrap">text</span>', 'text');
  itMatches('<span style="font-family: monospace; white-space: pre-line">text</span>', 'text');

  it('serializes to <span style="font-family: monospace; white-space: pre-wrap" class="mono">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.mono.create() ] );

    // at this moment DOMNode doesn't have getAttribute/classList
    const domNode: DOMNode = node.toDOM();
    const domNodeAttributes = domNode.attributes;

    expect(domNodeAttributes.getNamedItem('style').value).to.equal('font-family: monospace; white-space: pre-wrap;');
    expect(domNodeAttributes.getNamedItem('class').value).to.equal('mono');
  });
});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      text: Text;
    };
    marks: {
      mono: MonoMarkType;
    };
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'text<_>*' },
      text: { type: Text }
    },
    marks: {
      mono: MonoMarkType
    }
  }) as ISchema;
}

function itMatches(html: string, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(html, schema);
    const mono = schema.marks.mono.create();

    expect(doc).to.have.textWithMarks(expectedText, [ mono ]);
  });
}
