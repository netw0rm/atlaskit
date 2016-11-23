import { default as plugin } from '../src';
import { MentionQueryMarkType, Mention } from 'ak-editor-schema';
import { ProseMirror, Schema, ResolvedPos,
         schema as schemaBasic } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { chaiPlugin, fixtures } from 'ak-editor-test';

chai.use(chaiPlugin);
chai.use(sinonChai);

const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    mention: { type: Mention, group: 'inline' }
  }),
  marks: {
    mention_query: MentionQueryMarkType
  }
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

  describe('keymap when mention query is active', () => {
    let pm: ProseMirror, pluginInstance: any;

    beforeEach(() => {
      pm = makeEditor(container());
      pluginInstance = plugin.get(pm);
      pm.input.insertText(0, 0, '@');
      pm.flush();
    });

    it('should ignore "Up"-key if no "onSelectPrevious" is attached', () => {
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 38;
      pm.input.dispatchKey('Up', keyDownEvent);
    });

    it('should ignore "Down"-key if no "onSelectNext" is attached', () => {
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 40;
      pm.input.dispatchKey('Down', keyDownEvent);
    });

    it('should ignore "Enter"-key if no "onSelectCurrent" is attached', () => {
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 13;
      pm.input.dispatchKey('Enter', keyDownEvent);
    });

    it('should trigger "onSelectPrevious" when "Up"-key is pressed', () => {
      const spy = sinon.spy();
      pluginInstance.onSelectPrevious = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 38;
    
      pm.input.dispatchKey('Up', keyDownEvent);
      expect(spy).to.have.been.called;
    });

    it('should trigger "onSelectNext" when "Down"-key is pressed', () => {
      const spy = sinon.spy();
      pluginInstance.onSelectNext = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 40;
    
      pm.input.dispatchKey('Down', keyDownEvent);
      expect(spy).to.have.been.called;
    });

    it('should trigger "onSelectCurrent" when "Enter"-key is pressed', () => {
      const spy = sinon.spy();
      pluginInstance.onSelectCurrent = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 13;
    
      pm.input.dispatchKey('Enter', keyDownEvent);
      expect(spy).to.have.been.called;
    });

    it('should trigger "dismiss" when "Esc"-key is pressed', () => {
      const spy = sinon.spy(pluginInstance, 'dismiss');
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 27;
    
      pm.input.dispatchKey('Esc', keyDownEvent);
      expect(spy).to.have.been.called;
    });

  });

  describe('handleSelectedMention', () => {

    it('should replace mention-query-mark with mention-node', () => {
      const pm = makeEditor(container());
      const pluginInstance = plugin.get(pm);

      pm.input.insertText(0, 0, '@');
      pm.flush();
      pm.tr.typeText('oscar').apply();

      pluginInstance.handleSelectedMention({
        detail: 'Oscar Wallhult',
        mentionName: '@oscar'
      });

      expect(pm.doc.nodeAt(1)).to.be.of.nodeType(Mention);
    });

  });

});
