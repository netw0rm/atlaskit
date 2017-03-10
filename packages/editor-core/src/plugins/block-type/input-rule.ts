import { blockQuoteRule, Fragment, headingRule, InputRule, inputRules, Plugin, Schema, Transaction, MarkType, Mark } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../block-type/transform-to-code-block';

let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const rules: Array<InputRule> = [];

  if (schema.nodes.heading) {
    // '# ' for h1, '## ' for h2 and etc
    rules.push(headingRule(schema.nodes.heading, 5));
  }

  if (schema.nodes.blockquote) {
    // '> ' for blockquote
    rules.push(blockQuoteRule(schema.nodes.blockquote));
  }

  if (schema.nodes.codeBlock) {
    rules.push(new InputRule(/^```$/, (state, match, start, end): Transaction | undefined => {
      const lengthOfDecorator = match[0].length;

      // Because the node content is wrap by the node margin in prosemirror
      // + 2 is the parent margin size. 1 in the front, and 1 at the end.
      const convertedNodeHasContent = state.selection.$from.parent.nodeSize > lengthOfDecorator + 2;

      if (isConvertableToCodeBlock(state) && convertedNodeHasContent) {
        analyticsService.trackEvent(`atlassian.editor.format.codeblock.autoformatting`);
        return transformToCodeBlockAction(state)
          // remove markdown decorator ```
          .delete(start, end)
          .scrollIntoView();
      }
    }));
  }

  if (schema.nodes.rule) {
    // '---' for hr
    rules.push(new InputRule(/^\-\-\-$/, (state, match, start, end) => {
      return state.tr.replaceWith(start, end, Fragment.from(schema.nodes.rule.create()));
    }));
  }

  plugin = inputRules({ rules });

  return plugin;
};

export default inputRulePlugin;
