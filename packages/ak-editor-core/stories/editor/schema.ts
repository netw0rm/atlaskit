// import {
//   BlockQuoteNodeType,
//   BulletListNodeType,
//   CodeBlockNodeType,
//   DocNodeType,
//   EmMarkType,
//   EmojiNodeType,
//   HardBreakNodeType,
//   HeadingNodeType,
//   HorizontalRuleNodeType,
//   ImageNodeType,
//   LinkMarkType,
//   ListItemNodeType,
//   MentionNodeType,
//   MonoMarkType,
//   OrderedListNodeType,
//   ParagraphNodeType,
//   Schema,
//   StrikeMarkType,
//   StrongMarkType,
//   Text
// } from '../../';

import { Schema } from '../../src/prosemirror/future';
import { bullet_list } from '../../src/schema/nodes/bullet-list';
import { doc } from '../../src/schema/nodes/doc';
import { list_item } from '../../src/schema/nodes/list-item';
import { ordered_list } from '../../src/schema/nodes/ordered-list';
import { paragraph } from '../../src/schema/nodes/paragraph';
import { text } from '../../src/schema/nodes/text';

const nodes = { doc, paragraph, ordered_list, bullet_list, list_item, text };
const marks = {};

export default new Schema<typeof nodes, typeof marks>({ nodes, marks });
  // nodes: {
  //   doc,

  //   paragraph,
    // blockquote: { type: BlockQuoteNodeType, content: 'block+', group: 'block' },
    // ordered_list: { type: OrderedListNodeType, content: 'list_item+', group: 'block' },
    // bullet_list: { type: BulletListNodeType, content: 'list_item+', group: 'block' },
    // horizontal_rule: { type: HorizontalRuleNodeType, group: 'block' },
    // heading: { type: HeadingNodeType, content: 'inline<_>*', group: 'block' },

    // list_item: { type: ListItemNodeType, content: 'paragraph block*' },

    // text: { type: Text, group: 'inline' },
    // image: { type: ImageNodeType, group: 'inline' },
    // hard_break: { type: HardBreakNodeType, group: 'inline' },

    // code_block: { type: CodeBlockNodeType, content: 'text*', group: 'block' },
    // mention: { type: MentionNodeType, group: 'inline' },
    // emoji: { type: EmojiNodeType, group: 'inline' },
//   },

//   // Note: Marks are applied in the order they are defined.
//   marks: {
//     // link: LinkMarkType,
//     // em: EmMarkType,
//     // strong: StrongMarkType,
//     // mono: MonoMarkType,
//     // strike: StrikeMarkType
//   },
// });

// export interface BitbucketSchema extends Schema {
//   nodes: {
//     doc: DocNodeType;

//     paragraph: ParagraphNodeType;
//     // blockquote: BlockQuoteNodeType;
//     // ordered_list: OrderedListNodeType;
//     // bullet_list: BulletListNodeType;
//     // horizontal_rule: HorizontalRuleNodeType;
//     // heading: HeadingNodeType;

//     // list_item: ListItemNodeType;

//     // text: Text;
//     // image: ImageNodeType;
//     // hard_break: HardBreakNodeType;

//     // code_block: CodeBlockNodeType;
//     // mention: MentionNodeType;
//     // emoji: EmojiNodeType;
//   };

//   marks: {
//     // link: LinkMarkType;
//     // em: EmMarkType;
//     // strong: StrongMarkType;
//     // mono: MonoMarkType;
//     // strike: StrikeMarkType;
//   };
// }
