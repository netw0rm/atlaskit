import {
  commands,
  Fragment,
  Plugin,
  ProseMirror,
  Schema,
  Selection,
  UpdateScheduler,
  Keymap,
  browser,
  Node,
  TextSelection,
} from '../../prosemirror';
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
} from '../../schema';
import { trackAndInvoke } from '../../analytics';
import transformToCodeBlock from './transform-to-code-block';

import {
  getGroupsInRange,
  liftSelection
} from '../../utils';

const withSpecialKey = (key: string) => `${browser.mac ? 'Cmd-Alt' : 'Ctrl'}-${key}`;

// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
const NormalText = makeBlockType('normal', 'Normal text', withSpecialKey('0'));
const Heading1 = makeBlockType('heading1', 'Heading 1', withSpecialKey('1'));
const Heading2 = makeBlockType('heading2', 'Heading 2', withSpecialKey('2'));
const Heading3 = makeBlockType('heading3', 'Heading 3', withSpecialKey('3'));
const Heading4 = makeBlockType('heading4', 'Heading 4', withSpecialKey('4'));
const Heading5 = makeBlockType('heading5', 'Heading 5', withSpecialKey('5'));
const BlockQuote = makeBlockType('blockquote', 'Block quote', withSpecialKey('7'));
const CodeBlock = makeBlockType('codeblock', 'Code block', withSpecialKey('8'));
const Other = makeBlockType('other', 'Other…');

export type ContextName = 'default' | 'comment' | 'pr';

export type GroupedBlockTypes = BlockType[][];

export class BlockTypeState {
  private pm: PM;
  private changeHandlers: BlockTypeStateSubscriber[] = [];
  private availableContexts: Context[] = [];

  // public state
  currentBlockType: BlockType = NormalText;
  availableBlockTypes: GroupedBlockTypes = [];
  context?: ContextName;

  constructor(pm: PM) {
    this.pm = pm;

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());

    this.addBasicKeymap();

    this.addAvailableContext('pr', [
      [NormalText],
      [Heading1, Heading2, Heading3],
      [BlockQuote, CodeBlock]
    ]);
    this.addAvailableContext('comment', [
      [NormalText],
      [BlockQuote, CodeBlock]
    ]);
    this.addAvailableContext('default', [
      [NormalText],
      [Heading1, Heading2, Heading3, Heading4, Heading5],
      [BlockQuote, CodeBlock]
    ]);
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
      this.availableBlockTypes = context.groupedBlockTypes;

