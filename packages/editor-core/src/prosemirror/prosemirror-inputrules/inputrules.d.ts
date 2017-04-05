import { Plugin } from '../prosemirror-state';

export class InputRule {
  constructor(match: RegExp, handler: string | Function);
  match: RegExp;
  handler: (...args: any[]) => any;
}
export function inputRules(config: {rules: Array<InputRule>}): Plugin;
