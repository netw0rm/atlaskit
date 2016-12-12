import {
  commands,
  Plugin,
  ProseMirror,
  Schema,
  Selection,
  UpdateScheduler,
  Keymap,
  browser,
  Node
} from 'ak-editor-prosemirror';
import {
  BlockQuoteNodeType,
  CodeBlockNodeType,
  HeadingNodeType,
  ParagraphNodeType,
  HardBreakNodeType,
  isBlockQuoteNode,
  isCodeBlockNode,
  isHeadingNode,
  isParagraphNode
} from 'ak-editor-schema';
import CodeBlockPasteListener from './code-block-paste-listener';
import transformToCodeBlock from './transform-to-code-block';

// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
const NormalText = makeBlockType('normal', 'Normal text', '0');
const Heading1 = makeBlockType('heading1', 'Heading 1', '1');
const Heading2 = makeBlockType('heading2', 'Heading 2', '2');
const Heading3 = makeBlockType('heading3', 'Heading 3', '3');
const Heading4 = makeBlockType('heading4', 'Heading 4', '4');
const Heading5 = makeBlockType('heading5', 'Heading 5', '5');
const Quote = makeBlockType('quote', 'Block quote', '7');
const Code = makeBlockType('code', 'Code block', '8');
const Other = makeBlockType('other', 'Other…');

type ContextName = 'default' | 'comment' | 'pr';

export class BlockTypeState {
  private pm: PM;
  private changeHandlers: BlockTypeStateSubscriber[] = [];
  private availableContext: Context[] = [];

  // public state
  currentBlockType: BlockType = NormalText;
  availableBlockTypes: BlockType[] = [];
  context?: ContextName;

  constructor(pm: PM) {
    this.pm = pm;

    // add paste listener to overwrite the prosemirror's
    // see https://discuss.prosemirror.net/t/handle-paste-inside-code-block/372/5?u=bradleyayers
    pm.root.addEventListener('paste', new CodeBlockPasteListener(pm), true);

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());

    this.addBasicKeymap();

    this.addAvailableContext('pr', [NormalText, Heading1, Heading2, Heading3, Quote, Code]);
    this.addAvailableContext('comment', [NormalText, Quote, Code]);
    this.addAvailableContext('default', [NormalText, Heading1, Heading2, Heading3, Heading4, Heading5, Quote, Code]);
    this.changeContext('default');

