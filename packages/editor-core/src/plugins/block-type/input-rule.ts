import {
  textblockTypeInputRule, wrappingInputRule, InputRule, inputRules, Plugin, Schema, Transaction, NodeType
} from '../../prosemirror';
import { analyticsService, trackAndInvoke } from '../../analytics';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../block-type/transform-to-code-block';
import { createInputRule, defaultInputRuleHandler } from '../utils';


// : (NodeType, number) → InputRule
// Given a node type and a maximum level, creates an input rule that
// turns up to that number of `#` characters followed by a space at
// the start of a textblock into a heading whose level corresponds to
// the number of `#` signs.
export function headingRule(nodeType: NodeType, maxLevel: number) {
  return textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'),
                                nodeType, match => ({level: match[1].length}));
}

// : (NodeType) → InputRule
// Given a blockquote node type, returns an input rule that turns `"> "`
// at the start of a textblock into a blockquote.
export function blockQuoteRule(nodeType: NodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
}

// : (NodeType) → InputRule
// Given a code block node type, returns an input rule that turns a
// textblock starting with three backticks into a code block.
export function codeBlockRule(nodeType: NodeType) {
  return textblockTypeInputRule(/^```$/, nodeType);
}

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.nodes.heading) {
    // '# ' for h1, '## ' for h2 and etc
    const rule = defaultInputRuleHandler(headingRule(schema.nodes.heading, 5));
    const currentHandler = rule.handler;
    rule.handler = (state, match, start, end) => {
      analyticsService.trackEvent(`atlassian.editor.format.heading${match[1].length}.autoformatting`);
      return currentHandler(state, match, start, end);
    };
    rules.push(rule);
  }

  if (schema.nodes.blockquote) {
    // '> ' for blockquote
    const rule = defaultInputRuleHandler(blockQuoteRule(schema.nodes.blockquote));
    rule.handler = trackAndInvoke('atlassian.editor.format.blockquote.autoformatting', rule.handler);
    rules.push(rule);
  }

  if (schema.nodes.codeBlock) {
    rules.push(createInputRule(/((^`{3,})|(\s`{3,}))(\S*)\s$/, (state, match, start, end): Transaction | undefined => {

      const attributes: any = {};
      if (match[4]) {
        attributes.language = match[4];
      }
      if (isConvertableToCodeBlock(state)) {
        const newStart = match[0][0] === ' ' ? start + 1 : start;
        analyticsService.trackEvent(`atlassian.editor.format.codeblock.autoformatting`);
        return transformToCodeBlockAction(state, attributes)
          // remove markdown decorator ```
          .delete(newStart, end)
          .scrollIntoView();
      }
    }));
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}

export default inputRulePlugin;
