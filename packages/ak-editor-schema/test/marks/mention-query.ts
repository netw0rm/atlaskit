import { Node, Schema, Text } from 'ak-editor-prosemirror';
import { default as chai, expect } from 'chai';
import { chaiPlugin } from 'ak-editor-test';
import { toHTML } from 'ak-editor-test';
import { DocNodeType, MentionQueryMarkType } from '../../src';

chai.use(chaiPlugin);

describe('ak-editor-schema mention-query mark', () => {

  it('throws an error if it is not named "mention_query"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          foo: MentionQueryMarkType
        }
      });
    }).to.throw(Error);
  });

  it('serializes to <span data-mention-query="true" style="color: rgb(22, 94, 204);">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.mention_query.create() ] );
    const html = toHTML(node);
    expect(html).to.have.string('data-mention-query="true"');
    expect(html).to.have.string('class="editor-mention-query-mark');
  });

});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      text: Text;
    }
    marks: {
      mention_query: MentionQueryMarkType;
    }
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'text<_>*' },
      text: { type: Text }
    },
    marks: {
      mention_query: MentionQueryMarkType
    }
  }) as ISchema;
}