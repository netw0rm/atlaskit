import {
  EditorState,
  EditorView,
  Node,
  Plugin,
  PluginKey,
  TextSelection
} from '../../prosemirror';
import { ContextName } from '../../';
import { getGroupsInRange } from '../../utils';

import {
  NORMAL_TEXT, HEADING_1, HEADING_2, HEADING_3, HEADING_4, HEADING_5,
  BLOCK_QUOTE, CODE_BLOCK, PANEL, OTHER, BlockType
} from './types';

import * as commands from '../../commands';
import keymapPlugin from './keymap';
import inputRulePlugin from './input-rule';
import { reconfigure } from '../utils';

export type StateChangeHandler = (state: BlockTypeState) => any;
export type GroupedBlockTypes = BlockType[][];
export type BlockTypeStateSubscriber = (state: BlockTypeState) => any;

interface Context {
  name: ContextName;
  groupedBlockTypes: GroupedBlockTypes;
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

  toggleBlockType(name: string, view: EditorView): void {
    const groups = getGroupsInRange(view.state.doc, view.state.selection.$from, view.state.selection.$to);
    const { $from } = groups[0];
    const { $to } = groups[groups.length - 1];
    view.dispatch(view.state.tr.setSelection(new TextSelection($from, $to)));

    groups.reverse();
    groups.forEach(group => {
      commands.toggleBlockType(view, name, group.$from, group.$to);
    });
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
      this.context = context.name;
      this.availableBlockTypes = context.groupedBlockTypes;

      this.update(this.state, true);
    }
  }

  focus(view): void {
    view.dom.focus();
  }

  blur(view): void {
    view.dom.focus();
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

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
      switch (node.attrs['level']) {
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
    } else if (node.type === this.state.schema.nodes.blockquote) {
      return BLOCK_QUOTE;
    } else if (node.type === this.state.schema.nodes.panel) {
      return PANEL;
    } else if (node.type === this.state.schema.nodes.paragraph) {
      return NORMAL_TEXT;
    }

    return OTHER;
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
    return {
      name: name,
      groupedBlockTypes:
      groupedBlockTypes,
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

export const stateKey = new PluginKey('blockTypePlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new BlockTypeState(state);
    },
    apply(tr, pluginState: BlockTypeState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    reconfigure(view, [keymapPlugin(view.state.schema), inputRulePlugin(view.state.schema)]);
    return {};
  }
});

export default plugin;

