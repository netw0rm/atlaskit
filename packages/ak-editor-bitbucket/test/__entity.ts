import schema from '../src/schema';
import 'mocha';
import { ProseMirror, Node } from 'ak-editor-prosemirror';
import { default as chai, expect } from 'chai';
import { fromHTML, toHTML } from 'ak-editor-test';

describe('Mention node - parsing from DOM', () => {
  it('should extract the correct values of entity type and entity id', () => {
    const doc = fromHTML(`
      <p><span editor-entity-type='mention' editor-entity-id='@user-1'></span></p>
    `);

    const node = doc.firstChild.firstChild;
    expect(node.type.name).to.equal('mention');
    expect(node.attrs.entityType).to.equal('mention');
    expect(node.attrs.id).to.equal('@user-1');
  });
});

describe('Mention node - serializing to DOM', () => {
  it('should have entity type mention', () => {
    const html = toHTML(schema.nodes.mention.create({ id: '@bar' }));
    expect(html).to.have.string('editor-entity-type="mention"');
    expect(html).to.have.string('editor-entity-id="@bar"');
    expect(html).to.have.string('contenteditable="false"');
  });
});

describe('Emoji node - parsing from DOM', () => {
  it('should extract the correct values of entity type and entity id', () => {
    const doc = fromHTML(`
      <p><span editor-entity-type='emoji' editor-entity-id=':awesome:'></span></p>
    `);

    const node = doc.firstChild.firstChild;
    expect(node.type.name).to.equal('emoji');
    expect(node.attrs.entityType).to.equal('emoji');
    expect(node.attrs.id).to.equal(':awesome:');
  });
});

describe('Emoji node - serializin to DOM', () => {
  it('should have entity type emoji', () => {
    const html = toHTML(schema.nodes.emoji.create({ id: ':awesome:' }));
    expect(html).to.have.string('editor-entity-type="emoji"');
    expect(html).to.have.string('editor-entity-id=":awesome:"');
    expect(html).to.have.string('contenteditable="false"');
  });
});
