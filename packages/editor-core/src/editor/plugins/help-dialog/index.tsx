import * as React from 'react';
import { EditorPlugin } from '../../types';
import { Plugin, PluginKey, keymap } from '../../../prosemirror';
import WithPluginState from '../../ui/WithPluginState';

export const pluginKey = new PluginKey('helpDialogPlugin');

export const toggleHelpCommand = () => (tr, dispatch) => {
  tr = tr.setMeta(pluginKey, true);
  dispatch(tr);
};

export function createPlugin(dispatch) {
  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        return { isVisible: false };
      },
      apply(tr, value, state) {
        const currentState = pluginKey.getState(state);
        const shouldToggle = tr.getMeta(pluginKey);
        if (shouldToggle) {
          const newState = { isVisible: currentState && !currentState.isVisible };
          dispatch(pluginKey, newState);
          return newState;
        }
        return currentState;
      }
    }
  });
}

class HelpDialog extends React.Component<any, any> {
  handleEsc = e => {
    if (e.key !== 'Escape') {
      return;
    }

    const editorView = this.props.editorView;
    if (this.props.isVisible) {
      toggleHelpCommand()(editorView.state.tr, editorView.dispatch);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    return this.props.isVisible ? <div>1</div> : <div>0</div>;
  }
}

const helpDialog: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 500, plugin: (schema, props, dispatch) => createPlugin(dispatch) },
      { rank: 500, plugin: (schema, props) => keymap({
          '\\'(state, dispatch) {
            toggleHelpCommand()(state.tr, dispatch);
          }
        })
      },
    ];
  },

  contentComponent(view, dispatcher) {
    return <WithPluginState
      editorView={view}
      eventDispatcher={dispatcher}
      plugins={{
        helpDialog: pluginKey
      }}
      // tslint:disable-next-line:jsx-no-lambda
      render={({ helpDialog = {} as any }) => <HelpDialog editorView={view} isVisible={helpDialog.isVisible} />}
    />;
  }
};

export default helpDialog;
