import { Plugin, ProseMirror, commands, UpdateScheduler } from 'ak-editor-prosemirror';

export interface TextFormattingState {
  strongActive: boolean;
  emActive: boolean;
  underlineActive: boolean;
  codeActive: boolean;
  disabled: boolean;
}

const DEFAULT_STATE: TextFormattingState = {
  strongActive: false,
  emActive: false,
  underlineActive: false,
  codeActive: false,
  disabled: false,
};

function isShallowObjectEqual(
  oldObject: TextFormattingState,
  newObject: TextFormattingState
) : boolean {
  return JSON.stringify(oldObject) === JSON.stringify(newObject);
}

export type StateChangeHandler = (state: TextFormattingState) => any;

export type MarkType = 'strong' | 'em' | 'underline' | 'code';

function markActive(pm: ProseMirror, type: MarkType): boolean {
  const markType = pm.schema.marks[type];
  if (!markType) {
    return false;
  }
  const { from, to, empty } = pm.selection;
  if (empty) {
    return Boolean(markType.isInSet(pm.activeMarks()));
  }
  return pm.doc.rangeHasMark(from, to, markType);
};

export default new Plugin(class TextFormattingPlugin {
  changeHandlers: StateChangeHandler[];
  name: string;
  pm: ProseMirror;
  state: TextFormattingState;
  updater: UpdateScheduler;

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.state = DEFAULT_STATE;
    this.changeHandlers = [];

    this.updater = pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.__update__());
  }

  setState(...newState: TextFormattingState[]): TextFormattingState  {
    this.state = Object.assign.apply(
      Object,
      [
        {},
        DEFAULT_STATE,
      ].concat(newState)
    );
    return this.state;
  }

  getState(): TextFormattingState {
    return Object.assign({}, this.state);
  }

  __update__() {
    const pm = this.pm;
    const oldState = this.getState();

    const enabled = ['strong', 'em', 'underline', 'code'].some((type) => {
      const markType = pm.schema.marks[type];
      if (!markType) {
        return false;
      }

      return commands.toggleMark(markType)(this.pm, false);
    });

    this.setState({
      strongActive: markActive(pm, 'strong'),
      emActive: markActive(pm, 'em'),
      underlineActive: markActive(pm, 'underline'),
      codeActive: markActive(pm, 'code'),
      disabled: !enabled,
    });

    if (!isShallowObjectEqual(oldState, this.state)) {
      this.changeHandlers.every(cb => cb(this.getState()));
    }
  }

  toggleMark(name: MarkType): boolean {
    this.pm.on.interaction.dispatch();
    return commands.toggleMark(this.pm.schema.marks[name])(this.pm);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this.getState());
  }
});
