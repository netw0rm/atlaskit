import { Schema, ProseMirror, Node, Plugin } from '../../prosemirror';
import { CodeBlockNodeType, isCodeBlockNode } from '../../schema';

export class CodeBlockState {
  target: Node | null = null;
  private pm: PM;
  private changeHandlers: CodeBlockStateSubscriber[] = [];

  constructor(pm: PM) {
    this.pm = pm;
    this.target = this.activeBlockCode();

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());
  }


  subscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  private update() {
    let dirty = false;
    const blockCode = this.activeBlockCode();

    if(blockCode !== this.target) {
      this.target = blockCode;
      dirty = true;
    }

    if(dirty) {
      this.changeHandlers.forEach(changeHandler => changeHandler(this));
    }
  }

  private activeBlockCode(): Node | null {
    const { pm } = this;

    // Before a document is loaded, there is no selection.
    if (!pm.selection) {
      return null;
    }

    const { $from } = pm.selection;

    for (let depth = 0; depth <= $from.depth; depth++) {
      const node = $from.node(depth)!;
      if(isCodeBlockNode(node)) {
        return node;
      }
    }

    return null;
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

export type CodeBlockStateSubscriber = (state: CodeBlockState) => any;

export default new Plugin(CodeBlockState);
