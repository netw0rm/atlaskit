import { nodeFactory, markFactory } from '../src';
import {
  DelMarkType,
  DocNodeType,
  BlockQuoteNodeType,
  ImageNodeType,
  ParagraphNodeType,
  Text,
  LinkMarkType,
  BulletListNodeType,
  HeadingNodeType,
  ListItemNodeType,
  OrderedListNodeType,
  EmMarkType,
  MonoMarkType,
  StrikeMarkType,
  StrongMarkType,
  SubSupMarkType,
  UnderlineMarkType
} from '../src';
import { Schema } from '../src';

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
    plain: { type: ParagraphNodeType, content: 'text' },
  },

  marks: {
    link: LinkMarkType,
    del: DelMarkType,
    em: EmMarkType,
    mono: MonoMarkType,
    strike: StrikeMarkType,
    strong: StrongMarkType,
    subsup: SubSupMarkType,
    u: UnderlineMarkType,
  },
});

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

export const plain = nodeFactory(schema.nodes.plain);
export const em = markFactory(schema.marks.em);
export const mono = markFactory(schema.marks.mono);
export const strike = markFactory(schema.marks.strike);
export const strong = markFactory(schema.marks.strong);
export const sub = markFactory(schema.marks.subsup, { type: 'sub' });
export const sup = markFactory(schema.marks.subsup, { type: 'sup' });
export const u = markFactory(schema.marks.u);
