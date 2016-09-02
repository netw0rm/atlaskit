import {
  Plugin, ProseMirror, Mark, Schema, InputRule, inputRules, allInputRules
} from 'ak-editor-prosemirror';

function replaceWithNode(
  pm: ProseMirror,
  match: Array<string>,
  pos: number,
  node: Node
) : boolean {
  const start = pos - match[0].length;
  const end = pos;

  pm.tr.delete(start, end).insert(start, node).apply();

  return true;
}

function replaceWithMark(
  pm: ProseMirror,
  match: Array<string>,
  pos: number,
  mark: string
) : boolean {
  const schema: Schema= pm.schema;
  const to = pos;
  const from = pos - match[1].length;
  const markType: Mark = schema.mark(mark);

  pm.tr.replaceWith(
    from,
    to,
    schema.text(
      match[2],
      markType
    )
  ).apply();

  pm.removeActiveMark(markType);

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
      markType
    )
  ).apply();

  pm.removeActiveMark(markType);

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

  const node = pm.schema.nodes.image.create(attrs);
  return replaceWithNode(pm, match, pos, node);
});

// **string** should bold the text
const strongRule1 = new InputRule(/(\*\*([^\*]+)\*\*)$/, '*', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match, pos, 'strong'));

// __string__ should bold the text
const strongRule2 = new InputRule(/(__([^_]+)__)$/, '_', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match, pos, 'strong'));

// _string_ or *string* should change the text to italic
const emRule1 = new InputRule(/(?:[^\*]+)(\*([^\*]+?)\*)$|^(\*([^\*]+)\*)$/, '*', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match.filter((m: string) => m !== undefined), pos, 'em'));

const emRule2 = new InputRule(/(?:[^_]+)(_([^_]+?)_)$|^(_([^_]+)_)$/, '_', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match.filter((m: string) => m !== undefined), pos, 'em'));

// `string` should change the current text to inline code block
const inlineCodeRule = new InputRule(/(`([^`]+)`)$/, '`', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithMark(pm, match, pos, 'code'));

// --- or *** should add a horizontal line
const hrRule1 = new InputRule(/^\*\*\*$/, '*', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithNode(pm, match, pos, pm.schema.nodes.horizontal_rule.create()));

const hrRule2 = new InputRule(/^\-\-\-$/, '-', (
  pm: ProseMirror,
  match: Array<string>,
  pos: number
) => replaceWithNode(pm, match, pos, pm.schema.nodes.horizontal_rule.create()));

export default new Plugin(class MarkdownInputRulesPlugin {
  inputRules: InputRule[];

  constructor(pm: ProseMirror) {
    this.inputRules = [
      strongRule1,
      strongRule2,
      emRule1,
      emRule2,
      inlineCodeRule,
      imgRule,
      linkRule,
      hrRule1,
      hrRule2,
    ].concat(allInputRules);

    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.addRule(rule));
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.removeRule(rule));
  }
});
