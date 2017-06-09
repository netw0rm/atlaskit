import {
  MarkdownParser as PMMarkdownParser,
} from '@atlaskit/editor-core';
import schema from '../schema/schema';
import * as MarkdownIt from 'markdown-it';

export default new PMMarkdownParser(schema, MarkdownIt('commonmark', {html: false}), {
  blockquote: {block: 'blockquote'},
  paragraph: {block: 'paragraph'},
  list_item: {block: 'listItem'},
  bullet_list: {block: 'bulletList'},
  ordered_list: {block: 'orderedList', attrs: function (tok) { return ({order: +tok.attrGet('order') || 1}); }},
  // heading: {block: "heading", attrs: function (tok) { return ({level: +tok.tag.slice(1)}); }},
  codeBlock: {block: 'codeBlock'},
  fence: {block: 'codeBlock'},
  // image: {node: "image", attrs: function (tok) { return ({
  //   src: tok.attrGet("src"),
  //   title: tok.attrGet("title") || null,
  //   alt: tok.children[0] && tok.children[0].content || null
  // }); }},
  hardbreak: {node: 'hardBreak'},

  em: {mark: 'em'},
  strong: {mark: 'strong'},
  link: {mark: 'link', attrs: function (tok) { return ({
    href: tok.attrGet('href'),
    title: tok.attrGet('title') || null
  }); }},
  code_inline: {mark: 'code'}
});
