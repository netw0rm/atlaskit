import * as chai from 'chai';
import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { DocNodeType, MentionNodeType } from '../../../src';
import { toHTML, fromHTML as fromHTML_ } from '../../../test-helper';

const schema = makeSchema();
const fromHTML = (html: string) => fromHTML_(html, schema);

describe('ak-editor-core/schema mention node', () => {
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

    const mention = doc.firstChild;
    expect(mention.type.name).to.equal('mention');
    expect(mention.attrs.id).to.equal('@user-1');
    expect(mention.attrs.displayName).to.equal('foo bar');
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
      doc: { type: DocNodeType, content: 'inline<_>*' },
      mention: { type: MentionNodeType, group: 'inline' },
      text: { type: Text }
    }
  }) as ISchema;
}
