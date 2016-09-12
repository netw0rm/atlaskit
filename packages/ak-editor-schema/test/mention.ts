import { Mention } from '../src/mention';
import { ProseMirror, Node, Schema,
         schema as schemaBasic } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';

// schema which includes the mention node
const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    mention: { type: Mention, group: 'inline' }
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

describe('Mention node - parsing from DOM', () => {

  it('should retain the values of data and hydrate attributes of the DOM node', () => {
    const pm = makeEditor(`
      <p><span editor-node-type='mention' editor-data='user-1' editor-hydrate='false'></span></p>
    `);

    const mentionNode: Node = pm.doc.child(0).child(0);
    expect(mentionNode.type.name).to.equal('mention');
    expect(mentionNode.attrs.data).to.equal('user-1');
    expect(mentionNode.attrs.hydrate).to.equal(false);
  });

  it('should correctly evaluate and set the hydrate attribute', () => {
    const pm = makeEditor(`
      <p><span editor-node-type='mention' editor-data='user-1' editor-hydrate='true'></span></p>
    `);

    const mentionNode: Node = pm.doc.child(0).child(0);
    expect(mentionNode.type.name).to.equal('mention');
    expect(mentionNode.attrs.hydrate).to.equal(true);
  });
});

describe('Mentions node - serializing to DOM', () => {
  const insertNode = (pm: ProseMirror) : void => {
    const m = pm.schema.nodes.mention.create({ data: '@bar' });
    pm.tr.insert(0, m).apply();
  }

  const getDOMNode = (pm: ProseMirror) : HTMLSpanElement => {
    const dom = pm.doc.content.toDOM();
    return dom.querySelector('span[editor-node-type=mention]')
  }

  it('should render a mention node with correct attributes', () => {
    const pm =  makeEditor();
    insertNode(pm);

    const mentionNode = getDOMNode(pm);
    expect(mentionNode).not.to.equal(null);

    expect(mentionNode.getAttribute('contenteditable')).to.equal('false');
    expect(mentionNode.getAttribute('editor-data')).to.equal('@bar');
    expect(mentionNode.getAttribute('editor-hydrate')).to.equal('true');
  });
});
