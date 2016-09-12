import { default as plugin } from '../src';
import { Mention } from 'ak-editor-schema';
import { ProseMirror, Schema, ResolvedPos,
         schema as schemaBasic } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import { chaiPlugin } from 'ak-editor-test';

chai.use(chaiPlugin);

const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    mention: { type: Mention, group: 'inline' }
  }),
  marks: schemaBasic.markSpec
});

const makeEditor = () => {
  // Flush only works when editor is attached to DOM
  const container = document.createElement('div');
  document.body.appendChild(container);

  return new ProseMirror({
    schema: schema,
    plugins: [ plugin ],
    place: container
  });
}

describe('ak-editor-plugin-mentions - on flush', () => {
  it('should hydrate nodes', () => {
    const pm = makeEditor();
    const pluginInstance = plugin.get(pm);
    const hydrateNodes = sinon.spy(pluginInstance, "hydrateNodes");

    pm.tr.typeText("foo").apply();
    pm.flush();

    expect(hydrateNodes.called).to.be.true;
  });
});

describe('ak-editor-plugin-mentions - when no data set on mention nodes', () => {
  it('should call the auto-complete handler', () => {
    const pm = makeEditor();
    const mockRenderHandler = sinon.spy();
    const mockAutocompleteHandler = sinon.spy();
    plugin.get(pm).renderHandler = mockRenderHandler;
    plugin.get(pm).autocompleteHandler = mockAutocompleteHandler;

    // insert a mention node
    const m = pm.schema.nodes.mention.create({ data: '' });
    pm.tr.insert(0, m).apply();
    pm.flush();

    expect(mockRenderHandler.called).not.to.be.true;

    expect(mockAutocompleteHandler.calledWith(
      sinon.match.instanceOf(HTMLElement),
      sinon.match.instanceOf(ProseMirror)
    )).to.be.true;
  });
});

describe('ak-editor-plugin-mentions - when theres data set on mention nodes', () => {
  it('should call the render handler', () => {
    const pm = makeEditor();
    const mockRenderHandler = sinon.spy();
    const mockAutocompleteHandler = sinon.spy();
    plugin.get(pm).renderHandler = mockRenderHandler;
    plugin.get(pm).autocompleteHandler = mockAutocompleteHandler;

    // insert a mention node
    const m = pm.schema.nodes.mention.create({ data: '@foo' });
    pm.tr.insert(0, m).apply();
    pm.flush();

    expect(mockAutocompleteHandler.called).not.to.be.true;

    expect(mockRenderHandler.calledWith(
      sinon.match.instanceOf(HTMLElement),
      sinon.match.instanceOf(ProseMirror)
    )).to.be.true;
  });

  it('should call the render handler for every node', () => {
    const pm = makeEditor();
    const mockRenderHandler = sinon.spy();
    const mockAutocompleteHandler = sinon.spy();
    plugin.get(pm).renderHandler = mockRenderHandler;
    plugin.get(pm).autocompleteHandler = mockAutocompleteHandler;

    // insert a mention node
    const m = pm.schema.nodes.mention.create({ data: '@foo' });
    pm.tr.insert(0, m).apply();
    pm.tr.insert(0, m).apply();
    pm.flush();

    expect(mockAutocompleteHandler.called).not.to.be.true;
    expect(mockRenderHandler.callCount).to.equal(2);
  });
});
