import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { EmojiNodeType, EmojiQueryMarkType, ProseMirror, Schema, schema as schemaBasic } from '../../../src';
import BlockTypePlugin from '../../../src/plugins/block-type';
import EmojisPlugin from '../../../src/plugins/emojis';
import { chaiPlugin, fixtures } from '../../../src/test-helper';

chai.use(chaiPlugin);

const container = fixtures();

const smileEmojiId = {
  id: 'smile'
};

const smileEmoji = {
  id: 'smile',
  name: 'smiling face with open mouth and smiling eyes',
  shortcut: 'smile',
  representation: {
    sprite: {
      url: 'https://path-to-spritesheet.png',
      row: 1,
      column: 1,
    }
  }
};

describe('emojis', () => {
  const schema: Schema = new Schema({
    nodes: schemaBasic.nodeSpec.append({
      emoji: { type: EmojiNodeType, group: 'inline' }
    }),
    marks: {
      emoji_query: EmojiQueryMarkType
    }
  });

  const makeEditor = (container: Node) => {
    return new ProseMirror({
      schema: schema,
      plugins: [EmojisPlugin, BlockTypePlugin],
      place: container
    });
  };


  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = EmojisPlugin as any; // .State is not public API.
    expect(plugin.State.name).is.be.a('string');
  });

  describe('keymap', () => {
    xit('should bind keymap when query is active', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, ':');
      pm.flush();
      expect(pm.input.keymaps.filter((k: any) => k.map.options.name === 'emojis-plugin-keymap').length).to.equal(1);
    });

    xit('should unbind keymap when dismissed', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, ':');
      pm.flush();

      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 27;

      pm.input.dispatchKey('Esc', keyDownEvent);
      expect(pm.input.keymaps.filter((k: any) => k.map.options.name === 'emojis-plugin-keymap').length).to.equal(0);
    });

    it('should ignore "Up"-key if no "onSelectPrevious" is attached', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, ':');
      pm.flush();

      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 38;
      pm.input.dispatchKey('Up', keyDownEvent);
    });

    it('should ignore "Down"-key if no "onSelectNext" is attached', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, ':');
      pm.flush();

      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 40;
      pm.input.dispatchKey('Down', keyDownEvent);
    });

    it('should ignore "Enter"-key if no "onSelectCurrent" is attached', () => {
      const pm = makeEditor(container());
      pm.input.insertText(0, 0, ':');
      pm.flush();

      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 13;
      pm.input.dispatchKey('Enter', keyDownEvent);
    });

    it('should trigger "onSelectPrevious" when "Up"-key is pressed', () => {
      const pm = makeEditor(container());
      const pluginState = EmojisPlugin.get(pm)!;
      pm.input.insertText(0, 0, ':');
      pm.flush();

      const spy = sinon.spy();
      pluginState.onSelectPrevious = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 38;

      pm.input.dispatchKey('Up', keyDownEvent);
      expect(spy.called).to.equal(true);
    });

    it('should trigger "onSelectNext" when "Down"-key is pressed', () => {
      const pm = makeEditor(container());
      const pluginState = EmojisPlugin.get(pm)!;
      pm.input.insertText(0, 0, ':');
      pm.flush();

      const spy = sinon.spy();
      pluginState.onSelectNext = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 40;

      pm.input.dispatchKey('Down', keyDownEvent);
      expect(spy.called).to.equal(true);
    });

    it('should trigger "onSelectCurrent" when "Enter"-key is pressed', () => {
      const pm = makeEditor(container());
      const pluginState = EmojisPlugin.get(pm)!;
      pm.input.insertText(0, 0, ':');
      pm.flush();

      const spy = sinon.spy();
      pluginState.onSelectCurrent = spy;
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 13;

      pm.input.dispatchKey('Enter', keyDownEvent);
      expect(spy.called).to.equal(true);
    });

    it('should trigger "dismiss" when "Esc"-key is pressed', () => {
      const pm = makeEditor(container());
      const pluginState = EmojisPlugin.get(pm)!;
      pm.input.insertText(0, 0, ':');
      pm.flush();

      const spy = sinon.spy(pluginState, 'dismiss');
      const keyDownEvent = new CustomEvent('keydown');
      (keyDownEvent as any).keyCode = 27;

      pm.input.dispatchKey('Esc', keyDownEvent);
      expect(spy.called).to.equal(true);
    });

  });

  describe('insertEmoji', () => {

    it('should replace emoji-query-mark with emoji-node', () => {
      const pm = makeEditor(container());
      const pluginInstance = EmojisPlugin.get(pm)!;

      pm.input.insertText(0, 0, ':');
      pm.flush();
      pm.tr.typeText('smile').apply();

      pluginInstance.insertEmoji(smileEmojiId, smileEmoji);

      expect(pm.doc.nodeAt(1)).to.be.of.nodeType(EmojiNodeType);
    });

    it('should allow inserting multiple emojis next to eachother', () => {
      const pm = makeEditor(container());
      const pluginInstance = EmojisPlugin.get(pm)!;

      pm.input.insertText(0, 0, ':');
      pm.flush();
      pm.tr.typeText('smile').apply();

      pluginInstance.insertEmoji(smileEmojiId, smileEmoji);
      pm.flush();

      pm.input.insertText(2, 2, ':');
      pm.flush();
      pm.tr.typeText('smile').apply();

      pluginInstance.insertEmoji(smileEmojiId, smileEmoji);
      pm.flush();

      expect(pm.doc.nodeAt(1)).to.be.of.nodeType(EmojiNodeType);
      expect(pm.doc.nodeAt(2)).to.be.of.nodeType(EmojiNodeType);
    });

    it('should allow inserting emoji on new line after hard break', () => {
      const pm = makeEditor(container());
      const pluginInstance = EmojisPlugin.get(pm)!;
      const blockTypePluginInstance = BlockTypePlugin.get(pm)!;

      blockTypePluginInstance.insertNewLine();

      pm.input.insertText(2, 2, ':');
      pm.flush();
      pm.tr.typeText('smile').apply();

      pluginInstance.insertEmoji(smileEmojiId, smileEmoji);
      pm.flush();

      expect(pm.doc.nodeAt(2)).to.be.of.nodeType(EmojiNodeType);
    });
  });

});
