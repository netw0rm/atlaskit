import {
  EditorState,
  EditorView,
  Fragment,
  Node,
  Plugin,
  // TextSelection,
} from '../../prosemirror';
import { ContextName } from '../../';
// import { analyticsService, trackAndInvoke } from '../../analytics';

import { bind as bindKeymap } from '../keymaps/buildKeymap';
import * as keymaps from '../keymaps/utils-future';
import * as commands from '../../commands';

export type StateChangeHandler = (state: BlockTypeState) => any;

// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
const NORMAL_TEXT = makeBlockType('normal', 'Normal text');
const HEADING_1 = makeBlockType('heading1', 'Heading 1');
const HEADING_2 = makeBlockType('heading2', 'Heading 2');
const HEADING_3 = makeBlockType('heading3', 'Heading 3');
const HEADING_4 = makeBlockType('heading4', 'Heading 4');
const HEADING_5 = makeBlockType('heading5', 'Heading 5');
const BLOCK_QUOTE = makeBlockType('blockquote', 'Block quote');
const CODE_BLOCK = makeBlockType('codeblock', 'Code block');
const PANEL = makeBlockType('panel', 'Panel');
const OTHER = makeBlockType('other', 'Other…');

export type GroupedBlockTypes = BlockType[][];
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
  'panel' |
  'other';

export interface BlockType {
  name: BlockTypeName;
  title: string;
  shortcut?: string;
}

interface Context {
  name: ContextName;
  groupedBlockTypes: GroupedBlockTypes;
  // keymap: Keymap;
}

function makeBlockType(name: BlockTypeName, title: string): BlockType {
  return { name: name, title: title };
}

/**
 *
 * Plugin State
 *
 */
export class BlockTypeState {
  private changeHandlers: StateChangeHandler[] = [];
  private availableContexts: Context[] = [];
  private state: EditorState<any>;

  // public state
  currentBlockType: BlockType = NORMAL_TEXT;
  availableBlockTypes: GroupedBlockTypes = [];
  context?: ContextName;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;

    this.addAvailableContext('default', [
      [NORMAL_TEXT],
      [HEADING_1, HEADING_2, HEADING_3, HEADING_4, HEADING_5],
      [BLOCK_QUOTE, CODE_BLOCK, PANEL]
    ]);

    this.changeContext('default');

