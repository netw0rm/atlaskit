import { Node, Schema, Text, DocNodeType, UnderlineMarkType } from '../../../src';
import { fromHTML, toHTML, chaiPlugin } from '../../../test-helper';
import * as chai from 'chai';
import { expect } from 'chai';

chai.use(chaiPlugin);

describe('ak-editor-core/schema underline mark', () => {
  it('throws an error if it is not named "underline"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          foo: UnderlineMarkType
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
          u: UnderlineMarkType
        }
      });
    }).to.not.throw(Error);
  });

  itMatches('<u>text</u>', 'text');
  itMatches('<span style="text-decoration: underline">text</span>', 'text');

  it('serializes to <u>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.u.create() ] );
    expect(toHTML(node)).to.equal('<u>foo</u>');
  });
});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      text: Text;
    };
    marks: {
      u: UnderlineMarkType;
    };
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'inline<_>*' },
      text: { type: Text, group: 'inline' }
    },
    marks: {
      u: UnderlineMarkType
    }
  }) as ISchema;
}

function itMatches(html: string, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(`${html}`, schema);
    const u = schema.marks.u.create();

    expect(doc).to.have.textWithMarks(expectedText, [ u ]);
  });
}
