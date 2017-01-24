import Keymap from 'browserkeymap';
import { DOMFromPos, Node, Plugin, ProseMirror, Schema } from '../../prosemirror';
import { CodeBlockNodeType, isCodeBlockNode } from '../../schema';
import CodeBlockPasteListener from './code-block-paste-listener';

export class CodeBlockState {
  active: boolean = false;
  content?: string;
  element?: HTMLElement;
  language?: string;
  private pm: PM;
  private changeHandlers: CodeBlockStateSubscriber[] = [];
  private activeCodeBlock?: Node;

  constructor(pm: PM) {
    this.pm = pm;

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

    this.update();
  }

  subscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  updateLanguage(language: string): void {
    if (this.activeCodeBlock) {
      this.pm.tr.setNodeType(this.nodeStartPos() - 1, this.activeCodeBlock.type, {language: language}).apply();
    }
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
    const codeBlockNode = this.activeCodeBlockNode();

    if (codeBlockNode !== this.activeCodeBlock) {
      this.activeCodeBlock = codeBlockNode;
      this.active = !!codeBlockNode;
      this.language = codeBlockNode && codeBlockNode.attrs['language'];
      this.content = codeBlockNode && codeBlockNode.textContent;
      this.element = this.activeCodeBlockElement();
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(changeHandler => changeHandler(this));
    }
  }

  private activeCodeBlockElement(): HTMLElement {
    const offset =  this.nodeStartPos();
    const { node } = DOMFromPos(this.pm, offset, true);

    return node as HTMLElement;
  }

  private nodeStartPos(): number {
    const { $from } = this.pm.selection;
    return $from.start($from.depth);
  }

  private activeCodeBlockNode(): Node | undefined {
    const { pm } = this;
    const { $from } = pm.selection;
    const node = $from.parent;
    if (isCodeBlockNode(node)) {
      return node;
    }

    return undefined;
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
