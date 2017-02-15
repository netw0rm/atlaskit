import {
  blockQuoteRule,
  bulletListRule,
  InputRule,
  inputRules,
  Node,
  NodeType,
  Plugin,
  ProseMirror,
  Schema,
  textblockTypeInputRule,
  wrappingInputRule
} from '../../prosemirror';
import { analyticsService, trackAndInvoke } from '../../analytics';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../block-type/transform-to-code-block';

// NOTE: There is a built in input rule for ordered lists in ProseMirror. However, that
// input rule will allow for a list to start at any given number, which isn't allowed in
// markdown (where a ordered list will always start on 1). This is a slightly modified
// version of that input rule.
const orderedListRule = (nodeType: NodeType): InputRule => {
  return wrappingInputRule(/^(\d+)\. $/, ' ', nodeType, (match: RegExpMatchArray) => ({}),
    (match, node) => node.childCount > 0);
};

const createTrackedInputRule = (analyticsEventName: string, rule: InputRule): InputRule => {
  if (typeof (rule.handler) !== 'function') {
    throw new SyntaxError('The provided cannot be tracked because it does not provide a callable handler');
  }

  rule.handler = trackAndInvoke(analyticsEventName, rule.handler);
  return rule;
};

const headingRule = (nodeType: NodeType, maxLevel: Number) => {
  return textblockTypeInputRule(
    new RegExp('^(#{1,' + maxLevel + '}) $'),
    ' ',
    nodeType,
    (match: string[]) => {
      const level = match[1].length;
      analyticsService.trackEvent(`atlassian.editor.format.heading${level}.autoformatting`);
      return ({ level });
    }
  );
};

const buildBlockRules = (schema: Schema): Array<InputRule> => {
  const rules = Array<InputRule>();
  const { heading, bullet_list, ordered_list, blockquote } = schema.nodes;

  if (heading) {
    rules.push(headingRule(heading, 6));
  }

  if (bullet_list) {
    rules.push(createTrackedInputRule('atlassian.editor.format.list.bullet.autoformatting', bulletListRule(bullet_list)));
  }

  if (ordered_list) {
    rules.push(createTrackedInputRule('atlassian.editor.format.list.numbered.autoformatting', orderedListRule(ordered_list)));
  }

  if (blockquote) {
    rules.push(createTrackedInputRule('atlassian.editor.format.blockquote.autoformatting', blockQuoteRule(blockquote)));
  }

  return rules;
};

function replaceWithNode(
  pm: ProseMirror,
  match: Array<string>,
  pos: number,
  node: Node
): boolean {
  const start = pos - match[0].length;
  const end = pos;

  pm.tr.delete(start, end).insert(start, node).apply();

  return true;
}

function replaceWithMark(
  pm: ProseMirror,
  match: Array<string>,
  pos: number,
  mark: string,
  specialChar: string
): boolean {
  const schema = pm.schema;
  const to = pos;
  const from = pos - match[1].length;
  const markType = schema.mark(mark);
  const charSize = specialChar.length;

  pm.tr.addMark(from, to, markType.type.create()).applyAndScroll();
  pm.tr.delete(from, from + charSize).apply();
  pm.tr.delete(to - charSize * 2, to - charSize).apply();

  analyticsService.trackEvent(`atlassian.editor.format.${mark}.autoformatting`);

  pm.removeActiveMark(markType.type);

  return true;
}

// [something](link) should convert to a hyperlink
const linkRule = new InputRule(/\[(\S+)\]\((\S+)\)$/, ')', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => {
  const schema = pm.schema;
  const to = pos;
  const from = pos - match[0].length;
  const markType = schema.mark(
    'link',
    {
      href: match[2],
    }
  );

  pm.tr.replaceWith(
    from,
    to,
    schema.text(
      match[1],
      [markType]
    )
  ).apply();

  pm.removeActiveMark(markType.type);

  return true;
});

// ![Image](http://url/a.png) should add an image
// Note: You have to load this rule before the link rule.
const imgRule = new InputRule(/!\[(\S+)\]\((\S+)\)$/, ')', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => {
  const attrs = {
    src: match[2],
    alt: match[1],
    title: match[1],
  };

  const node = pm.schema.nodes['image'].create(attrs);
  return replaceWithNode(pm, match, pos, node);
});

const codeBlockRule = new InputRule(/^```$/, '`', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => {
  const lengthOfDecorator = match[0].length;
  const isConvertedNodeHasContent = pm.selection.$from.parent.nodeSize > lengthOfDecorator + 2;

  if (isConvertableToCodeBlock(pm) && isConvertedNodeHasContent) {
    analyticsService.trackEvent(`atlassian.editor.format.codeblock.autoformatting`);
    const start = pos - lengthOfDecorator;
    return transformToCodeBlockAction(pm)
      // remove markdown decorator ```
      .delete(start, pos)
      .applyAndScroll();
  }
  return false;
});

// **string** should bold the text
const strongRule1 = new InputRule(/(\*\*([^\*]+)\*\*)$/, '*', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match, pos, 'strong', '**'));

// __string__ should bold the text
const strongRule2 = new InputRule(/(__([^_]+)__)$/, '_', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match, pos, 'strong', '__'));

// _string_ or *string* should change the text to italic
const emRule1 = new InputRule(/(?:[^\*]+)(\*([^\*]+?)\*)$|^(\*([^\*]+)\*)$/, '*', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match.filter((m: string) => m !== undefined), pos, 'em', '*'));

const emRule2 = new InputRule(/(?:[\s]+)(_([^_]+?)_)$|^(_([^_]+)_)$/, '_', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match.filter((m: string) => m !== undefined), pos, 'em', '_'));

// ~~string~~ should strikethrough the text
const strikeRule = new InputRule(/(\~\~([^\*]+)\~\~)$/, '~', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match, pos, 'strike', '~~'));

// `string` should change the current text to monospace
const monoRule = new InputRule(/(`([^`]+)`)$/, '`', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match, pos, 'mono', '`'));

const hrRule = new InputRule(/^\-\-\-$/, '-', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithNode(pm, match, pos, pm.schema.nodes['horizontal_rule'].create()));

export class MarkdownInputRulesPlugin {
  inputRules: InputRule[];

  constructor(pm: ProseMirror) {
    const blockRules = buildBlockRules(pm.schema);

    this.inputRules = [
      strongRule1,
      strongRule2,
      emRule1,
      emRule2,
      strikeRule,
      monoRule,
      imgRule,
      linkRule,
      hrRule,
      codeBlockRule,
      ...blockRules
    ];

    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.addRule(rule));
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.removeRule(rule));
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(MarkdownInputRulesPlugin, 'name', { value: 'MarkdownInputRulesPlugin' });

export default new Plugin(MarkdownInputRulesPlugin);
