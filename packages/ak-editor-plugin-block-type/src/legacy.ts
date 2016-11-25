import { commands, NodeType, Plugin, ProseMirror, Selection, UpdateScheduler } from 'ak-editor-prosemirror';
import CodeBlockPasteListener from './code-block-paste-listener';
import transformToCodeBlock from './transform-to-code-block';

export interface BlockTypeState {
  selectedBlockType?: string;
  enabled?: boolean;
}

const DEFAULT_STATE: BlockTypeState = {
  selectedBlockType: 'paragraph',
  enabled: true
};

function isShallowObjectEqual(oldObject: BlockTypeState, newObject: BlockTypeState): boolean {
  return JSON.stringify(oldObject) === JSON.stringify(newObject);
}

export type StateChangeHandler = (state: BlockTypeState) => any;

class BlockTypePlugin {
  changeHandlers: StateChangeHandler[];
  pm: ProseMirror;
  state: BlockTypeState;
  updater: UpdateScheduler;

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.state = DEFAULT_STATE;
    this.changeHandlers = [];

    // add paste listener to overwrite the prosemirror's
    // see https://discuss.prosemirror.net/t/handle-paste-inside-code-block/372/5?u=bradleyayers
    pm.root.addEventListener('paste', new CodeBlockPasteListener(pm), true);

    this.updater = pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());
  }

  setState(...newState: BlockTypeState[]) : BlockTypeState  {
    this.state = Object.assign.apply(
      Object,
      [
        {},
        DEFAULT_STATE,
      ].concat(newState)
    );
    return this.state;
  }

  getState() : BlockTypeState {
    return Object.assign({}, this.state);
  }

  update() {
    const pm = this.pm;
    const node = pm.selection.$from.node(1);
    const oldState = this.getState();
    let blockType = node.type.name + (node.attrs.level ? node.attrs.level : '');

    // we can get away by not checking all the types since the dropdown get
    // enabled as a group intead of per option
    const canChangeBlockType = [
      'code_block',
      'paragraph',
    ].some((type) => commands.setBlockType(pm.schema.nodes[type])(pm, false));

    this.setState({
      selectedBlockType: blockType,
      enabled: canChangeBlockType
    });

    if (!isShallowObjectEqual(oldState, this.state)) {
      this.changeHandlers.every(cb => cb(this.getState()));
    }
  }

  changeBlockType(blockType: string, attrs?: Object) : boolean {
    const { enabled } = this.getState();
    const pm = this.pm;

    if (!enabled) {
      return false;
    }

    // clear blockquote
    commands.lift(pm);

    if (blockType === 'blockquote') {
      // change it back to paragraph
      commands.setBlockType(pm.schema.nodes.paragraph as NodeType)(pm);
      return commands.wrapIn(pm.schema.nodes[blockType] as NodeType)(pm);
    }

    if (blockType === 'code_block') {
      return transformToCodeBlock(pm.schema.nodes[blockType], pm);
    }

    return commands.setBlockType(
      pm.schema.nodes[blockType],
      attrs
    )(pm);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this.getState());
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(BlockTypePlugin, 'name', { value: 'BlockTypePlugin' });

export default new Plugin(BlockTypePlugin);
