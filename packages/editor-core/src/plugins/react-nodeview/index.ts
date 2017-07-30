import {
  EditorState,
  Schema,
  Plugin,
  PluginKey,
  EditorView,
} from '../../prosemirror';

export type StateChangeHandler = (anchorPos: number, headPos: number) => any;

export class ReactNodeViewState {
  private changeHandlers: StateChangeHandler[] = [];

  constructor() {
    this.changeHandlers = [];
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  notifyNewSelection(anchorPos: number, headPos: number) {
    this.changeHandlers.forEach(cb => cb(anchorPos, headPos));
  }
}

export const stateKey = new PluginKey('reactNodeView');

export const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new ReactNodeViewState();
    },
    apply(tr, pluginState: ReactNodeViewState, oldState, newState) {
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    const pluginState: ReactNodeViewState = stateKey.getState(view.state);

    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        const { $anchor, $head } = view.state.selection;
        pluginState.notifyNewSelection($anchor.pos, $head.pos);
      }
    };
  }
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin];
};

export default plugins;
