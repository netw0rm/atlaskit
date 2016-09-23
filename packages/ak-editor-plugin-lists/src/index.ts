import {
  Keymap, Plugin, ProseMirror, ResolvedPos, Node, UpdateScheduler, commands
} from 'ak-editor-prosemirror';

export type ListType = 'bullet_list' | 'ordered_list' | null;

export interface ListsOptions {
  type?: ListType;
}

export interface ListsState extends ListsOptions {
  active?: boolean;
  enabled?: boolean;
}

export type StateChangeHandler = (state: ListsState) => any;

const DISABLED_GROUP = 'unlistable';

const DEFAULT_STATE: ListsState = {
  active: false,
  enabled: true,
  type: null,
};

function canChangeToList(pm: ProseMirror, listsTypes: ListType[]): boolean {
  return listsTypes.some((type) => commands.wrapInList(pm.schema.nodes[type as string])(pm, false));
}

function isNodeListable(proseMirrorInstance: ProseMirror, node: Node): boolean {
  const nodeType = node.type.name;
  const nodeSpecOrderedMap = proseMirrorInstance.schema.nodeSpec;
  return nodeSpecOrderedMap.get(nodeType).group.split(' ').indexOf(DISABLED_GROUP) === -1;
}

function isShallowObjectEqual(oldObject: ListsState, newObject: ListsState): boolean {
  return JSON.stringify(oldObject) === JSON.stringify(newObject);
}

export default new Plugin(class ListsPlugin {
  changeHandlers: StateChangeHandler[];
  pm: ProseMirror;
  state: ListsState;
  updater: UpdateScheduler;
  listTypes: ListType[];

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.state = DEFAULT_STATE;
    this.changeHandlers = [];
    this.listTypes = [
      'bullet_list',
      'ordered_list',
    ];

    const listItem = pm.schema.nodes['list_item'];

    pm.addKeymap(new Keymap({
      'Enter': () => commands.splitListItem(listItem)(pm),
    }));

    this.updater = pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  getState(): ListsState {
    return Object.assign({}, this.state);
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  setState(...newState: ListsState[]): ListsState {
    this.state = Object.assign.apply(
      Object,
      [
        {},
        DEFAULT_STATE,
      ].concat(newState)
    );
    return this.state;
  }

  update() {
    const pm = this.pm;
    const { $head, $from, $to } = pm.selection;
    const oldState = this.getState();

    const $resolvedPos: ResolvedPos = $head || $to;

    // resolvedPos.pos creates an extra offset
    const activeNode: Node = pm.doc.nodeAt($resolvedPos.pos - 1);

    const rootNode: Node = $from.node(1);
    const isList: boolean = this.listTypes.indexOf(rootNode.type.name) !== -1;
    const isListable = activeNode ? isNodeListable(pm, activeNode) : oldState.enabled;
    const canChange = canChangeToList(pm, this.listTypes);

    if (isList && activeNode) {
      this.setState({
        active: true,
        type: rootNode.type.name,
        enabled: true
      });
    } else if (!isListable || !canChange) {
      this.setState({ enabled: false });
    } else {
      this.setState();
    }

    if (!isShallowObjectEqual(oldState, this.state)) {
      this.changeHandlers.every(cb => cb(this.getState()));
    }
  }

  toggleList(type: ListType): boolean {
    const pm = this.pm;
    const { $from } = pm.selection;
    const rootNode: Node = $from.node(1);
    const isList: boolean = this.listTypes.indexOf(rootNode.type.name) !== -1;

    if (isList) {
      if (type === rootNode.type.name) {
        // are we in the same list type, UL trying to toggle UL then we lift it
        return commands.lift(pm, true);
      }

      // we are toggling list types OL to UL for example
      const newList = (
        pm.schema.nodes[(type as string)].create({}, rootNode.content)
      );

      const startPosition = $from.start(1) - 1;

      pm.tr.replaceWith(
        startPosition,
        startPosition + rootNode.nodeSize,
        newList
      ).apply();

      return true;
    }

    return commands.wrapInList(pm.schema.nodes[type as string] as Node)(pm);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this.getState());
  }
});
