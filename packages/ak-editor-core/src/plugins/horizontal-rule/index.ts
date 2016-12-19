import {
  ProseMirror, Schema, Plugin, Keymap
} from '../../prosemirror';

import {
  HorizontalRuleNodeType
} from '../../schema';

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
    const {horizontal_rule} = pm.nodes;
    if(horizontal_rule) {
      pm.addKeyMap(new Keymap({
        'Mod-Shift--': () => pm.tr.replaceSelection(horizontal_rule.create()).applyAndScroll()
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
  }
}

