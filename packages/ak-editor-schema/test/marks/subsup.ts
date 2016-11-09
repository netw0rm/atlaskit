import { Node, Schema, Text } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import { chaiPlugin } from 'ak-editor-test';
import { fromHTML, toHTML } from 'ak-editor-test';
import { DocNodeType, SubSupMarkType } from '../../src';

chai.use(chaiPlugin);

describe('ak-editor-schema subsup mark', () => {
  it('throws an error if it is not named "subsup"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          foo: SubSupMarkType
        }
      });
    }).to.throw(Error);

    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          subsup: SubSupMarkType
        }
      });
    }).to.not.throw(Error);
  });

  itMatches('<sub>text</sub>', 'text', { type: 'sub' });
  itMatches('<sup>text</sup>', 'text', { type: 'sup' });

  it('serializes to <sub>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.subsup.create({ type: 'sub' }) ] );
    expect(toHTML(node)).to.equal('<sub>foo</sub>');
  });

  it('serializes to <sup>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.subsup.create({ type: 'sup' }) ] );
    expect(toHTML(node)).to.equal('<sup>foo</sup>');
  });
});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      text: Text;
    }
    marks: {
      subsup: SubSupMarkType;
    }
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'inline<_>*' },
      text: { type: Text, group: 'inline' }
    },
    marks: {
      subsup: SubSupMarkType
    }
  }) as ISchema;
}

function itMatches(html: string, expectedText: string, attrs: { type: 'sub' | 'sup' }) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(`${html}`, schema);
    const u = schema.marks.subsup.create(attrs);

    expect(doc).to.have.textWithMarks(expectedText, [ u ]);
  });
}
