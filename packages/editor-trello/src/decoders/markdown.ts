import {
  MarkdownParser as PMMarkdownParser,
} from '@atlaskit/editor-core';
import schema from '../schema/schema';
import * as MarkdownIt from 'markdown-it';
import * as emoji from 'markdown-it-emoji';

let tokenizer = MarkdownIt('commonmark', {html: false});
tokenizer.use(emoji);

let emojicodes = [
  {'id':'😀','value':'1f600'},
  {'id':'😬','value':'1f62c'},
  {'id':'😁','value':'1f601'},
  {'id':'😂','value':'1f602'},
  {'id':'😃','value':'1f603'},
  {'id':'😄','value':'1f604'},
  {'id':'😅','value':'1f605'},
  {'id':'☹️','value':'2639'},
  {'id':'👍','value':'1f44d'},
  {'id':'👎','value':'1f44e'},
  {'id':'🐶','value':'1f436'},
  {'id':'🐱','value':'1f431'},
  {'id':'🐭','value':'1f42d'},
  {'id':'🐹','value':'1f439'},
  {'id':'🐰','value':'1f430'},
  {'id':'🐻','value':'1f43b'},
  {'id':'🐼','value':'1f43c'},
  {'id':'🐨','value':'1f428'},
  {'id':'🐯','value':'1f42f'},
  {'id':'💥','value':'1f4a5'},
  {'id':'🍏','value':'1f34f'},
  {'id':'🍎','value':'1f34e'},
  {'id':'🍐','value':'1f350'},
  {'id':'🍊','value':'1f34a'},
  {'id':'🍋','value':'1f34b'},
  {'id':'🍌','value':'1f34c'},
  {'id':'🍉','value':'1f349'},
  {'id':'🍇','value':'1f347'},
  {'id':'🍓','value':'1f353'},
  {'id':'🍈','value':'1f348'},
  {'id':'⚽️','value':'26bd'},
  {'id':'🏀','value':'1f3c0'},
  {'id':'🏈','value':'1f3c8'},
  {'id':'⚾️','value':'26be'},
  {'id':'🎾','value':'1f3be'},
  {'id':'🏐','value':'1f3d0'},
  {'id':'🏉','value':'1f3c9'},
  {'id':'🎱','value':'1f3b1'},
  {'id':'⛳️','value':'26f3'},
  {'id':'🏌️','value':'1f3cc'},
  {'id':'🚗','value':'1f697'},
  {'id':'🚕','value':'1f695'},
  {'id':'🚙','value':'1f699'},
  {'id':'🚌','value':'1f68c'},
  {'id':'🚎','value':'1f68e'},
  {'id':'🏎️','value':'1f3ce'},
  {'id':'🚓','value':'1f693'},
  {'id':'🚑','value':'1f691'},
  {'id':'🚒','value':'1f692'},
  {'id':'🚐','value':'1f690'},
  {'id':'⌚️','value':'231a'},
  {'id':'📱','value':'1f4f1'},
  {'id':'📲','value':'1f4f2'},
  {'id':'💻','value':'1f4bb'},
  {'id':'⌨️','value':'2328'},
  {'id':'🖥️','value':'1f5a5'},
  {'id':'🖨️','value':'1f5a8'},
  {'id':'🖱️','value':'1f5b1'},
  {'id':'🖲️','value':'1f5b2'},
  {'id':'🕹️','value':'1f579'},
  {'id':'❤️','value':'2764'},
  {'id':'💛','value':'1f49b'},
  {'id':'💚','value':'1f49a'},
  {'id':'💙','value':'1f499'},
  {'id':'💜','value':'1f49c'},
  {'id':'💔','value':'1f494'},
  {'id':'❣️','value':'2763'},
  {'id':'💕','value':'1f495'},
  {'id':'💞','value':'1f49e'},
  {'id':'❔','value':'2754'},
  {'id':'🇦🇨','value':'1f1e6-1f1e8'},
  {'id':'🇦🇫','value':'1f1e6-1f1eb'},
  {'id':'🇦🇱','value':'1f1e6-1f1f1'},
  {'id':'🇩🇿','value':'1f1e9-1f1ff'},
  {'id':'🇦🇩','value':'1f1e6-1f1e9'},
  {'id':'🇦🇴','value':'1f1e6-1f1f4'},
  {'id':'🇦🇮','value':'1f1e6-1f1ee'},
  {'id':'🇦🇬','value':'1f1e6-1f1ec'},
  {'id':'🇦🇷','value':'1f1e6-1f1f7'},
  {'id':'🇦🇲','value':'1f1e6-1f1f2'}
  ];

export default new PMMarkdownParser(schema, tokenizer, {
  blockquote: {block: 'blockquote'},
  paragraph: {block: 'paragraph'},
  list_item: {block: 'listItem'},
  bullet_list: {block: 'bulletList'},
  ordered_list: {block: 'orderedList', attrs: function (tok) { return ({order: +tok.attrGet('order') || 1}); }},
  // heading: {block: "heading", attrs: function (tok) { return ({level: +tok.tag.slice(1)}); }},
  codeBlock: {block: 'codeBlock'},
  fence: {block: 'codeBlock'},
  emoji: {node: 'emoji',  attrs: function (tok) {
    let emoji = emojicodes.find((code) => code.id === tok.content);
    return {shortName: `:${tok.markup}:`, text: tok.content, id: emoji ? emoji.value : ''};
  }},
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
});)
