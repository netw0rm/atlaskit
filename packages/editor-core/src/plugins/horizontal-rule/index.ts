import Keymap from 'browserkeymap';
import {
  Plugin, ProseMirror, Schema
} from '../../prosemirror';

import {
  HorizontalRuleNodeType
} from '../../schema';

import { trackAndInvoke } from '../../analytics';
import * as keymaps from '../../keymaps';

export type StateChangeHandler = (state: HorizontalRuleState) => any;

export class HorizontalRuleState {
  private changeHandlers: StateChangeHandler[] = [];
  private pm: PM;

  constructor(pm: PM) {
    this.pm = pm;
    this.changeHandlers = [];

    this.addKeymap(pm);
  }

  addKeymap(pm) {
    const {horizontal_rule} = pm.schema.nodes;
    if (horizontal_rule) {
      pm.addKeymap(new Keymap({
        [keymaps.insertHorizontalRule.common!]: trackAndInvoke('atlassian.editor.format.horizontalrule.keyboard', () => pm.tr.replaceSelection(horizontal_rule.create()).applyAndScroll())
      }));
    }
  }
}

export default new Plugin(HorizontalRuleState);

export interface PM extends ProseMirror {
  schema: S;
}

export interface S extends Schema {
  nodes: {
    horizontal_rule: HorizontalRuleNodeType
  };
}

