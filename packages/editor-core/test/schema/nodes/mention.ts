import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { CodeBlockNodeType, DocNodeType, isMentionNode, MentionNode, MentionNodeType } from '../../../src';
import { fromHTML as fromHTML_, toHTML } from '../../../src/test-helper';

const schema = makeSchema();
const fromHTML = (html: string) => fromHTML_(html, schema);

describe('@atlaskit/editor-core/schema mention node', () => {
  it('throws an error if it is not named "mention"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'inline*' },
          foo: { type: MentionNodeType, group: 'inline' },
          text: { type: Text }
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "mention"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'inline*' },
          mention: { type: MentionNodeType, group: 'inline' },
          text: { type: Text }
        }
      });
    }).to.not.throw(Error);
  });

  it('should have mention id and display name when serializing to DOM', () => {
    const html = toHTML(schema.nodes.mention.create({ id: '@bar', displayName: 'foo bar' }));
    expect(html).to.have.string('mention-id="@bar"');
    expect(html).to.have.string('contenteditable="false"');
    expect(html).to.have.string('foo bar');
  });

  it('should extract the correct values of mention id and display name', () => {
    const doc = fromHTML('<span mention-id=\'@user-1\'>foo bar</span>');

    const mention = doc.firstChild! as MentionNode;
    expect(mention.type.name).to.equal('mention');
    expect(mention.attrs.id).to.equal('@user-1');
    expect(mention.attrs.displayName).to.equal('foo bar');
  });

  describe('isMentionNode', () => {
    context('when it is a mention node', () => {
      it('returns true', () => {
        const node = schema.nodes.mention.create({ id: '@bar', displayName: 'foo bar' });

        expect(isMentionNode(node)).to.be.true;
      });
    });

    context('when it is not a mention node', () => {
      it('returns false', () => {
        const node = schema.nodes.code_block.create({language: 'java'});

        expect(isMentionNode(node)).to.be.false;
      });
    });
  });
});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      mention: MentionNodeType;
      code_block: CodeBlockNodeType;
      text: Text;
    };
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'inline<_>*' },
      mention: { type: MentionNodeType, group: 'inline' },
      code_block: { type: CodeBlockNodeType, content: 'text*' },
      text: { type: Text }
    }
  }) as ISchema;
}
