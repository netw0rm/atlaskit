import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  tableEditing,
  Transaction,
} from '../../prosemirror';
import * as tableCommands from '../../prosemirror/prosemirror-tables';
import keymapHandler from './keymap';

export type TableStateSubscriber = (state: TableState) => any;

export interface TablesCommand {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
}

export class TableState {
  private state: EditorState<any>;
  private changeHandlers: TableStateSubscriber[] = [];
  keymapHandler;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
  }

  subscribe(cb: TableStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: TableStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(newEditorState: EditorState<any>) {
    this.state = newEditorState;
    let dirty = false;

    // TODO: ED-1858, ED-1859

    if (dirty) {
      this.triggerOnChange();
    }
  }

  goToNextCell (direction: number): TablesCommand {
    return tableCommands.goToNextCell(direction);
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }
}

export const stateKey = new PluginKey('tablePlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new TableState(state);
    },
    apply(tr, pluginState: TableState, oldState, newState) {
      const stored = tr.getMeta(stateKey);
      if (stored) {
        pluginState.update(newState);
      }
      return pluginState;
    }
  },
  key: stateKey,
  view: (editorView: EditorView) => {
    const pluginState = stateKey.getState(editorView.state);

    pluginState.update(editorView.state, editorView.docView);
    pluginState.keymapHandler = keymapHandler(pluginState);

    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        pluginState.update(view.state, view.docView);
      }
    };
  },
  props: {
    handleKeyDown(view, event) {
      return stateKey.getState(view.state).keymapHandler(view, event);
    }
  }
});

const plugins = () => {
  return [tableEditing(), plugin].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
