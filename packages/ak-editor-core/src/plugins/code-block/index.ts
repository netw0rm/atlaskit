import { Schema, ProseMirror, Node, Plugin, Keymap } from '../../prosemirror';
import { CodeBlockNodeType, isCodeBlockNode } from '../../schema';
import CodeBlockPasteListener from './code-block-paste-listener';

export class CodeBlockState {
  target: Node | null = null;
  private pm: PM;
  private changeHandlers: CodeBlockStateSubscriber[] = [];

  constructor(pm: PM) {
    this.pm = pm;
    this.target = this.activeBlockCode();

    // add paste listener to overwrite the prosemirror's
    // see https://discuss.prosemirror.net/t/handle-paste-inside-code-block/372/5?u=bradleyayers
    pm.root.addEventListener('paste', new CodeBlockPasteListener(pm), true);


    pm.addKeymap(new Keymap({
      'Enter': () => this.splitCodeBlock(),
    }));

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

  splitCodeBlock(): boolean {
    const { pm } = this;
    const { $from } = pm.selection;
    const node = $from.parent;

    if (isCodeBlockNode(node)) {
      if (!this.lastCharIsNewline(node) || !this.cursorIsAtTheEndOfLine()) {
        pm.tr.typeText('\n').applyAndScroll();
        return true;
      } else {
        this.deleteCharBefore();
      }
    }
    return false;
  }

  // Replaced the one from prosemirror. Because it was not working with IOS.
  private deleteCharBefore() {
    const { pm } = this;
    const { $from } = pm.selection;
    pm.tr.delete($from.pos - 1, $from.pos).applyAndScroll();
  }

  private lastCharIsNewline(node: Node): boolean {
    return node.textContent.slice(-1) === '\n';
  }

  private cursorIsAtTheEndOfLine() {
    const { $from, empty } = this.pm.selection;
    return empty && $from.end() === $from.pos;
  }

  private update() {
    let dirty = false;
    const codeBlock = this.activeBlockCode();

    if(codeBlock !== this.target) {
      this.target = codeBlock;
      dirty = true;
    }

    if(dirty) {
      this.changeHandlers.forEach(changeHandler => changeHandler(this));
    }
  }

  private activeBlockCode(): Node | null {
    const { pm } = this;
    const { $from } = pm.selection;
    const node = $from.parent;
    if(isCodeBlockNode(node)) {
      return node;
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
