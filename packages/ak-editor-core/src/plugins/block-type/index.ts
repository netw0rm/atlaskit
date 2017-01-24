import Keymap from 'browserkeymap';
import { ContextName } from '../../';
import { trackAndInvoke } from '../../analytics';
import {
  browser,
  commands,
  Fragment,
  Node,
  Plugin,
  ProseMirror,
  Schema,
  TextSelection,
} from '../../prosemirror';
import {
  BlockQuoteNodeType,
  CodeBlockNodeType,
  HardBreakNodeType,
  HeadingNodeType,
  isBlockQuoteNode,
  isCodeBlockNode,
  isHeadingNode,
  isParagraphNode,
  ParagraphNodeType
} from '../../schema';
import {
  getGroupsInRange,
  liftSelection
} from '../../utils';
import transformToCodeBlock from './transform-to-code-block';

const withSpecialKey = (key: string) => `${browser.mac ? 'Cmd-Alt' : 'Ctrl'}-${key}`;

// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
const NORMAL_TEXT = makeBlockType('normal', 'Normal text', withSpecialKey('0'));
const HEADING_1 = makeBlockType('heading1', 'Heading 1', withSpecialKey('1'));
const HEADING_2 = makeBlockType('heading2', 'Heading 2', withSpecialKey('2'));
const HEADING_3 = makeBlockType('heading3', 'Heading 3', withSpecialKey('3'));
const HEADING_4 = makeBlockType('heading4', 'Heading 4', withSpecialKey('4'));
const HEADING_5 = makeBlockType('heading5', 'Heading 5', withSpecialKey('5'));
const BLOCK_QUOTE = makeBlockType('blockquote', 'Block quote', withSpecialKey('7'));
const CODE_BLOCK = makeBlockType('codeblock', 'Code block', withSpecialKey('8'));
const OTHER = makeBlockType('other', 'Other…');

export type GroupedBlockTypes = BlockType[][];

export class BlockTypeState {
  private pm: PM;
  private changeHandlers: BlockTypeStateSubscriber[] = [];
  private availableContexts: Context[] = [];

  // public state
  currentBlockType: BlockType = NORMAL_TEXT;
  availableBlockTypes: GroupedBlockTypes = [];
  context?: ContextName;

  constructor(pm: PM) {
    this.pm = pm;

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());

    this.addBasicKeymap();

    this.addAvailableContext('default', [
      [NORMAL_TEXT],
      [HEADING_1, HEADING_2, HEADING_3, HEADING_4, HEADING_5],
      [BLOCK_QUOTE, CODE_BLOCK]
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
    let context = this.findContext(name);

    if (!context) {
      console.warn(`Atlassian Editor: unknown editor context "${name}"`);
      context = this.availableContexts['default'];
    }

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

    if (name === BLOCK_QUOTE.name && nodes.blockquote) {
      if (commands.wrapIn(nodes.blockquote)(pm, false)) {
        return this.changeBlockTypeAtSelection(name, pm.selection.$from, pm.selection.$to, true);
      }
    }

    const groups = getGroupsInRange(pm, pm.selection.$from, pm.selection.$to);
    const { $from } = groups[0];
    const { $to } = groups[groups.length - 1];
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
      case NORMAL_TEXT.name:
        if (nodes.paragraph) {
          commands.setBlockType(nodes.paragraph)(pm);
        }
        break;
      case HEADING_1.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 1 })(pm);
        }
        break;
      case HEADING_2.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 2 })(pm);
        }
        break;
      case HEADING_3.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 3 })(pm);
        }
        break;
      case HEADING_4.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 4 })(pm);
        }
        break;
      case HEADING_5.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 5 })(pm);
        }
        break;
      case BLOCK_QUOTE.name:
        if (nodes.paragraph && nodes.blockquote) {
          commands.setBlockType(nodes.paragraph)(pm);
          commands.wrapIn(nodes.blockquote)(pm);
        }
        break;
      case CODE_BLOCK.name:
        if (nodes.code_block) {
          transformToCodeBlock(pm);
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
    } else if (name !== BLOCK_QUOTE.name) {
      this.changeBlockType(NORMAL_TEXT.name);
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
    const blockNodes: Node[] = [];

    pm.doc.nodesBetween($from.pos, $to.pos, (node) => {
      if (node.isBlock) {
        blockNodes.push(node);
      }
    });

    return blockNodes;
  }

  private update(dirty = false) {
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
      return NORMAL_TEXT;
    }

    const { $from } = pm.selection;

    for (let depth = 0; depth <= $from.depth; depth++) {
      const node = $from.node(depth)!;
      const blocktype = this.nodeBlockType(node);
      if (blocktype !== OTHER) {
        return blocktype;
      }
    }

    return OTHER;
  }

  private nodeBlockType(node: Node): BlockType {
    if (isHeadingNode(node)) {
      switch (node.attrs.level) {
        case 1:
          return HEADING_1;
        case 2:
          return HEADING_2;
        case 3:
          return HEADING_3;
        case 4:
          return HEADING_4;
        case 5:
          return HEADING_5;
      }
    } else if (isCodeBlockNode(node)) {
      return CODE_BLOCK;
    } else if (isBlockQuoteNode(node)) {
      return BLOCK_QUOTE;
    } else if (isParagraphNode(node)) {
      return NORMAL_TEXT;
    }

    return OTHER;
  }

  private analyticsEventName(eventSource: string, blockTypeName: string): string {
    return `atlassian.editor.format.${blockTypeName}.${eventSource}`;
  }

  private addAvailableContext(name: ContextName, groupedBlockTypes: GroupedBlockTypes): void {
    const context = this.makeContext(
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
      case NORMAL_TEXT:
        return !!pm.schema.nodes.paragraph;
      case HEADING_1:
      case HEADING_2:
      case HEADING_3:
      case HEADING_4:
      case HEADING_5:
        return !!pm.schema.nodes.heading;
      case BLOCK_QUOTE:
        return !!pm.schema.nodes.blockquote;
      case CODE_BLOCK:
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
