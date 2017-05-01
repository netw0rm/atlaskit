import { InputRule, EditorState, Transaction } from '../prosemirror';

export type InputRuleHandler<T> = (state: EditorState<T>, match, start, end) => (Transaction | undefined) | string;

export function defaultInputRuleHandler(inputRule: InputRule): InputRule {
  const originalHandler = inputRule.handler;
  inputRule.handler = (state: EditorState<any>, match, start, end) => {
    // Skip any input rule inside code
    // https://product-fabric.atlassian.net/wiki/spaces/E/pages/37945345/Editor+content+feature+rules#Editorcontent/featurerules-Rawtextblocks
    if (state.selection.$from.parent.type.spec.code) {
      return;
    }
    return originalHandler(state, match, start, end);
  };
  return inputRule;
}

export function createInputRule(match: RegExp, handler: InputRuleHandler<any>): InputRule {
  return defaultInputRuleHandler(new InputRule(match, handler));
}
