import Keymap from 'browserkeymap';
import {
  Plugin, ProseMirror, Schema
} from '../../prosemirror';

import {
  RuleNodeType
} from '../../schema';

import { trackAndInvoke } from '../../analytics';
import * as keymaps from '../../keymaps';

export type StateChangeHandler = (state: RuleState) => any;

export class RuleState {
  private changeHandlers: StateChangeHandler[] = [];
  private pm: PM;

  constructor(pm: PM) {
    this.pm = pm;
    this.changeHandlers = [];

    this.addKeymap(pm);
  }

  addKeymap(pm) {
    const {rule} = pm.schema.nodes;
    if (rule) {
      pm.addKeymap(new Keymap({
        [keymaps.insertRule.common!]: trackAndInvoke('atlassian.editor.format.horizontalrule.keyboard', () => pm.tr.replaceSelection(rule.create()).applyAndScroll())
      }));
    }
  }
}

export default new Plugin(RuleState);

export interface PM extends ProseMirror {
  schema: S;
}

export interface S extends Schema {
  nodes: {
    rule: RuleNodeType
  };
}

