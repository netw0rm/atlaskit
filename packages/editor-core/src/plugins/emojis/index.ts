// import Keymap from 'browserkeymap';
// import { inputRules, Plugin, ProseMirror, Schema } from '../../prosemirror';
// import { EmojiProvider } from '@atlaskit/emoji';

// import {
//   EmojiNodeType,
//   EmojiQueryMarkType
// } from '../../schema';

// import { emojiQueryRule } from './input-rules';

// export type StateChangeHandler = (state: EmojisPluginState) => any;

// export interface Options {
//   emojiProvider: Promise<EmojiProvider>;
// }

// export class EmojisPluginState {
//   private pm: PM;
//   private hasKeymap = false;
//   private changeHandlers: StateChangeHandler[] = [];
//   private emojiProvider: Promise<EmojiProvider>;

//   query?: string;
//   queryActive = false;
//   anchorElement?: HTMLElement;
//   keymap: Keymap;
//   onSelectPrevious = () => { };
//   onSelectNext = () => { };
//   onSelectCurrent = () => { };

//   setEmojiProvider(emojiProvider: Promise<EmojiProvider>) {
//     this.emojiProvider = emojiProvider;

//     const emojiNodeType = this.pm.schema.nodeType('emoji') as EmojiNodeType;
//     if (emojiNodeType) {
//       emojiNodeType.setEmojiProvider(this.emojiProvider);
//     }
//   }

//   constructor(pm: PM, options: Options) {
//     this.pm = pm;
//     this.emojiProvider = options.emojiProvider;

//     this.keymap = new Keymap({
//       Up: () => this.onSelectPrevious(),
//       Down: () => this.onSelectNext(),
//       Enter: () => this.onSelectCurrent(),
//       Esc: () => this.dismiss(),
//     }, {
//         name: 'emojis-plugin-keymap'
//       });

//     // add the input rules to insert emojis
//     if (pm.schema.nodes.emoji) {
//       inputRules.ensure(pm).addRule(emojiQueryRule);
//     }

//     if (pm.schema.marks.emoji_query) {
//       pm.updateScheduler([
//         pm.on.selectionChange,
//         pm.on.change,
//         pm.on.activeMarkChange,
//       ], () => this.update());
//     }

//     this.setEmojiProvider(options.emojiProvider);
//   }

//   private update(): void {
//     let dirty = false;

//     const marks = this.pm.activeMarks();
//     if (this.pm.schema.marks.emoji_query.isInSet(marks)) {
//       if (!this.queryActive) {
//         dirty = true;
//         this.queryActive = true;
//       }

//       const nodeBefore = this.pm.selection.$from.nodeBefore;
//       const nodeAfter = this.pm.selection.$from.nodeAfter;

//       const newQuery = (nodeBefore ? nodeBefore.textContent : '').substr(1) + (nodeAfter && this.pm.schema.marks.emoji_query.isInSet(nodeAfter.marks) ? nodeAfter.textContent : '');
//       if (this.query !== newQuery) {
//         dirty = true;
//         this.query = newQuery;

//       }
//     } else if (this.queryActive) {
//       dirty = true;
//       this.dismiss();
//       return;
//     }

//     const newAnchorElement = this.pm.wrapper.querySelector('[data-emoji-query]') as HTMLElement;
//     if (newAnchorElement !== this.anchorElement) {
//       dirty = true;
//       this.anchorElement = newAnchorElement;
//     }

//     if (dirty) {
//       if (this.queryActive) {
//         if (!this.hasKeymap) {
//           this.pm.addKeymap(this.keymap, 100);
//           this.hasKeymap = true;
//         }
//       } else {
//         if (this.hasKeymap) {
//           this.pm.removeKeymap(this.keymap);
//           this.hasKeymap = false;
//         }
//       }
//       this.changeHandlers.forEach(cb => cb(this));
//     }
//   }

//   dismiss() {
//     this.queryActive = false;
//     this.query = undefined;

//     this.pm.tr.removeMark(0, this.pm.doc.nodeSize - 2, this.pm.schema.marks.emoji_query).applyAndScroll();

//     if (this.hasKeymap) {
//       this.pm.removeKeymap(this.keymap);
//       this.hasKeymap = false;
//     }
//     this.changeHandlers.forEach(cb => cb(this));
//   }

//   private findEmojiQueryMark() {
//     let start = this.pm.selection.from;
//     let node = this.pm.doc.nodeAt(start);

//     while (start > 0 && (!node || !this.pm.schema.marks.emoji_query.isInSet(node.marks))) {
//       start--;
//       node = this.pm.doc.nodeAt(start);
//     }

//     let end = start;

//     if (node && this.pm.schema.marks.emoji_query.isInSet(node.marks)) {
//       start = this.pm.doc.resolve(start).start(2) - 1;
//       end = start + node.nodeSize;
//     }

//     return { start, end };
//   }

//   insertEmoji(emojiId?: EmojiId, emojiData?: Emoji) {
//     const { emoji } = this.pm.schema.nodes;
//     const { emojiProvider } = this;

//     if (emoji && emojiId && emojiData) {
//       const { shortcut } = emojiData;
//       const { start, end } = this.findEmojiQueryMark();
//       const node = emoji.create({
//         ...emojiId,
//         shortcut,
//         emojiProvider,
//       });
//       this.pm.tr.replaceWith(start, end, node).apply();
//     } else {
//       this.dismiss();
//     }
//   }

//   subscribe(cb: StateChangeHandler) {
//     this.changeHandlers.push(cb);
//     cb(this);
//   }

//   unsubscribe(cb: StateChangeHandler) {
//     this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
//   }
// }

// // IE11 + multiple prosemirror fix.
// Object.defineProperty(EmojisPluginState, 'name', { value: 'EmojisPluginState' });

// export default new Plugin(EmojisPluginState);

// export interface EmojiId {
//   id: string;
// }

// export interface Emoji {
//   id: string;
//   name?: string;
//   shortcut: string;
// }

// export interface S extends Schema {
//   nodes: {
//     emoji?: EmojiNodeType
//   };

//   marks: {
//     emoji_query: EmojiQueryMarkType;
//   };
// }

// export interface PM extends ProseMirror {
//   schema: S;
// }
