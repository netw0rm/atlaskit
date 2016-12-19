import {
  ProseMirror, Schema
} from '../../prosemirror';

import {
  HorizontalRuleNodeType,
} from '../../schema';

export type StateChangeHandler = (state: HorizontalRuleState) => any;

export class HorizontalRuleState {
  private changeHandlers: StateChangeHandler[] = [];
  private pm: PM;

  constructor(pm: PM) {
    this.pm = pm;
    this.changeHandlers = [];

    this.addKeymap(pm);

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());
  }

  addKeymap(pm) {
    
  }

  update() {

  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }
}

export interface PM extends ProseMirror {
  schema: S;
}

export interface S extends Schema {
  nodes: {
    horizontal_rule: HorizontalRuleNodeType
  }
}

