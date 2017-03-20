import {
  blockQuoteRule,
  InputRule,
  inputRules,
  Node,
  NodeType,
  Plugin,
  ProseMirror,
  Schema,
  textblockTypeInputRule,
  wrappingInputRule,
  commands
} from '../../prosemirror';
import { insertBlankSpace } from '../../utils';
import { analyticsService, trackAndInvoke } from '../../analytics';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../block-type/transform-to-code-block';
import { isCodeBlockNode } from '../../schema';
import Keymap from 'browserkeymap';
import { transformToCodeAction } from '../text-formatting/transform-to-code';

// NOTE: There is a built in input rule for ordered lists in ProseMirror. However, that
// input rule will allow for a list to start at any given number, which isn't allowed in
// markdown (where a ordered list will always start on 1). This is a slightly modified
// version of that input rule.
const orderedListRule = (nodeType: NodeType): InputRule => {
  return wrappingInputRule(/^(\d+)\. $/, ' ', nodeType, (match: RegExpMatchArray) => ({}),
    (match, node) => node.childCount > 0);
};

// NOTE: we decided to restrict the creation of bullet lists to only "*"
function bulletListRule(nodeType) {
  return wrappingInputRule(/^\s*(\*) $/, ' ', nodeType);
}

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

const buildBlockRules = (schema: Schema): InputRule[] => {
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
  match: string[],
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
  match: string[],
  pos: number,
  mark: string,
  specialChar: string
): boolean {
  const from = pos - match[1].length;
  return replaceRangeWithMark(pm, from, pos, mark, specialChar);
}

function replaceRangeWithMark(
  pm: ProseMirror,
  from: number,
  to: number,
  mark: string,
  specialChar: string

): boolean {
  const schema = pm.schema;
  const markType = schema.mark(mark);
  const charSize = specialChar.length;
  const nodes: Node[] = [];

  pm.doc.nodesBetween(from, to, (node) => {
    if (node.isText) {
      nodes.push(node);
    }
  });

  if (nodes.length > 1 && nodes[0].marks.length && (nodes[0].text || '').indexOf(specialChar) > -1) {
    // TODO: remove setTimeout line after upgrading to new version of ProseMirror
    setTimeout(() => pm.input.dispatchKey('Backspace'), 0);
    return false;
  }

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
  match: string[],
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
  match: string[],
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
  match: string[],
  pos: number
) => {
  const lengthOfDecorator = match[0].length;

  // Because the node content is wrap by the node margin in prosemirror
  // + 2 is the parent margin size. 1 in the front, and 1 at the end.
  const convertedNodeHasContent = pm.selection.$from.parent.nodeSize > lengthOfDecorator + 2;

  if (isConvertableToCodeBlock(pm) && convertedNodeHasContent) {
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
const strongRule = new InputRule(/(\*\*([^\*]+)\*\*)$/, '*', (
  pm: ProseMirror,
  match: string[],
  pos: number
) => replaceWithMark(pm, match, pos, 'strong', '**'));

// *string* should change the text to italic
const emRule = new InputRule(/(?:[^\*]+)(\*([^\*]+?)\*)$|^(\*([^\*]+)\*)$/, '*', (
  pm: ProseMirror,
  match: string[],
  pos: number
) => replaceWithMark(pm, match.filter((m: string) => m !== undefined), pos, 'em', '*'));

// ~~string~~ should strikethrough the text
const strikeRule = new InputRule(/(\~\~([^\*]+)\~\~)$/, '~', (
  pm: ProseMirror,
  match: string[],
  pos: number
) => replaceWithMark(pm, match, pos, 'strike', '~~'));

// `string` should change the current text to code
const codeRule = new InputRule(/(`([^`]+)`)$/, '`', (
  pm: ProseMirror,
  match: string[],
  pos: number
) => {
  const from = pos - match[1].length;
  transformToCodeAction(pm, from, pos);
  replaceRangeWithMark(pm, from, pm.selection.to, 'code', '`');
  const tr = insertBlankSpace(pm);
  tr && tr.apply();
});

const hrRule = new InputRule(/^\-\-\-$/, '-', (
  pm: ProseMirror,
  match: string[],
  pos: number
) => replaceWithNode(pm, match, pos, pm.schema.nodes['horizontal_rule'].create()));

export class MarkdownInputRulesPlugin {
  inputRules: InputRule[];

  constructor(pm: ProseMirror) {
    const blockRules = buildBlockRules(pm.schema);

    this.inputRules = [
      strongRule,
      emRule,
      strikeRule,
      codeRule,
      imgRule,
      linkRule,
      hrRule,
      codeBlockRule,
      ...blockRules
    ];

    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.addRule(rule));
    bindCmdZ(pm);
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.removeRule(rule));
  }
}

// IE11 fix.
function bindCmdZ (pm) {
  pm.addKeymap(new Keymap({ 'Cmd-Z': pm => {
    const { $from } = pm.selection;
    const node = $from.parent;

    if (isCodeBlockNode(node)) {
      commands.undo(pm);
      return true;
    }

    return false;
  }}, { name: 'inputRules' }), 20);
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(MarkdownInputRulesPlugin, 'name', { value: 'MarkdownInputRulesPlugin' });

export default new Plugin(MarkdownInputRulesPlugin);
