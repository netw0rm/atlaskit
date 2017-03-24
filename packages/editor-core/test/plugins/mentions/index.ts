// import * as chai from 'chai';
// import { expect } from 'chai';
// import * as sinon from 'sinon';
// import { ListsPlugin, MentionNodeType, MentionQueryMarkType, ProseMirror, Schema, schema as schemaBasic, Text } from '../../../src';
// import BlockTypePlugin from '../../../src/plugins/block-type';
// import MentionsPlugin from '../../../src/plugins/mentions';
// import { chaiPlugin, fixtures } from '../../../src/test-helper';

// chai.use(chaiPlugin);

// const container = fixtures();

// describe('mentions', () => {
//   const schema: Schema = new Schema({
//     nodes: schemaBasic.nodeSpec.append({
//       mention: { type: MentionNodeType, group: 'inline' }
//     }),
//     marks: {
//       mention_query: MentionQueryMarkType
//     }
//   });

//   const makeEditor = (container: Node) => {
//     return new ProseMirror({
//       schema: schema,
//       plugins: [ListsPlugin, MentionsPlugin, BlockTypePlugin],
//       place: container
//     });
//   };

//   it('defines a name for use by the ProseMirror plugin registry ', () => {
//     const plugin = MentionsPlugin as any; // .State is not public API.
//     expect(plugin.State.name).is.be.a('string');
//   });

//   describe('keymap', () => {
//     xit('should bind keymap when query is active', () => {
//       const pm = makeEditor(container());
//       pm.input.insertText(0, 0, '@');
//       pm.flush();
//       expect(pm.input.keymaps.filter((k: any) => k.map.options.name === 'mentions-plugin-keymap').length).to.equal(1);
//     });

//     xit('should unbind keymap when dismissed', () => {
//       const pm = makeEditor(container());
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 27;

//       pm.input.dispatchKey('Esc', keyDownEvent);
//       expect(pm.input.keymaps.filter((k: any) => k.map.options.name === 'mentions-plugin-keymap').length).to.equal(0);
//     });

//     it('should ignore "Up"-key if no "onSelectPrevious" is attached', () => {
//       const pm = makeEditor(container());
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 38;
//       pm.input.dispatchKey('Up', keyDownEvent);
//     });

//     it('should ignore "Down"-key if no "onSelectNext" is attached', () => {
//       const pm = makeEditor(container());
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 40;
//       pm.input.dispatchKey('Down', keyDownEvent);
//     });

//     it('should ignore "Enter"-key if no "onSelectCurrent" is attached', () => {
//       const pm = makeEditor(container());
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 13;
//       pm.input.dispatchKey('Enter', keyDownEvent);
//     });

//     it('should ignore "Space"-key if no "onTrySelectCurrent" is attached', () => {
//       const pm = makeEditor(container());
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 32;
//       pm.input.dispatchKey('Space', keyDownEvent);
//     });

//     it('should trigger "onSelectPrevious" when "Up"-key is pressed', () => {
//       const pm = makeEditor(container());
//       const pluginState = MentionsPlugin.get(pm)!;
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const spy = sinon.spy();
//       pluginState.onSelectPrevious = spy;
//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 38;

//       pm.input.dispatchKey('Up', keyDownEvent);
//       expect(spy.called).to.equal(true);
//     });

//     it('should trigger "onSelectNext" when "Down"-key is pressed', () => {
//       const pm = makeEditor(container());
//       const pluginState = MentionsPlugin.get(pm)!;
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const spy = sinon.spy();
//       pluginState.onSelectNext = spy;
//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 40;

//       pm.input.dispatchKey('Down', keyDownEvent);
//       expect(spy.called).to.equal(true);
//     });

//     it('should trigger "onSelectCurrent" when "Enter"-key is pressed', () => {
//       const pm = makeEditor(container());
//       const pluginState = MentionsPlugin.get(pm)!;
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const spy = sinon.spy();
//       pluginState.onSelectCurrent = spy;
//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 13;

//       pm.input.dispatchKey('Enter', keyDownEvent);
//       expect(spy.called).to.equal(true);
//     });

//     it('should trigger "onTrySelectCurrent" when "Space"-key is pressed', () => {
//       const pm = makeEditor(container());
//       const pluginState = MentionsPlugin.get(pm)!;
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const spy = sinon.spy();
//       pluginState.onTrySelectCurrent = spy;
//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 32;

//       pm.input.dispatchKey('Space', keyDownEvent);
//       expect(spy.called).to.equal(true);
//     });

//     it('should trigger "dismiss" when "Esc"-key is pressed', () => {
//       const pm = makeEditor(container());
//       const pluginState = MentionsPlugin.get(pm)!;
//       pm.input.insertText(0, 0, '@');
//       pm.flush();

