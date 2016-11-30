import {
  commands,
  MarkType,
  Plugin,
  ProseMirror,
  Schema,
  UpdateScheduler
} from 'ak-editor-prosemirror';
import {
  EmMarkType,
  StrongMarkType,
  UnderlineMarkType
} from 'ak-editor-schema';

export type StateChangeHandler = (state: TextFormattingState) => any;

export type BlockTypeStateSubscriber = (state: TextFormattingState) => void;

export class TextFormattingState {
  private changeHandlers: StateChangeHandler[] = [];
  private pm: PM;

  // public state
  emActive = false;
  emDisabled = false;
  emHidden = false;
  strongActive = false;
  strongDisabled = false;
  strongHidden = false;
  underlineActive = false;
  underlineDisabled = false;
  underlineHidden = false;

  constructor(pm: PM) {
    this.pm = pm;

    this.emHidden = !pm.schema.marks.em;
    this.strongHidden = !pm.schema.marks.strong;
    this.underlineHidden = !pm.schema.marks.u;

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.update());
  }

  toggleEm() {
    const { em } = this.pm.schema.marks;
    if (em) {
      this.toggleMark(em);
    }
  }

  toggleStrong() {
    const { strong } = this.pm.schema.marks;
    if (strong) {
      this.toggleMark(strong);
    }
  }

  toggleUnderline() {
    const { u } = this.pm.schema.marks;
    if (u) {
      this.toggleMark(u);
    }
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  private update() {
    const { pm } = this;
    const { em, strong, u } = pm.schema.marks;
    let dirty = false;

    if (em) {
      const newEmActive = this.markActive(em);
      if (newEmActive !== this.emActive) {
        this.emActive = newEmActive;
        dirty = true;
      }

      const newEmDisabled = !commands.toggleMark(em)(this.pm, false);
      if (newEmDisabled !== this.emDisabled) {
        this.emDisabled = newEmDisabled;
        dirty = true;
      }
    }

    if (strong) {
      const newStrongActive = this.markActive(strong);
      if (newStrongActive !== this.strongActive) {
        this.strongActive = newStrongActive;
        dirty = true;
      }

      const newStrongDisabled = !commands.toggleMark(strong)(this.pm, false);
      if (newStrongDisabled !== this.strongDisabled) {
        this.strongDisabled = newStrongDisabled;
        dirty = true;
      }
    }

    if (u) {
      const newUnderlineActive = this.markActive(u);
      if (newUnderlineActive !== this.underlineActive) {
        this.underlineActive = newUnderlineActive;
        dirty = true;
      }

      const newUnderlineDisabled = !commands.toggleMark(u)(this.pm, false);
      if (newUnderlineDisabled !== this.underlineDisabled) {
        this.underlineDisabled = newUnderlineDisabled;
        dirty = true;
      }
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private markActive(markType: MarkType): boolean {
    const { pm } = this;
    const { from, to, empty } = pm.selection;
    if (empty) {
      return Boolean(markType.isInSet(pm.activeMarks()));
    }
    return pm.doc.rangeHasMark(from, to, markType);
  }

  private toggleMark(markType: MarkType) {
    this.pm.on.interaction.dispatch();
    commands.toggleMark(markType)(this.pm);
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(TextFormattingState, 'name', { value: 'TextFormattingState' });

export default new Plugin(TextFormattingState);

interface S extends Schema {
  marks: {
    strong?: StrongMarkType;
    em?: EmMarkType;
    u?: UnderlineMarkType;
  }
}

interface PM extends ProseMirror {
  schema: S;
}
