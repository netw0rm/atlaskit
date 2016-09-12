import { Entity, Mention, Emoji } from '../src/entity';
import { ProseMirror, Node, Schema,
         schema as schemaBasic } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';

// schema which includes the mention node
const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    entity: { type: Entity, group: 'inline' },
    mention: { type: Mention, group: 'inline' },
    emoji: { type: Emoji, group: 'inline' },
  }),
  marks: schemaBasic.markSpec
});

const makeEditor = (docString?: string) => {
  const node = document.createElement('div');
  if (docString) {
    node.innerHTML = docString;
  }

  return new ProseMirror({
    doc: schema.parseDOM(node),
  });
}

const insertNode = (pm: ProseMirror, nodeType: string, id: string) : void => {
  const m = pm.schema.nodes[nodeType].create({ id: id });
  pm.tr.insert(0, m).apply();
}

const getDOMNode = (pm: ProseMirror) : HTMLSpanElement => {
  const dom = pm.doc.content.toDOM();
  return dom.querySelector('span[editor-entity-type]')
}

describe('Entity node - parsing from DOM', () => {
  it('should extract the correct values of entity type and entity id', () => {
    const pm = makeEditor(`
      <p><span editor-entity-type='foo' editor-entity-id='@user-1'></span></p>
    `);

    const mentionNode: Node = pm.doc.child(0).child(0);
    expect(mentionNode.type.name).to.equal('entity');
    expect(mentionNode.attrs.entityType).to.equal('foo');
    expect(mentionNode.attrs.id).to.equal('@user-1');
  });
});

describe('Entity node - serializing to DOM with entity id set', () => {
  it('should insert a node to DOM with correct attributes', () => {
    const pm = makeEditor();
    insertNode(pm, 'entity', '@bar');

    const entityNode = getDOMNode(pm);
    expect(entityNode).not.to.equal(null);

    expect(entityNode.getAttribute('contenteditable')).to.equal('false');
    expect(entityNode.getAttribute('editor-entity-id')).to.equal('@bar');
    expect(entityNode.getAttribute('editor-entity-type')).to.equal('entity');
  });
});

describe('Mention node', () => {
  it('should set the entity type to mention', () => {
    const pm = makeEditor();
    insertNode(pm, 'mention', '@foo');

    const entityNode = getDOMNode(pm);
    expect(entityNode).not.to.equal(null);

    expect(entityNode.getAttribute('contenteditable')).to.equal('false');
    expect(entityNode.getAttribute('editor-entity-id')).to.equal('@foo');
    expect(entityNode.getAttribute('editor-entity-type')).to.equal('mention');
  });
});

describe('Emoji node', () => {
  it('should set the entity type to mention', () => {
    const pm = makeEditor();
    insertNode(pm, 'emoji', ':awesome:');

    const entityNode = getDOMNode(pm);
    expect(entityNode).not.to.equal(null);

    expect(entityNode.getAttribute('contenteditable')).to.equal('false');
    expect(entityNode.getAttribute('editor-entity-id')).to.equal(':awesome:');
    expect(entityNode.getAttribute('editor-entity-type')).to.equal('emoji');
  });
});
