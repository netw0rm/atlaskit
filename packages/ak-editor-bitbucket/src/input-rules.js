/* eslint-disable */
import { Plugin } from 'prosemirror/dist/edit';
import { InputRule, inputRules as pmInputRules, allInputRules,
       blockQuoteRule, bulletListRule, codeBlockRule,
       orderedListRule, headingRule} from 'prosemirror/dist/inputrules';

import hyperlink from 'atlassian-editorkit-hyperlink-plugin/dist/autoconvert';

const buildBlockRules = function(nodes) {
  const rules = [];

  if (nodes.blockquote) {
    rules.push(blockQuoteRule(nodes.blockquote));
  }

  if (nodes.code_block) {
    rules.push(codeBlockRule(nodes.code_block));
  }

  if (nodes.bullet_list) {
    rules.push(bulletListRule(nodes.bullet_list));
  }

  if (nodes.ordered_list) {
    rules.push(orderedListRule(nodes.ordered_list));
  }

  if (nodes.heading) {
    rules.push(headingRule(nodes.heading, 3));
  }

  return rules
}

function replaceWithMark(pm, match, pos, mark) {
  const schema = pm.schema;
  const to = pos;
  const from = pos - match[1].length;
  const markType = schema.mark(mark);

  pm.tr.replaceWith(from, to, schema.text(match[2], markType)).apply();
  pm.removeActiveMark(markType);
  return true
}

function replaceWithNode(pm, match, pos, node) {
  const start = pos - match[0].length;
  const end = pos;

  pm.tr.delete(start, end).insert(start, node).apply();
  return true
}

// **string** should bold the text
const strongRule1 = new InputRule(/(\*\*([^\*]+)\*\*)$/, '*', (pm, match, pos) => {
  return replaceWithMark(pm, match, pos, 'strong')
});

// __string__ should bold the text
const strongRule2 = new InputRule(/(__([^_]+)__)$/, '_', (pm, match, pos) => {
  return replaceWithMark(pm, match, pos, 'strong')
});

// _string_ or *string* should change the text to italic
const emRule1 = new InputRule(/(?:[^\*]+)(\*([^\*]+?)\*)$|^(\*([^\*]+)\*)$/, '*', (pm, match, pos) => {
  match = match.filter((m) => m !== undefined);
  return replaceWithMark(pm, match, pos, 'em')
});

const emRule2 = new InputRule(/(?:[^_]+)(_([^_]+?)_)$|^(_([^_]+)_)$/, '_', (pm, match, pos) => {
  match = match.filter((m) => m !== undefined);
  return replaceWithMark(pm, match, pos, 'em')
});

// `string` should change the current text to inline code block
const inlineCodeRule = new InputRule(/(`([^`]+)`)$/, '`', (pm, match, pos) => {
  return replaceWithMark(pm, match, pos, 'code')
});

// [something](link) should convert to a hyperlink
const linkRule = new InputRule(/\[(\S+)\]\((\S+)\)$/, ')', (pm, match, pos) => {
  const schema = pm.schema;
  const to = pos;
  const from = pos - match[0].length;
  const markType = schema.mark('link', {href: match[2]});

  pm.tr.replaceWith(from, to, schema.text(match[1], markType)).apply();
  pm.removeActiveMark(markType);
  return true
});

// --- or *** should add a horizontal line
const hrRule1 = new InputRule(/\*\*\*$/, '*', (pm, match, pos) => {
  return replaceWithNode(pm, match, pos, pm.schema.nodes.horizontal_rule.create());
});

const hrRule2 = new InputRule(/\-\-\-|—\-|-\—$/, '-', (pm, match, pos) => {
  return replaceWithNode(pm, match, pos, pm.schema.nodes.horizontal_rule.create());
});

// ![Image](http://url/a.png) should add an image
// Note: You have to load this rule before the link rule.
const imgRule = new InputRule(/\!\[(\S+)\]\((\S+)\)$/, ')', (pm, match, pos) => {
  const attrs = {src: match[2], alt: match[1], title: match[1]};
  const node = pm.schema.nodes.image.create(attrs);
  return replaceWithNode(pm, match, pos, node);
});

const markdownRules = [ strongRule1, strongRule2, emRule1, emRule2,
                        inlineCodeRule, imgRule, linkRule, hrRule1, hrRule2
                      ];

// BitBucket typeahead rules
const mentionRule = new InputRule(/(?:^|\s)@$/, '@', (pm, match, pos) => {
  return pm.tr.delete(pos-1, pos).insert(pos-1, pm.schema.nodes.entity_inline.create({ data: '@' })).apply();
});

const emoticonRule = new InputRule(/(?:^|\s):$/, ':', (pm, match, pos) => {
  return pm.tr.delete(pos-1, pos).insert(pos-1, pm.schema.nodes.entity_inline.create({ data: ':' })).apply();
});

const entityRules = [ mentionRule, emoticonRule ];

export const inputRules = new Plugin(class {
  constructor(pm, options) {
    const blockRules = buildBlockRules(pm.schema.nodes);
    this.inputRules = [].concat(blockRules, markdownRules, entityRules);

    this.inputRules.push(hyperlink.inputRules);

    let rules = pmInputRules.ensure(pm);
    this.inputRules.forEach(rule => rules.addRule(rule));
  }

  detach(pm) {
    let rules = pmInputRules.ensure(pm);
    this.inputRules.forEach(rule => rules.removeRule(rule));
  }
});
