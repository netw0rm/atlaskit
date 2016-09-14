import { commands, Plugin, ProseMirror, Selection, UpdateScheduler } from 'ak-editor-prosemirror';
const tick = setImmediate || setTimeout;

export interface BlockTypeState {
  selectedBlockType?: string;
  enabled?: boolean;
}

const DEFAULT_STATE: BlockTypeState = {
  selectedBlockType: 'paragraph',
  enabled: false
};

function isShallowObjectEqual(oldObject: BlockTypeState, newObject: BlockTypeState): boolean {
  return JSON.stringify(oldObject) === JSON.stringify(newObject);
}

function getSelectionNode(selection: Selection) {
  return selection.$from.node(1);
}

export type StateChangeHandler = (state: BlockTypeState) => any;

export default new Plugin(class BlockTypePlugin {
  changeHandlers: StateChangeHandler[];
  pm: ProseMirror;
  state: BlockTypeState;
  updater: UpdateScheduler;

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.state = DEFAULT_STATE;
    this.changeHandlers = [];

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
    const node = getSelectionNode(pm.selection);
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
      commands.setBlockType(pm.schema.nodes.paragraph as Node)(pm);
      return commands.wrapIn(pm.schema.nodes[blockType] as Node)(pm);
    }

    return commands.setBlockType(
      pm.schema.nodes[blockType],
      attrs
    )(pm);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    tick(() => cb(this.getState()));
  }
});
