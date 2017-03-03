import * as chai from 'chai';
import { expect } from 'chai';
import { DocNodeType, Schema, StrikeMarkType, Text } from '../../../src';
import { chaiPlugin, fromHTML, toHTML } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('@atlaskit/editor-core/schema strike mark', () => {
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

  it('does not throw an error if it is named "strike"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          strike: StrikeMarkType
        }
      });
    }).to.not.throw(Error);
  });

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
    };
    marks: {
      strike: StrikeMarkType;
    };
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
