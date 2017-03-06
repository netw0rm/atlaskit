import {
  ellipsis,
  InputRule,
  inputRules,
  Plugin,
  ProseMirror,
} from '../../prosemirror';

/**
 * :: InputRule Converts double dashes to an emdash.
 *
 * Redefined the rule from prosemirror to make it works with --- (horizontal ruler for markdown):
 * @see {@link https://github.com/ProseMirror/prosemirror-inputrules/blob/8be1881a1b905f34c503c8e1fee7903983e8b35c/src/rules.js#L4}
 * @see {@link https://bitbucket.org/atlassian/atlaskit/src/master/packages/ak-editor-core/src/plugins/markdown-inputrules/index.ts?fileviewer=file-view-default#index.ts-181}
 */
const emDash = new InputRule(/--\s$/, '', '— ');

/**
 * Copied from https://github.com/ProseMirror/prosemirror-inputrules/blob/8be1881a1b905f34c503c8e1fee7903983e8b35c/src/rules.js
 */
const allInputRules = [emDash, ellipsis];

/**
 * ProseMirror plugin for adding default input rules.
 */
export class DefaultInputRulesState {
  inputRules: InputRule[];

  constructor(pm: ProseMirror) {
    this.inputRules = [...allInputRules];

    const rules = inputRules.ensure(pm);
    this.inputRules.forEach(rule => rules.addRule(rule));
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach(rule => rules.removeRule(rule));
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(DefaultInputRulesState, 'name', { value: 'DefaultInputRulesState' });

export default new Plugin(DefaultInputRulesState);