    this.update(state);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  update(newEditorState, dirty = false) {
    this.state = newEditorState;

    const newBlockType = this.detectBlockType();
    if (newBlockType !== this.currentBlockType) {
      this.currentBlockType = newBlockType;
      dirty = true;
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }

  changeContext(name: ContextName): void {
    let context = this.findContext(name);

    if (!context) {
      console.warn(`Atlassian Editor: unknown editor context "${name}"`);
      context = this.availableContexts['default'];
    }

    if (name !== this.context && context) {
      // this.updateBlockTypeKeymap(context);

      this.context = context.name;
      this.availableBlockTypes = context.groupedBlockTypes;

      this.update(this.state, true);
    }
  }

  toggleBlockType(name: BlockTypeName, view: EditorView): void {
    const { state } = this;
    const { nodes } = state.schema;

    switch (name) {
      case NORMAL_TEXT.name:
        if (nodes.paragraph) {
          commands.setNormalText()(view.state, view.dispatch);
        }
        break;
      case HEADING_1.name:
        if (nodes.heading) {
          commands.toggleHeading(1)(view.state, view.dispatch);
        }
        break;
      case HEADING_2.name:
        if (nodes.heading) {
          commands.toggleHeading(2)(view.state, view.dispatch);
        }
        break;
      case HEADING_3.name:
        if (nodes.heading) {
          commands.toggleHeading(3)(view.state, view.dispatch);
        }
        break;
      case HEADING_4.name:
        if (nodes.heading) {
          commands.toggleHeading(4)(view.state, view.dispatch);
        }
        break;
      case HEADING_5.name:
        if (nodes.heading) {
          commands.toggleHeading(5)(view.state, view.dispatch);
        }
        break;
      case BLOCK_QUOTE.name:
        if (nodes.paragraph && nodes.blockquote) {
          commands.toggleBlockquote()(view.state, view.dispatch);
        }
        break;
      case CODE_BLOCK.name:
        if (nodes.codeBlock) {
          commands.toggleCodeBlock()(view.state, view.dispatch);
        }
        break;
      case PANEL.name:
        if (nodes.panel && nodes.paragraph) {
          commands.togglePanel()(view.state, view.dispatch);
        }
        break;
    }
  }

  insertNewLine(): boolean {
    const { state } = this;
    const { $from } = state.selection;
    const node = $from.parent;
    const { hard_break } = state.schema.nodes;

    if (hard_break) {
      const hardBreakNode = hard_break.create();

      if (node.type.validContent(Fragment.from(hardBreakNode))) {
        state.tr.replaceSelection(hardBreakNode).scrollIntoView();
        return true;
      }
    }

    state.tr.insertText('\n').scrollIntoView();
    return true;
  }

  focus(view): void {
    view.dom.focus();
  }

  blur(view): void {
    view.dom.focus();
  }

  // private createNewParagraphAbove() {
  //   const append = false;

  //   if (!this.canMoveUp()) {
  //     this.createParagraphNear(append);
  //     return true;
  //   }

  //   return false;
  // }

  // private canMoveUp(): boolean {
  //   const { selection } = this.state;
  //   if (selection instanceof TextSelection) {
  //     if (!selection.empty) {
  //       return true;
  //     }
  //   }

  //   return selection.$from.pos !== selection.$from.depth;
  // }

  // private createNewParagraphBelow() {
  //   const append = true;

  //   if (!this.canMoveDown()) {
  //     this.createParagraphNear(append);
  //     return true;
  //   }

  //   return false;
  // }

  // private canMoveDown(): boolean {
  //   const { selection, doc } = this.state;
  //   if (selection instanceof TextSelection) {
  //     if (!selection.empty) {
  //       return true;
  //     }
  //   }

  //   return doc.nodeSize - selection.$to.pos - 2 !== selection.$to.depth;
  // }

  // private createParagraphNear(append: boolean = true): void {
  //   const { state } = this;
  //   const paragraph = state.schema.nodes.paragraph;

  //   if (!paragraph) {
  //     return;
  //   }

  //   let insertPos;

  //   if (state.selection instanceof TextSelection) {
  //     if (this.topLevelNodeIsEmptyTextBlock()) {
  //       return;
  //     }
  //     insertPos = this.getInsertPosFromTextBlock(append);
  //   } else {
  //     insertPos = this.getInsertPosFromNonTextBlock(append);
  //   }

  //   state.tr.insert(insertPos, paragraph.create()).scrollIntoView();

  //   const next = new TextSelection(state.doc.resolve(insertPos + 1));
  //   state.tr.setSelection(next).scrollIntoView();
  // }
// 
  // private getInsertPosFromTextBlock(append: boolean): void {
  //   const { state } = this;

  //   const { $from, $to } = state.selection;
  //   let pos;

  //   if (!append) {
  //     pos = $from.start($from.depth) - 1;
  //     pos = $from.depth > 1 ? pos - 1 : pos;
  //   } else {
  //     pos = $to.end($to.depth) + 1;
  //     pos = $to.depth > 1 ? pos + 1 : pos;
  //   }

  //   return pos;
  // }

  // private getInsertPosFromNonTextBlock(append: boolean): void {
  //   const { state } = this;

  //   const { $from, $to } = state.selection;
  //   let pos;

  //   if (!append) {
  //     // The start position is different with text block because it starts from 0
  //     pos = $from.start($from.depth);
  //     // The depth is different with text block because it starts from 0
  //     pos = $from.depth > 0 ? pos - 1 : pos;
  //   } else {
  //     pos = $to.end($to.depth);
  //     pos = $to.depth > 0 ? pos + 1 : pos;
  //   }

  //   return pos;
  // }

  // private topLevelNodeIsEmptyTextBlock(): boolean {
  //   const topLevelNode = this.state.selection.$from.node(1);
  //   return topLevelNode.isTextblock && topLevelNode.type !== this.state.schema.nodes.codeBlock && topLevelNode.nodeSize === 2;
  // }

  // private updateBlockTypeKeymap(context: Context) {
  //   const { state } = this;
  //   if (this.context) {
  //     const previousContext = this.findContext(this.context);
  //     if (previousContext) {
  //       pm.removeKeymap(previousContext.keymap);
  //     }
  //   }

  //   pm.addKeymap(context.keymap);
  // }

  // private keymapForBlockTypes(groupedBlockTypes: GroupedBlockTypes) {
  //   let bindings: { [key: string]: any } = {};

  //   const bind = (key: string, action: any): void => {
  //     bindings = { ...bindings, ...{ [key]: action } };
  //   };

  //   groupedBlockTypes.forEach(blockTypes => blockTypes.forEach((blockType) => {
  //     const shortcut = keymaps.findShortcutByDescription(blockType.title);
  //     if (shortcut) {
  //       const eventName = this.analyticsEventName('keyboard', blockType.name);
  //       bind(shortcut, trackAndInvoke(eventName, () => this.toggleBlockType(blockType.name)));
  //     }
  //   }));

  //   return new Keymap(bindings);
  // }

  // private addBasicKeymap(): void {
  //   const baseKeymap = this.pm.input.keymaps.filter(k => (k as any).priority === -100)[0];
  //   this.pm.addKeymap(new Keymap({
  //     [keymaps.insertNewLine.common!]: trackAndInvoke('atlassian.editor.newline.keyboard', () => this.insertNewLine()),
  //     [keymaps.moveUp.common!]: trackAndInvoke('atlassian.editor.moveup.keyboard', () => this.createNewParagraphAbove()),
  //     [keymaps.moveDown.common!]: trackAndInvoke('atlassian.editor.movedown.keyboard', () => this.createNewParagraphBelow()),
  //     [keymaps.shiftBackspace.common!]: (baseKeymap as any).map.lookup('Backspace'),
  //     [keymaps.createCodeBlock.common!]: () => this.createCodeBlock()
  //   }));
  // }

  // private createCodeBlock(): boolean {
  //   const { $from } = this.state.selection;
  //   const parentBlock = $from.parent;
  //   if (!parentBlock.isTextblock) {
  //     return false;
  //   }
  //   const startPos = $from.start($from.depth);

  //   let textOnly = true;

  //   this.state.doc.nodesBetween(startPos, $from.pos, (node) => {
  //     if (node.childCount === 0 && !node.isText && !node.isTextblock) {
  //       textOnly = false;
  //     }
  //   });

  //   if (!textOnly) {
  //     return false;
  //   }

  //   if (!this.state.schema.nodes.code_block) {
  //     return false;
  //   }

  //   const fencePart = parentBlock.textContent.slice(0, $from.pos - startPos).trim();

  //   const matches = /^```([^\s]+)?/.exec(fencePart);

  //   if (matches) {
  //     if (isConvertableToCodeBlock(this.pm)) {
  //       const eventName = this.analyticsEventName('autoformatting', 'codeblock');
  //       analyticsService.trackEvent(eventName);

  //       transformToCodeBlockAction(this.pm, { language: matches[1] }).delete(startPos, $from.pos).applyAndScroll();
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  private detectBlockType(): BlockType {
    const { state } = this;

    // Before a document is loaded, there is no selection.
    if (!state.selection) {
      return NORMAL_TEXT;
    }

    const { $from } = state.selection;
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
    if (node.type === this.state.schema.nodes.heading) {
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
    } else if (node.type === this.state.schema.nodes.codeBlock) {
      return CODE_BLOCK;
    } else if (node.type === this.state.schema.nodes.blockQuote) {
      return BLOCK_QUOTE;
    } else if (node.type === this.state.schema.nodes.panel) {
      return PANEL;
    } else if (node.type === this.state.schema.nodes.paragraph) {
      return NORMAL_TEXT;
    }

    return OTHER;
  }

  // private analyticsEventName(eventSource: string, blockTypeName: string): string {
  //   return `atlassian.editor.format.${blockTypeName}.${eventSource}`;
  // }

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
    return {
      name: name,
      groupedBlockTypes:
      groupedBlockTypes,
      // keymap: this.keymapForBlockTypes(groupedBlockTypes)
    };
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
    const { state } = this;
    switch (blockType) {
      case NORMAL_TEXT:
        return !!state.schema.nodes.paragraph;
      case HEADING_1:
      case HEADING_2:
      case HEADING_3:
      case HEADING_4:
      case HEADING_5:
        return !!state.schema.nodes.heading;
      case BLOCK_QUOTE:
        return !!state.schema.nodes.blockquote;
      case CODE_BLOCK:
        return !!state.schema.nodes.codeBlock;
      case PANEL:
        return !!state.schema.nodes.panel;
    }
  }
};

bindKeymap([keymaps.splitListItem.common!], commands.splitListItem());
bindKeymap([keymaps.findShortcutByKeymap(keymaps.toggleOrderedList)!], commands.toggleOrderedList());
bindKeymap([keymaps.findShortcutByKeymap(keymaps.toggleBulletList)!], commands.toggleBulletList());

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new BlockTypeState(state);
    },
    apply(tr, pluginState: BlockTypeState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  }
});

export default plugin;

