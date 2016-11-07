import { Node, Schema, Text } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import { chaiPlugin } from 'ak-editor-test';
import { fromHTML, toHTML } from 'ak-editor-test';
import { DocNodeType, StrikeMarkType } from '../../src';

chai.use(chaiPlugin);

describe('ak-editor-schema strike mark', () => {
  it('throws an error if it is not named "strike"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          foo: StrikeMarkType
        }
      });
    }).to.throw(Error);
  });

  itMatches('<del>text</del>', 'text');
  itMatches('<s>text</s>', 'text');
  itMatches('<strike>text</strike>', 'text');
  itMatches('<span style="text-decoration: line-through">text</span>', 'text');

  it('serializes to <s>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.strike.create() ] );
    expect(toHTML(node)).to.equal('<s>foo</s>');
  });
});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      text: Text;
    }
    marks: {
      strike: StrikeMarkType;
    }
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'inline<_>*' },
      text: { type: Text, group: 'inline' }
    },
    marks: {
      strike: StrikeMarkType
    }
  }) as ISchema;
}

function itMatches(html: string, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(`${html}`, schema);
    const strike = schema.marks.strike.create();

    expect(doc).to.have.textWithMarks(expectedText, [ strike ]);
  });
}
