/*
import {
  BlockQuoteNodeType,
  BulletListNodeType,
  CodeBlockNodeType,
  DocNodeType,
  EmMarkType,
  HeadingNodeType,
  RuleNodeType,
  ImageNodeType,
  LinkMarkType,
  ListItemNodeType,
  MonoMarkType,
  OrderedListNodeType,
  PanelNodeType,
  ParagraphNodeType,
  Schema,
  StrikeMarkType,
  StrongMarkType,
  SubSupMarkType,
  Text,
  UnderlineMarkType
} from '../src';
import { markFactory, nodeFactory } from '../test-helper';

export const schema = new Schema({
  nodes: {
    doc: { type: DocNodeType, content: 'block+' },
    paragraph: { type: ParagraphNodeType, content: 'text<_>*', group: 'block' },
    unlinkable: { type: ParagraphNodeType, content: 'text*', group: 'block' },
    linkable: { type: ParagraphNodeType, content: 'text<link>*', group: 'block' },
    text: { type: Text },
    images: { type: ParagraphNodeType, content: '(text | image)*', group: 'block' },
    image: { type: ImageNodeType },
    bullet_list: { type: BulletListNodeType, content: 'list_item+', group: 'block' },
    heading: { type: HeadingNodeType, content: 'text<_>*', group: 'block' },
    list_item: { type: ListItemNodeType, content: 'paragraph+' },
    ordered_list: { type: OrderedListNodeType, content: 'list_item+', group: 'block' },
    blockquote: { type: BlockQuoteNodeType, content: 'block+', group: 'block' },
    panel: { type: PanelNodeType, content: 'block+', group: 'block' },
    plain: { type: ParagraphNodeType, content: 'text' },
    rule: {type: RuleNodeType, group: 'block' },
    code_block: { type: CodeBlockNodeType, content: 'text*', group: 'block' },
  },

  marks: {
    link: LinkMarkType,
    em: EmMarkType,
    mono: MonoMarkType,
    strike: StrikeMarkType,
    strong: StrongMarkType,
    subsup: SubSupMarkType,
    u: UnderlineMarkType,
  },
});
*/
import { Schema } from '../src/prosemirror';
import {
  doc,
  paragraph,
  text,
  em,
  strong,
  mono,
  strike,
  underline,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  rule
} from '../src/schema';

const nodes = {
  doc,
  paragraph,
  text,
  bullet_list: bulletList,
  ordered_list: orderedList,
  list_item: listItem,
  heading,
  blockquote,
  codeBlock,
  rule
};

const marks = {
  em,
  strong,
  mono,
  strike,
  underline
};

export const schema = new Schema<typeof nodes, typeof marks>({ nodes, marks });

/*
export const doc = nodeFactory(schema.nodes.doc);

export const unlinkable = nodeFactory(schema.nodes.unlinkable);
export const linkable = nodeFactory(schema.nodes.linkable);
export const link = (attrs: { href: string }) => markFactory(schema.marks.link, attrs);

export const noimages = nodeFactory(schema.nodes.paragraph);
export const images = nodeFactory(schema.nodes.images);
export const image = (attrs: { src: string }) => nodeFactory(schema.nodes.image, attrs)();

export const h1 = nodeFactory(schema.nodes.heading, { level: 1 });
export const li = nodeFactory(schema.nodes.list_item);
export const ol = nodeFactory(schema.nodes.ordered_list);
export const p = nodeFactory(schema.nodes.paragraph);
export const ul = nodeFactory(schema.nodes.bullet_list);
export const blockquote = nodeFactory(schema.nodes.blockquote);
export const panel = nodeFactory(schema.nodes.panel, { panelType: 'info' });
export const paragraph = nodeFactory(schema.nodes.paragraph);

// tslint:disable-next-line:variable-name
export const rule = nodeFactory(schema.nodes.rule);

export const plain = nodeFactory(schema.nodes.plain);
export const em = markFactory(schema.marks.em);
export const mono = markFactory(schema.marks.mono);
export const strike = markFactory(schema.marks.strike);
export const strong = markFactory(schema.marks.strong);
export const sub = markFactory(schema.marks.subsup, { type: 'sub' });
export const sup = markFactory(schema.marks.subsup, { type: 'sup' });
export const u = markFactory(schema.marks.u);
// tslint:disable-next-line:variable-name
export const code_block = (attrs: {} = {}) => nodeFactory(schema.nodes.code_block, attrs);
*/
