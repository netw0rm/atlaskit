import {
  commands,
  Mark,
  MarkType,
  Plugin,
  ProseMirror,
  Schema,
  UpdateScheduler,
  Keymap,
  browser
} from 'ak-editor-prosemirror';
import {
  EmMarkType,
  MonoMarkType,
  StrikeMarkType,
  StrongMarkType,
  SubSupMarkType,
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
  monoActive = false;
  monoDisabled = false;
  monoHidden = false;
  underlineActive = false;
  underlineDisabled = false;
  underlineHidden = false;
  strikeActive = false;
  strikeDisabled = false;
  strikeHidden = false;
  strongActive = false;
  strongDisabled = false;
  strongHidden = false;
  superscriptActive = false;
  superscriptDisabled = false;
  superscriptHidden = false;
  subscriptActive = false;
  subscriptDisabled = false;
  subscriptHidden = false;

  constructor(pm: PM) {
    this.pm = pm;

    this.emHidden = !pm.schema.marks.em;
    this.strongHidden = !pm.schema.marks.strong;
    this.underlineHidden = !pm.schema.marks.u;
    this.monoHidden = !pm.schema.marks.mono;
    this.superscriptHidden = !pm.schema.marks.subsup;
    this.subscriptHidden = !pm.schema.marks.subsup;
    this.strikeHidden = !pm.schema.marks.strike;

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.update());

    this.addKeymap();
  }

  toggleEm() {
    const { em } = this.pm.schema.marks;
    if (em) {
      this.toggleMark(em);
    }
  }

  toggleMono() {
    const { mono } = this.pm.schema.marks;
    if (mono) {
      this.toggleMark(mono);
    }
  }

  toggleStrike() {
    const { strike } = this.pm.schema.marks;
    if (strike) {
      this.toggleMark(strike);
    }
  }

  toggleStrong() {
    const { strong } = this.pm.schema.marks;
    if (strong) {
      this.toggleMark(strong);
    }
  }

  toggleSuperscript() {
    const { subsup } = this.pm.schema.marks;
    if (subsup) {
      if (this.subscriptActive) {
        // If subscript is enabled, turn it off first.
        this.toggleMark(subsup);
      }

      this.toggleMark(subsup, { type: 'sup' });
    }
  }

  toggleSubscript() {
    const { subsup } = this.pm.schema.marks;
    if (subsup) {
      if (this.superscriptActive) {
        // If superscript is enabled, turn it off first.
        this.toggleMark(subsup);
      }

      this.toggleMark(subsup, { type: 'sub' });
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
    const { em, mono, strike, strong, subsup, u } = pm.schema.marks;
    let dirty = false;

    if (em) {
      const newEmActive = this.anyMarkActive(em);
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

    if (mono) {
      const newMonoActive = this.anyMarkActive(mono);
      if (newMonoActive !== this.monoActive) {
        this.monoActive = newMonoActive;
        dirty = true;
      }

      const newMonoDisabled = !commands.toggleMark(mono)(this.pm, false);
      if (newMonoDisabled !== this.monoDisabled) {
        this.monoDisabled = newMonoDisabled;
        dirty = true;
      }
    }

    if (strike) {
      const newStrikeActive = this.anyMarkActive(strike);
      if (newStrikeActive !== this.strikeActive) {
        this.strikeActive = newStrikeActive;
        dirty = true;
      }

      const newStrikeDisabled = !commands.toggleMark(strike)(this.pm, false);
      if (newStrikeDisabled !== this.strikeDisabled) {
        this.strikeDisabled = newStrikeDisabled;
        dirty = true;
      }
    }

    if (strong) {
      const newStrongActive = this.anyMarkActive(strong);
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

    if (subsup) {
      const subMark = subsup.create({ type: 'sub' });
      const supMark = subsup.create({ type: 'sup' });

      const newSubscriptActive = this.markActive(subMark);
      if (newSubscriptActive !== this.subscriptActive) {
        this.subscriptActive = newSubscriptActive;
        dirty = true;
      }

      const newSubscriptDisabled = !commands.toggleMark(subsup, { type: 'sub' })(this.pm, false);
      if (newSubscriptDisabled !== this.subscriptDisabled) {
        this.subscriptDisabled = newSubscriptDisabled;
        dirty = true;
      }

      const newSuperscriptActive = this.markActive(supMark);
      if (newSuperscriptActive !== this.superscriptActive) {
        this.superscriptActive = newSuperscriptActive;
        dirty = true;
      }

      const newSuperscriptDisabled = !commands.toggleMark(subsup, { type: 'sup' })(this.pm, false);
      if (newSuperscriptDisabled !== this.superscriptDisabled) {
        this.superscriptDisabled = newSuperscriptDisabled;
        dirty = true;
      }
    }

    if (u) {
      const newUnderlineActive = this.anyMarkActive(u);
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

  private addKeymap(): void {
    const assistKey = browser.mac ? 'Cmd-' : 'Ctrl-'; 

    const bindings = {
      [assistKey + 'B']: ()=> this.toggleStrong(),
      [assistKey + 'I']: ()=> this.toggleEm(),
      [assistKey + 'U']: ()=> this.toggleUnderline(),
      [assistKey + 'Shift-S']: ()=> this.toggleStrike(),
      [assistKey + 'Shift-M']: ()=> this.toggleMono(),
    };

    this.pm.addKeymap(new Keymap(bindings));
  }

  /**
   * Determine if a mark of a specific type exists anywhere in the selection.
   */
  private anyMarkActive(markType: MarkType): boolean {
    const { pm } = this;
    const { from, to, empty } = pm.selection;
    if (empty) {
      return !!markType.isInSet(pm.activeMarks());
    }
    return pm.doc.rangeHasMark(from, to, markType);
  }

  /**
   * Determine if a mark (with specific attribute values) exists anywhere in the selection.
   */
  private markActive(mark: Mark): boolean {
    const { pm } = this;
    const { from, to, empty } = pm.selection;

    // When the selection is empty, only the active marks apply.
    if (empty) {
      return !!mark.isInSet(pm.activeMarks());
    }

    // For a non-collapsed selection, the marks on the nodes matter.
    let found = false;
    pm.doc.nodesBetween(from, to, node => {
      found = found || mark.isInSet(node.marks);
    });

    return found;
  }

  private toggleMark(markType: MarkType, attrs?: any) {
    this.pm.on.interaction.dispatch();
    commands.toggleMark(markType, attrs)(this.pm);
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(TextFormattingState, 'name', { value: 'TextFormattingState' });

export default new Plugin(TextFormattingState);

interface S extends Schema {
  marks: {
    em?: EmMarkType;
    mono?: MonoMarkType;
    strike?: StrikeMarkType;
    strong?: StrongMarkType;
    subsup?: SubSupMarkType;
    u?: UnderlineMarkType;
  }
}

interface PM extends ProseMirror {
  schema: S;
}
