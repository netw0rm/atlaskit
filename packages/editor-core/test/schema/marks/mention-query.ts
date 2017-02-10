import * as chai from 'chai';
import { expect } from 'chai';
import { DocNodeType, MentionQueryMarkType, Schema, Text, MentionsPlugin, MentionNodeType } from '../../../src';
import { chaiPlugin, makeEditor, toHTML, nodeFactory } from '../../../test-helper';

chai.use(chaiPlugin);

describe('ak-editor-core/schema mention-query mark', () => {
  const editor = (schema, doc) => {
    const { pm, plugin } = makeEditor({ doc, plugin: MentionsPlugin, schema });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

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

  it('does not throw an error if it is named "mention_query"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'text*' },
          text: { type: Text }
        },
        marks: {
          mention_query: MentionQueryMarkType
        }
      });
    }).to.not.throw(Error);
  });

  it('serializes to <span data-mention-query="true">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [ schema.marks.mention_query.create() ] );
    const html = toHTML(node);
    expect(html).to.have.string('data-mention-query="true"');
  });

  it('should not disappear when typing more than 1 character', () => {
    const schema = makeSchema();
    const doc = nodeFactory(schema.nodes.doc);
    const { pm, plugin, sel } = editor(schema, doc('Some text {<>}'));

    pm.input.insertText(sel, sel, '@');
    pm.input.insertText(sel + 1, sel + 1, 'a');
    pm.input.insertText(sel + 2, sel + 2, 'b');

    const mentionQueryMark = plugin.findMentionQueryMark();

    expect(pm.doc.nodeAt(mentionQueryMark.start)!.text).to.be.equal('@ab');
  });
});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      text: Text;
    };
    marks: {
      mention_query: MentionQueryMarkType;
    };
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'text<_>*' },
      mention: { type: MentionNodeType, group: 'inline' },
      text: { type: Text }
    },
    marks: {
      mention_query: MentionQueryMarkType
    }
  }) as ISchema;
}
