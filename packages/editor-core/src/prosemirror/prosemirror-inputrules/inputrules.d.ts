import { Plugin } from '../prosemirror-state';

export class InputRule {
  constructor(match: RegExp, handler: string | Function);

}
export function inputRules(config: {rules: Array<InputRule>}): Plugin;