//       const spy = sinon.spy(pluginState, 'dismiss');
//       const keyDownEvent = new CustomEvent('keydown');
//       (keyDownEvent as any).keyCode = 27;

//       pm.input.dispatchKey('Esc', keyDownEvent);
//       expect(spy.called).to.equal(true);
//     });

//   });

//   describe('insertMention', () => {

//     it('should replace mention-query-mark with mention-node', () => {
//       const pm = makeEditor(container());
//       const pluginInstance = MentionsPlugin.get(pm)!;

//       pm.input.insertText(0, 0, '@');
//       pm.flush();
//       pm.tr.typeText('oscar').apply();

//       pluginInstance.insertMention({
//         name: 'Oscar Wallhult',
//         mentionName: 'oscar',
//         id: '1234'
//       });

//       expect(pm.doc.nodeAt(1)).to.be.of.nodeType(MentionNodeType);
//     });

//     it('should insert a space after the mention-node', () => {
//       const pm = makeEditor(container());
//       const pluginInstance = MentionsPlugin.get(pm)!;

//       pm.input.insertText(0, 0, '@');
//       pm.flush();
//       pm.tr.typeText('oscar').apply();

//       pluginInstance.insertMention({
//         name: 'Oscar Wallhult',
//         mentionName: 'oscar',
//         id: '1234'
//       });

//       expect(pm.doc.nodeAt(2)).to.be.of.nodeType(Text);
//     });

//     it('should allow inserting multiple @-mentions next to eachother', () => {
//       const pm = makeEditor(container());
//       const pluginInstance = MentionsPlugin.get(pm)!;

//       pm.input.insertText(0, 0, '@');
//       pm.flush();
//       pm.tr.typeText('oscar').apply();

//       pluginInstance.insertMention({
//         name: 'Oscar Wallhult',
//         mentionName: 'oscar',
//         id: '1234'
//       });

//       pm.input.insertText(2, 2, '@');
//       pm.flush();
//       pm.tr.typeText('brad').apply();

//       pluginInstance.insertMention({
//         name: 'Bradley Ayers',
//         mentionName: 'brad',
//         id: '5678'
//       });

//       expect(pm.doc.nodeAt(1)).to.be.of.nodeType(MentionNodeType);
//       expect(pm.doc.nodeAt(2)).to.be.of.nodeType(MentionNodeType);
//     });

//     it('should allow inserting @-mention on new line after hard break', () => {
//       const pm = makeEditor(container());
//       const pluginInstance = MentionsPlugin.get(pm)!;
//       const blockTypePluginInstance = BlockTypePlugin.get(pm)!;

//       blockTypePluginInstance.insertNewLine();

//       pm.input.insertText(2, 2, '@');
//       pm.flush();
//       pm.tr.typeText('oscar').apply();

//       pluginInstance.insertMention({
//         name: 'Oscar Wallhult',
//         mentionName: 'oscar',
//         id: '1234'
//       });

//       expect(pm.doc.nodeAt(2)).to.be.of.nodeType(MentionNodeType);
//     });

//     it('should not break list into two when inserting mention inside list item', () => {
//       const pm = makeEditor(container());
//       const pluginInstance = MentionsPlugin.get(pm)!;
//       const listsPluginInstance = ListsPlugin.get(pm)!;

//       listsPluginInstance.toggleBulletList();

//       pm.input.insertText(3, 3, '@');
//       pm.flush();
//       pm.tr.typeText('oscar').apply();

//       pluginInstance.insertMention({
//         name: 'Oscar Wallhult',
//         mentionName: 'oscar',
//         id: '1234'
//       });

//       expect(pm.doc.nodeAt(3)).to.be.of.nodeType(MentionNodeType);
//       expect(pm.doc.nodeAt(5)).to.equal(null);
//     });

//     it('should insert only 1 mention at a time inside blockqoute', () => {
//       const pm = makeEditor(container());
//       const pluginInstance = MentionsPlugin.get(pm)!;
//       const blockTypePluginInstance = BlockTypePlugin.get(pm)!;

//       blockTypePluginInstance.toggleBlockType('blockquote');

//       pm.input.insertText(2, 2, '@');
//       pm.flush();
//       pm.tr.typeText('oscar').apply();

//       pluginInstance.insertMention({
//         name: 'Oscar Wallhult',
//         mentionName: 'oscar',
//         id: '1234'
//       });

//       expect(pm.doc.nodeAt(2)).to.be.of.nodeType(MentionNodeType);
//       expect(pm.doc.nodeAt(5)).to.equal(null);
//     });
//   });
// });
