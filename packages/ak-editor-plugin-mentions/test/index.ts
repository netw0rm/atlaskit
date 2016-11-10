import { default as plugin } from '../src';
import { Mention } from 'ak-editor-schema';
import { ProseMirror, Schema, ResolvedPos,
         schema as schemaBasic } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import { chaiPlugin, fixtures } from 'ak-editor-test';

chai.use(chaiPlugin);

const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    mention: { type: Mention, group: 'inline' }
  }),
  marks: schemaBasic.markSpec
});

const makeEditor = (container: Node) => {
  return new ProseMirror({
    schema: schema,
    plugins: [ plugin ],
    place: container
  });
}

const container = fixtures();

describe('ak-editor-plugin-mentions', () => {
  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = plugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
  });
});

describe('ak-editor-plugin-mentions - on flush', () => {
  it('should hydrate nodes', () => {
    const pm = makeEditor(container());
    const pluginInstance = plugin.get(pm);
    const hydrateNodes = sinon.spy(pluginInstance, "hydrateNodes");

    pm.tr.typeText("foo").apply();
    pm.flush();

    expect(hydrateNodes.called).to.be.true;
  });
});

describe('ak-editor-plugin-mentions - when entity id is not set on mention nodes', () => {
  it('should call the auto-complete handler', () => {
    const pm = makeEditor(container());
    const mockRenderHandler = sinon.spy();
    const mockAutocompleteHandler = sinon.spy();
    plugin.get(pm).renderHandler = mockRenderHandler;
    plugin.get(pm).autocompleteHandler = mockAutocompleteHandler;

    // insert a mention node
    const m = pm.schema.nodes.mention.create({ id: '' });
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
    const pm = makeEditor(container());
    const mockRenderHandler = sinon.spy();
    const mockAutocompleteHandler = sinon.spy();
    plugin.get(pm).renderHandler = mockRenderHandler;
    plugin.get(pm).autocompleteHandler = mockAutocompleteHandler;

    // insert a mention node
    const m = pm.schema.nodes.mention.create({ id: '@foo' });
    pm.tr.insert(0, m).apply();
    pm.flush();

    expect(mockAutocompleteHandler.called).not.to.be.true;

    expect(mockRenderHandler.calledWith(
      sinon.match.instanceOf(HTMLElement),
      sinon.match.instanceOf(ProseMirror)
    )).to.be.true;
  });

  it('should call the render handler for every node', () => {
    const pm = makeEditor(container());
    const mockRenderHandler = sinon.spy();
    const mockAutocompleteHandler = sinon.spy();
    plugin.get(pm).renderHandler = mockRenderHandler;
    plugin.get(pm).autocompleteHandler = mockAutocompleteHandler;

    // insert a mention node
    const m = pm.schema.nodes.mention.create({ id: '@foo' });
    pm.tr.insert(0, m).apply();
    pm.tr.insert(0, m).apply();
    pm.flush();

    expect(mockAutocompleteHandler.called).not.to.be.true;
    expect(mockRenderHandler.callCount).to.equal(2);
  });
});

describe('ak-editor-plugin-mentions - when DOM contains hydrated nodes', () => {
  it('should not call handlers on already hydratd nodes', () => {
    const pm = makeEditor(container());
    const mockRenderHandler = sinon.spy();
    const mockAutocompleteHandler = sinon.spy();
    plugin.get(pm).renderHandler = mockRenderHandler;
    plugin.get(pm).autocompleteHandler = mockAutocompleteHandler;

    // insert the first mention node
    const m1 = pm.schema.nodes.mention.create({ id: '' });
    pm.tr.insert(0, m1).apply();
    pm.flush();

    expect(mockAutocompleteHandler.called).to.be.true;
    expect(mockAutocompleteHandler.callCount).to.equal(1);

    // insert another mention node
    const m2 = pm.schema.nodes.mention.create({ id: '' });
    pm.tr.insert(0, m2).apply();
    pm.flush();

    expect(mockAutocompleteHandler.called).to.be.true;
    expect(mockAutocompleteHandler.callCount).to.equal(2);
  });
});
