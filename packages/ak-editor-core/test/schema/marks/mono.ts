import * as chai from 'chai';
import { expect } from 'chai';
import { Node, Schema, DocNodeType, MonoMarkType, Text } from '../../../src';
import { fromHTML, toHTML, chaiPlugin } from '../../../test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema mono mark', () => {
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

  it('serializes to <span style="font-family: monospace; white-space: pre-wrap">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.mono.create() ] );
    expect(toHTML(node)).to.equal('<span style="font-family: monospace; white-space: pre-wrap;">foo</span>');
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
