import Keymap from 'browserkeymap';
import * as keymaps from '../../keymaps';
import { DOMFromPos, Node, Plugin, ProseMirror, Schema } from '../../prosemirror';
import { CodeBlockNodeType, isCodeBlockNode } from '../../schema';
import CodeBlockPasteListener from './code-block-paste-listener';

export class CodeBlockState {
  element?: HTMLElement;
  language: string | undefined;
  toolbarVisible: boolean = false;

  private pm: PM;
  private editorFocused: boolean = false;
  private changeHandlers: CodeBlockStateSubscriber[] = [];
  private activeCodeBlock?: Node;

  constructor(pm: PM) {
    this.pm = pm;

    // add paste listener to overwrite the prosemirror's
    // see https://discuss.prosemirror.net/t/handle-paste-inside-code-block/372/5?u=bradleyayers
    pm.root.addEventListener('paste', new CodeBlockPasteListener(pm), true);

    pm.addKeymap(new Keymap({
      [keymaps.splitCodeBlock.common!]: () => this.splitCodeBlock(),
    }));

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());

    pm.on.focus.add(() => {
      this.editorFocused = true;
    });

    pm.on.blur.add(() => {
      this.editorFocused = false;
      this.update(true);
    });

    pm.on.click.add(() => {
      this.update(true);
    });

    this.update();
  }

  subscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  updateLanguage(language?: string): void {
    if (this.activeCodeBlock) {
      this.pm.tr.setNodeType(this.nodeStartPos() - 1, this.activeCodeBlock.type, {language: language}).applyAndScroll();
    }
  }

  splitCodeBlock(): boolean {
    const { pm } = this;
    const { $from } = pm.selection;
    const node = $from.parent;

    if (isCodeBlockNode(node)) {
        pm.tr.typeText('\n').applyAndScroll();
        return true;
    }
    return false;
  }

  private update(domEvent = false) {
    const codeBlockNode = this.activeCodeBlockNode();

    if ((domEvent && codeBlockNode) || codeBlockNode !== this.activeCodeBlock) {
      const newElement = codeBlockNode && this.activeCodeBlockElement();
      this.toolbarVisible = this.editorFocused && !!codeBlockNode && (domEvent || this.element !== newElement);
      this.activeCodeBlock = codeBlockNode;
      this.language = codeBlockNode && codeBlockNode.attrs['language'] || undefined;
      this.element = newElement;
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