    this.update();
  }

  subscribe(cb: BlockTypeStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: BlockTypeStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  changeContext(name: ContextName): void {
    const context = this.findContext(name);
    
    if (name !== this.context && context) {
      this.updateBlockTypeKeymap(context);

      this.context = context.name;
      this.availableBlockTypes = context.blockTypes;

      this.update(true);
    }
  }

  changeBlockType(name: BlockTypeName): void {
    const { pm } = this;

    // clear blockquote
    commands.lift(pm);
    const nodes = pm.schema.nodes;

    switch (name) {
      case NormalText.name:
        if (nodes.paragraph) {
          commands.setBlockType(nodes.paragraph)(pm);
        }
        break;
      case Heading1.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 1 })(pm);
        }
        break;
      case Heading2.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 2 })(pm);
        }
        break;
      case Heading3.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 3 })(pm);
        }
        break;
      case Heading4.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 4 })(pm);
        }
        break;
      case Heading5.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 5 })(pm);
        }
        break;
      case Quote.name:
        if (nodes.paragraph && nodes.blockquote) {
          commands.setBlockType(nodes.paragraph)(pm);
          commands.wrapIn(nodes.blockquote)(pm);
        }
        break;
      case Code.name:
        if (nodes.code_block) {
          transformToCodeBlock(nodes.code_block, pm);
        }
        break;
    }
  }

  splitCodeBlock(): boolean {
    const { pm } = this;
    const { $from } = pm.selection;
    const node = $from.parent;

    if(isCodeBlockNode(node)) {
      if( !this.lastCharIsNewline(node) || !this.cursorIsAtTheEndOfLine() ) {
        pm.tr.typeText('\n').applyAndScroll();
        return true;
      } else {
        this.deleteCharBefore();
      }
    }
    return false;
  }

  insertNewLine(): boolean {
    const { pm } = this;
    const { $from } = pm.selection;
    const node = $from.parent;
    const { hard_break } = pm.schema.nodes;

    if(isCodeBlockNode(node)) {
      pm.tr.typeText('\n').applyAndScroll();
      return true;
    } else if(hard_break) {
      pm.tr.replaceSelection(hard_break.create()).applyAndScroll()
      return true;
    }

    return false;
  }


  toggleBlockType(name: BlockTypeName): void {
    const blockNodes = this.blockNodesBetweenSelection();

    if(this.nodeBlockType(blockNodes[0]).name !== name) {
      this.changeBlockType(name);
    } else if(name !== Quote.name){
      this.changeBlockType(NormalText.name);
    } else {
      commands.lift(this.pm);
    }
  }

  // Replaced the one from prosemirror. Because it was not working with IOS.
  private deleteCharBefore() {
    const { pm } = this;
    const { $from } = pm.selection;
    pm.tr.delete($from.pos-1, $from.pos).applyAndScroll();
  }

  private updateBlockTypeKeymap(context: Context) {
    const { pm } = this;
    if(this.context) {
      const previousContext = this.findContext(this.context);
      if(previousContext) {
        pm.removeKeymap(previousContext.keymap);
      }
    } 

    pm.addKeymap(context.keymap);
  }

  private keymapForBlockTypes(blockTypes: BlockType[]) {
    const withSpecialKey = (key: string) => `${browser.mac ? 'Cmd-Alt' : 'Ctrl'}-${key}`;
    let bindings: {[key: string]: any} = {};

    const bind = (key: string, action: any): void => {
      bindings = Object.assign({}, bindings, {[key]: action});
    }
    
    blockTypes.forEach((blockType) => {
      if(blockType.shortcut) {
        bind(withSpecialKey(blockType.shortcut), () => this.toggleBlockType(blockType.name));
      }
    });

    return new Keymap(bindings);
  }

  private addBasicKeymap(): void {
    this.pm.addKeymap(new Keymap({
      'Enter': () => this.splitCodeBlock(),
      'Shift-Enter': () => this.insertNewLine()
    }));
  }
  
  private lastCharIsNewline(node: Node): boolean {
    return node.textContent.slice(-1) === '\n'
  }

  private cursorIsAtTheEndOfLine() {
    const { $from, empty } = this.pm.selection;
    return empty && $from.end() === $from.pos;
  }

  private blockNodesBetweenSelection(): Node[] {
    const { pm } = this;
    const {$from, $to} = pm.selection;
    let blockNodes: Node[] = [];

    pm.doc.nodesBetween($from.pos, $to.pos, (node) => {
      if(node.isBlock) {
        blockNodes.push(node);
      }
    });

    return blockNodes;
  }

  private update(dirty = false) {
    const { pm } = this;

    const newBlockType = this.detectBlockType();
    if (newBlockType !== this.currentBlockType) {
      this.currentBlockType = newBlockType;
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private detectBlockType(): BlockType {
    const { pm } = this;

    // Before a document is loaded, there is no selection.
    if (!pm.selection) {
      return NormalText;
    }

    const { $from } = pm.selection;

    for (let depth = 0; depth <= $from.depth; depth++) {
      const node = $from.node(depth)!;
      let blocktype = this.nodeBlockType(node);
      if (blocktype !== Other) {
        return blocktype;
      }
    }

    return Other;
  }

  private nodeBlockType(node: Node): BlockType {
    if (isHeadingNode(node)) {
        switch (node.attrs.level) {
          case 1:
            return Heading1;
          case 2:
            return Heading2;
          case 3:
            return Heading3;
          case 4:
            return Heading4;
          case 5:
            return Heading5;
      }
    } else if (isCodeBlockNode(node)) {
      return Code;
    } else if (isBlockQuoteNode(node)) {
      return Quote;
    } else if (isParagraphNode(node)) {
      return NormalText;
    }

    return Other;
  }

  private addAvailableContext(name: ContextName, preferredBlockTypes: BlockType[]): void {
    let context = this.makeContext(name, preferredBlockTypes.filter(this.isBlockTypeSchemaSupported));
    this.availableContext.push(context);
  }

  private makeContext(name: ContextName, blockTypes: BlockType[]): Context{
    return {name: name, blockTypes: blockTypes, keymap: this.keymapForBlockTypes(blockTypes)};
  }

  private findContext(name: ContextName): Context | undefined {
    return this.availableContext.find((context) => context.name === name);
  }

  private isBlockTypeSchemaSupported = (blockType: BlockType) => {
    const { pm } = this;
    switch (blockType) {
      case NormalText:
        return !!pm.schema.nodes.paragraph;
      case Heading1:
      case Heading2:
      case Heading3:
      case Heading4:
      case Heading5:
        return !!pm.schema.nodes.heading;
      case Quote:
        return !!pm.schema.nodes.blockquote;
      case Code:
        return !!pm.schema.nodes.code_block;
    }
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(BlockTypeState, 'name', { value: 'BlockTypeState' });

export default new Plugin(BlockTypeState);

export type BlockTypeStateSubscriber = (state: BlockTypeState) => any;

export type BlockTypeName =
  'normal' |
  'heading1' |
  'heading2' |
  'heading3' |
  'heading4' |
  'heading5' |
  'quote' |
  'code' |
  'other';

export interface BlockType {
  name: BlockTypeName;
  title: string;
  shortcut?: string;
}


interface Context {
  name: ContextName,
  blockTypes: BlockType[],
  keymap: Keymap
}

interface S extends Schema {
  nodes: {
    blockquote?: BlockQuoteNodeType;
    code_block?: CodeBlockNodeType;
    heading?: HeadingNodeType;
    paragraph?: ParagraphNodeType;
    hard_break?: HardBreakNodeType;
  }
}

interface PM extends ProseMirror {
  schema: S;
}

function makeBlockType(name: BlockTypeName, title: string, shortcut?: string): BlockType {
  return { name: name, title: title, shortcut: shortcut };
}
