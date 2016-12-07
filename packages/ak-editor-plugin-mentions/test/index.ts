import MentionsPlugin from '../src';
import { MentionQueryMarkType, MentionNodeType } from 'ak-editor-schema';
import { ProseMirror, Schema, ResolvedPos,
         schema as schemaBasic } from 'ak-editor-prosemirror';
import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { chaiPlugin, fixtures } from 'ak-editor-test';

chai.use(chaiPlugin);
chai.use(sinonChai);

const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    mention: { type: MentionNodeType, group: 'inline' }
  }),
  marks: {
    mention_query: MentionQueryMarkType
  }
});

const makeEditor = (container: Node) => {
  return new ProseMirror({
    schema: schema,
    plugins: [ MentionsPlugin ],
    place: container
  });
}

const container = fixtures();

describe('ak-editor-plugin-mentions', () => {
  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = MentionsPlugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
  });

  describe('keymap', () => {
    xit('should bind keymap when query is active', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, '@');
      pm.flush();
      expect(pm.input.keymaps.filter((k:any) => k.map.options.name === 'mentions-plugin-keymap').length).to.equal(1);
    });

    xit('should unbind keymap when dismissed', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, '@');
      pm.flush();

      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 27;

      pm.input.dispatchKey('Esc', keyDownEvent);
      expect(pm.input.keymaps.filter((k:any) => k.map.options.name === 'mentions-plugin-keymap').length).to.equal(0);
    });

    it('should ignore "Up"-key if no "onSelectPrevious" is attached', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, '@');
      pm.flush();

      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 38;
      pm.input.dispatchKey('Up', keyDownEvent);
    });

    it('should ignore "Down"-key if no "onSelectNext" is attached', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, '@');
      pm.flush();

      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 40;
      pm.input.dispatchKey('Down', keyDownEvent);
    });

    it('should ignore "Enter"-key if no "onSelectCurrent" is attached', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, '@');
      pm.flush();

      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 13;
      pm.input.dispatchKey('Enter', keyDownEvent);
    });

    it('should trigger "onSelectPrevious" when "Up"-key is pressed', () => {
      const pm = makeEditor(container());
      const pluginState = MentionsPlugin.get(pm)!;
      pm.input.insertText(0, 0, '@');
      pm.flush();

      const spy = sinon.spy();
      pluginState.onSelectPrevious = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 38;

      pm.input.dispatchKey('Up', keyDownEvent);
      expect(spy).to.have.been.called;
    });

    it('should trigger "onSelectNext" when "Down"-key is pressed', () => {
      const pm = makeEditor(container());
      const pluginState = MentionsPlugin.get(pm)!;
      pm.input.insertText(0, 0, '@');
      pm.flush();

      const spy = sinon.spy();
      pluginState.onSelectNext = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 40;

      pm.input.dispatchKey('Down', keyDownEvent);
      expect(spy).to.have.been.called;
    });

    it('should trigger "onSelectCurrent" when "Enter"-key is pressed', () => {
      const pm = makeEditor(container());
      const pluginState = MentionsPlugin.get(pm)!;
      pm.input.insertText(0, 0, '@');
      pm.flush();

      const spy = sinon.spy();
      pluginState.onSelectCurrent = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 13;

      pm.input.dispatchKey('Enter', keyDownEvent);
      expect(spy).to.have.been.called;
    });

    it('should trigger "dismiss" when "Esc"-key is pressed', () => {
      const pm = makeEditor(container());
      const pluginState = MentionsPlugin.get(pm)!;
      pm.input.insertText(0, 0, '@');
      pm.flush();

      const spy = sinon.spy(pluginState, 'dismiss');
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 27;

      pm.input.dispatchKey('Esc', keyDownEvent);
      expect(spy).to.have.been.called;
    });

  });

  describe('insertMention', () => {

    it('should replace mention-query-mark with mention-node', () => {
      const pm = makeEditor(container());
      const pluginInstance = MentionsPlugin.get(pm)!;

      pm.input.insertText(0, 0, '@');
      pm.flush();
      pm.tr.typeText('oscar').apply();

      pluginInstance.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar'
      });

      expect(pm.doc.nodeAt(1)).to.be.of.nodeType(MentionNodeType);
    });

  });

});
