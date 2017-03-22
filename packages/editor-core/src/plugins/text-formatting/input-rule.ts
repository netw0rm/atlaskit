import { InputRule, inputRules, Plugin, Schema, Transaction, MarkType } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { transformToCodeAction } from './transform-to-code';

function addMark(markType: MarkType, schema: Schema<any, any>, specialChar: string): Function {
  return (state, match, start, end): Transaction | null => {
    const charSize = specialChar.length;
    const to = end;
    const from = match[1] ? to - match[1].length + 1 : start;

    if (state.schema.marks.code.isInSet(state.doc.resolve(start + 1).marks())) {
      return null;
    }

    analyticsService.trackEvent(`atlassian.editor.format.${markType.name}.autoformatting`);

    let tr = (
      state.tr
        // apply mark
        .addMark(from, to, markType.create())
        // delete special characters before the text
        .delete(from, from + charSize)
        // deactivate mark
        .removeStoredMark(markType)
    );

    if (charSize > 1) {
      // remove special characters after the text
      tr = tr.delete(to - charSize * 2 + 1, to - charSize);
    }

    return tr;
  };
};

function addCodeMark(markType: MarkType, schema: Schema<any, any>, specialChar: string): Function {
  return (state, match, start, end): Transaction | null => {
    const tr = transformToCodeAction(state, start, end);
    const newState = state.apply(tr);
    return addMark(markType, schema, specialChar)(newState, match, start, end);
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