      this.update(true);
    }
  }

  changeBlockType(name: BlockTypeName): void {
    const { pm } = this;
    const { nodes } = pm.schema;

    if (name === BlockQuote.name && nodes.blockquote) {
      if (commands.wrapIn(nodes.blockquote)(pm, false)) {
        return this.changeBlockTypeAtSelection(name, pm.selection.$from, pm.selection.$to, true);
      }
    }

    const groups = getGroupsInRange(pm, pm.selection.$from, pm.selection.$to);
    let { $from } = groups[0];
    let { $to } = groups[groups.length - 1];
    pm.setSelection(new TextSelection($from, $to));

    groups.reverse();
    groups.forEach(group => {
      this.changeBlockTypeAtSelection(name, group.$from, group.$to);
    });
  }

  changeBlockTypeAtSelection(name: BlockTypeName, $from, $to, forceApply: boolean = false): void {
    const { pm } = this;
    pm.setSelection(new TextSelection($from, $to));

    while (pm.selection.$from.depth > 1) {
      liftSelection(pm, pm.selection.$from, pm.selection.$to).applyAndScroll();
    }

    if (!forceApply) {
      const groupsInRange = getGroupsInRange(pm, pm.selection.$from, pm.selection.$to);
      if (groupsInRange.length > 1) {
        return this.changeBlockType(name);
      }
    }

    const { nodes } = pm.schema;

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
      case BlockQuote.name:
        if (nodes.paragraph && nodes.blockquote) {
          commands.setBlockType(nodes.paragraph)(pm);
          commands.wrapIn(nodes.blockquote)(pm);
        }
        break;
      case CodeBlock.name:
        if (nodes.code_block) {
          transformToCodeBlock(nodes.code_block, pm);
        }
        break;
    }
  }

  insertNewLine(): boolean {
    const { pm } = this;
    const { $from } = pm.selection;
    const node = $from.parent;
    const { hard_break } = pm.schema.nodes;

    if (hard_break) {
      const hardBreakNode = hard_break.create();

      if (node.type.validContent(Fragment.from(hardBreakNode))) {
        pm.tr.replaceSelection(hardBreakNode).applyAndScroll();
        return true;
      }
    }

    pm.tr.typeText('\n').applyAndScroll();
    return true;
  }


  toggleBlockType(name: BlockTypeName): void {
    const blockNodes = this.blockNodesBetweenSelection();

    if (this.nodeBlockType(blockNodes[0]).name !== name) {
      this.changeBlockType(name);
    } else if (name !== BlockQuote.name) {
      this.changeBlockType(NormalText.name);
    } else {
      commands.lift(this.pm);
    }
  }

  private updateBlockTypeKeymap(context: Context) {
    const { pm } = this;
    if (this.context) {
      const previousContext = this.findContext(this.context);
      if (previousContext) {
        pm.removeKeymap(previousContext.keymap);
      }
    }

    pm.addKeymap(context.keymap);
  }

  private keymapForBlockTypes(groupedBlockTypes: GroupedBlockTypes) {
    let bindings: { [key: string]: any } = {};

    const bind = (key: string, action: any): void => {
      bindings = { ...bindings, ...{ [key]: action } };
    };

    groupedBlockTypes.forEach(blockTypes => blockTypes.forEach((blockType) => {
      if (blockType.shortcut) {
        const eventName = this.analyticsEventName('keyboard', blockType.name);
        bind(blockType.shortcut, trackAndInvoke(eventName, () => this.toggleBlockType(blockType.name)));
      }
    }));

    return new Keymap(bindings);
  }

  private addBasicKeymap(): void {
    this.pm.addKeymap(new Keymap({
      'Shift-Enter': trackAndInvoke('atlassian.editor.newline.keyboard', () => this.insertNewLine())
    }));
  }

  private blockNodesBetweenSelection(): Node[] {
    const { pm } = this;
    const {$from, $to} = pm.selection;
    let blockNodes: Node[] = [];

    pm.doc.nodesBetween($from.pos, $to.pos, (node) => {
      if (node.isBlock) {
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
      return CodeBlock;
    } else if (isBlockQuoteNode(node)) {
      return BlockQuote;
    } else if (isParagraphNode(node)) {
      return NormalText;
    }

    return Other;
  }

  private analyticsEventName(eventSource: string, blockTypeName: string): string {
    return `atlassian.editor.format.${blockTypeName}.${eventSource}`;
  }

  private addAvailableContext(name: ContextName, groupedBlockTypes: GroupedBlockTypes): void {
    let context = this.makeContext(
      name,
      groupedBlockTypes.map(
        blockTypesInGroup => blockTypesInGroup.filter(this.isBlockTypeSchemaSupported)
      )
    );

    this.availableContexts.push(context);
  }

  private makeContext(name: ContextName, groupedBlockTypes: GroupedBlockTypes): Context {
    return { name: name, groupedBlockTypes: groupedBlockTypes, keymap: this.keymapForBlockTypes(groupedBlockTypes) };
  }

  private findContext(name: ContextName): Context | undefined {
    for (let i = 0; i < this.availableContexts.length; i++) {
      const context = this.availableContexts[i];
      if (context.name === name) {
        return context;
      }
    }
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
      case BlockQuote:
        return !!pm.schema.nodes.blockquote;
      case CodeBlock:
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
  'blockquote' |
  'codeblock' |
  'other';

export interface BlockType {
  name: BlockTypeName;
  title: string;
  shortcut?: string;
}


interface Context {
  name: ContextName;
  groupedBlockTypes: GroupedBlockTypes;
  keymap: Keymap;
}

export interface S extends Schema {
  nodes: {
    blockquote?: BlockQuoteNodeType;
    code_block?: CodeBlockNodeType;
    heading?: HeadingNodeType;
    paragraph?: ParagraphNodeType;
    hard_break?: HardBreakNodeType;
  };
}

export interface PM extends ProseMirror {
  schema: S;
}

function makeBlockType(name: BlockTypeName, title: string, shortcut?: string): BlockType {
  return { name: name, title: title, shortcut: shortcut };
}
