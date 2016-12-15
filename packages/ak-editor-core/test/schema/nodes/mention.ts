import { Schema, Text } from 'ak-editor-prosemirror';
import { default as chai, expect } from 'chai';
import { toHTML, fromHTML } from '../../../src/test-helper';
import { DocNodeType, MentionNodeType } from '../../../src/schema';

const schema = makeSchema();

describe('ak-editor-schema mention node', () => {
  it('throws an error if it is not named "mention"', () => {
    expect(() => {
      new Schema({
        nodes: {
          mention: { type: MentionNodeType, group: 'inline' },
          foo: { type: MentionNodeType, group: 'inline' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it('should have mention id and display name when serializing to DOM', () => {
    const html = toHTML(schema.nodes.mention.create({ id: '@bar', displayName: 'foo bar' }));
    expect(html).to.have.string('mention-id="@bar"');
    expect(html).to.have.string('contenteditable="false"');
    expect(html).to.have.string('foo bar');
  });

  it('should extract the correct values of mention id and display name', () => {
    const doc = fromHTML(`
      <p><span mention-id='@user-1'>foo bar</span></p>
    `);

    const node = doc.firstChild.firstChild;
    expect(node.type.name).to.equal('mention');
    expect(node.attrs.id).to.equal('@user-1');
    expect(node.attrs.displayName).to.equal('foo bar');
  });
});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      mention: MentionNodeType;
      text: Text;
    }
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'text<_>*' },
      mention: { type: MentionNodeType, group: 'inline' },
      text: { type: Text }
    }
  }) as ISchema;
}
