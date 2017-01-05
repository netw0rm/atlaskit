import {Schema, ProseMirror} from '../../prosemirror';
import {CodeBlockNodeType} from '../../schema';

export class HyperlinkState {
  private pm: PM;
  constructor(pm: PM) {
    this.pm = pm;
  }
}

export interface S extends Schema {
  nodes: {
    code_block?: CodeBlockNodeType;
  };
}

export interface PM extends ProseMirror {
  schema: S;
}
