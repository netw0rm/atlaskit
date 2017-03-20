import {
  Mark,
  MarkType,
  Plugin,
  PluginKey,
  EditorState,
  EditorView,
} from '../../prosemirror';

import * as commands from '../../commands';
import keymapPlugin from './keymap';
import inputRulePlugin from './input-rule';
import { reconfigure } from '../utils';

export type StateChangeHandler = (state: TextFormattingState) => any;

export type BlockTypeStateSubscriber = (state: TextFormattingState) => void;

export class TextFormattingState {
  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;

  // public state
  emActive = false;
  emDisabled = false;
  emHidden = false;
  codeActive = false;
  codeDisabled = false;
  codeHidden = false;
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

  constructor(state: EditorState<any>) {
    this.state = state;

    this.emHidden = !state.schema.marks.em;
    this.strongHidden = !state.schema.marks.strong;
    this.underlineHidden = !state.schema.marks.u;
    this.codeHidden = !state.schema.marks.code;
    this.superscriptHidden = !state.schema.marks.subsup;
    this.subscriptHidden = !state.schema.marks.subsup;
    this.strikeHidden = !state.schema.marks.strike;

    this.update(state);
  }

  toggleEm(view: EditorView) {
    const { em } = this.state.schema.marks;
    if (em) {
      this.toggleMark(view, em);
    }
  }

  toggleCode(view: EditorView) {
    const { code } = this.state.schema.marks;
    if (code) {
      commands.toggleMark(code)(view.state, view.dispatch);
    }
  }

  toggleStrike(view: EditorView) {
    const { strike } = this.state.schema.marks;
    if (strike) {
      this.toggleMark(view, strike);
    }
  }

  toggleStrong(view: EditorView) {
    const { strong } = this.state.schema.marks;
    if (strong) {
      this.toggleMark(view, strong);
    }
  }

  toggleSuperscript(view: EditorView) {
    const { subsup } = this.state.schema.marks;
    if (subsup) {
      if (this.subscriptActive) {
        // If subscript is enabled, turn it off first.
        this.toggleMark(view, subsup);
      }

      this.toggleMark(view, subsup, { type: 'sup' });
    }
  }

  toggleSubscript(view: EditorView) {
    const { subsup } = this.state.schema.marks;
    if (subsup) {
      if (this.superscriptActive) {
        // If superscript is enabled, turn it off first.
        this.toggleMark(view, subsup);
      }

      this.toggleMark(view, subsup, { type: 'sub' });
    }
  }

  toggleUnderline(view: EditorView) {
    const { u } = this.state.schema.marks;
    if (u) {
      this.toggleMark(view, u);
    }
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(newEditorState: EditorState<any>) {
    this.state = newEditorState;

    const { state } = this;
    const { em, code, strike, strong, subsup, u } = state.schema.marks;
    let dirty = false;

    if (code) {
      const newCodeActive = this.anyMarkActive(code);
      if (newCodeActive !== this.codeActive) {
        this.codeActive = newCodeActive;
        dirty = true;
      }

      const newCodeDisabled = !commands.toggleMark(code)(this.state);
      if (newCodeDisabled !== this.codeDisabled) {
        this.codeDisabled = newCodeDisabled;
        dirty = true;
      }
    }

    if (em) {
      const newEmActive = this.anyMarkActive(em);
      if (newEmActive !== this.emActive) {
        this.emActive = newEmActive;
        dirty = true;
      }

      const newEmDisabled = !commands.toggleMark(em)(this.state);
      if (this.codeActive || newEmDisabled !== this.emDisabled) {
        this.emDisabled = this.codeActive ? true : newEmDisabled;
        dirty = true;
      }
    }

    if (strike) {
      const newStrikeActive = this.anyMarkActive(strike);
      if (newStrikeActive !== this.strikeActive) {
        this.strikeActive = newStrikeActive;
        dirty = true;
      }

      const newStrikeDisabled = !commands.toggleMark(strike)(this.state);
      if (this.codeActive || newStrikeDisabled !== this.strikeDisabled) {
        this.strikeDisabled = this.codeActive ? true : newStrikeDisabled;
        dirty = true;
      }
    }

    if (strong) {
      const newStrongActive = this.anyMarkActive(strong);
      if (newStrongActive !== this.strongActive) {
        this.strongActive = newStrongActive;
        dirty = true;
      }

      const newStrongDisabled = !commands.toggleMark(strong)(this.state);
      if (this.codeActive || newStrongDisabled !== this.strongDisabled) {
        this.strongDisabled = this.codeActive ? true : newStrongDisabled;
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

      const newSubscriptDisabled = !commands.toggleMark(subsup, { type: 'sub' })(this.state);
      if (this.codeActive || newSubscriptDisabled !== this.subscriptDisabled) {
        this.subscriptDisabled = this.codeActive ? true : newSubscriptDisabled;
        dirty = true;
      }

      const newSuperscriptActive = this.markActive(supMark);
      if (newSuperscriptActive !== this.superscriptActive) {
        this.superscriptActive = newSuperscriptActive;
        dirty = true;
      }

      const newSuperscriptDisabled = !commands.toggleMark(subsup, { type: 'sup' })(this.state);
      if (this.codeActive || newSuperscriptDisabled !== this.superscriptDisabled) {
        this.superscriptDisabled = this.codeActive ? true : newSuperscriptDisabled;
        dirty = true;
      }
    }

    if (u) {
      const newUnderlineActive = this.anyMarkActive(u);
      if (newUnderlineActive !== this.underlineActive) {
        this.underlineActive = newUnderlineActive;
        dirty = true;
      }

      const newUnderlineDisabled = !commands.toggleMark(u)(this.state);
      if (this.codeActive || newUnderlineDisabled !== this.underlineDisabled) {
        this.underlineDisabled = this.codeActive ? true : newUnderlineDisabled;
        dirty = true;
      }
    }

    if (dirty) {
      this.triggerOnChange();
    }
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  /**
   * Determine if a mark of a specific type exists anywhere in the selection.
   */
  private anyMarkActive(markType: MarkType): boolean {
    const { state } = this;
    const { from, to, empty } = state.selection;
    if (empty) {
      return !!markType.isInSet(state.selection.$from.marks());
    }
    return state.doc.rangeHasMark(from, to, markType);
  }

  /**
   * Determine if a mark (with specific attribute values) exists anywhere in the selection.
   */
  private markActive(mark: Mark): boolean {
    const { state } = this;
    const { from, to, empty } = state.selection;

    // When the selection is empty, only the active marks apply.
    if (empty) {
      return !!mark.isInSet(state.selection.$from.marks());
    }

    // For a non-collapsed selection, the marks on the nodes matter.
    let found = false;
    state.doc.nodesBetween(from, to, node => {
      found = found || mark.isInSet(node.marks);
    });

    return found;
  }

  private toggleMark(view: EditorView, markType: MarkType, attrs?: any) {
    // Disable text-formatting inside code
    if (this.codeActive ? this.codeDisabled : true) {
      commands.toggleMark(markType)(view.state, view.dispatch);
    }
  }
}

const stateKey = new PluginKey('hypelinkPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new TextFormattingState(state);
    },
    apply(tr, pluginState: TextFormattingState, oldState, newState) {
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
