import { InputRule, inputRules, Plugin, Schema, Transaction, MarkType } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { transformToCodeAction } from './transform-to-code';

function addMark(markType: MarkType, schema: Schema<any, any>, specialChar: string): Function {
  return (state, match, start, end): Transaction | null => {
    const charSize = specialChar.length;
    const to = end;
    // in case of *string* pattern it matches the text from beginning of the paragraph,
    // because we want ** to work for strong text
    // that's why "start" argument is wrong and we need to calculate it ourselves
    const from = match[1] ? to - match[1].length + 1 : start;

    // fixes the following case: my `*name` is *
    // expected result: should ignore special characters inside "code"
    if (state.schema.marks.code.isInSet(state.doc.resolve(from + 1).marks())) {
      return null;
    }

    analyticsService.trackEvent(`atlassian.editor.format.${markType.name}.autoformatting`);

    let { tr } = state;

    if (charSize > 1) {
      // delete special characters after the text
      // Prosemirror removes the last symbol by itself, so we need to remove "charSize - 1" symbols
      tr = tr.delete(to - (charSize - 1), to);
    }

    return tr
      // apply mark to the range (from, to)
      .addMark(from, to, markType.create())
      // delete special characters before the text
      .delete(from, from + charSize)
      // deactivate the mark
      .removeStoredMark(markType);
  };
};

function addCodeMark(markType: MarkType, schema: Schema<any, any>, specialChar: string): Function {
  return (state, match, start, end): Transaction | null => {
    return transformToCodeAction(state, start, end).delete(start, start + specialChar.length).removeStoredMark(markType);
  };
}

let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const rules: Array<InputRule> = [];

  if (schema.marks.strong) {
    // **string** should bold the text
    rules.push(new InputRule(/(\*\*([^\*]+)\*\*)$/, addMark(schema.marks.strong, schema, '**')));
  }

  if (schema.marks.em) {
    // *string* should italic the text
    rules.push(new InputRule(/(?:[^\*]+)(\*([^\*]+?)\*)$|^(\*([^\*]+)\*)$/, addMark(schema.marks.em, schema, '*')));
  }

  if (schema.marks.strike) {
    // ~~string~~ should strikethrough the text
    rules.push(new InputRule(/(\~\~([^\~]+)\~\~)$/, addMark(schema.marks.strike, schema, '~~')));
  }

  if (schema.marks.code) {
    // `string` should monospace the text
    rules.push(new InputRule(/(`([^`]+)`)$/, addCodeMark(schema.marks.code, schema, '`')));
  }

  plugin = inputRules({ rules });

  return plugin;
};

export default inputRulePlugin;
