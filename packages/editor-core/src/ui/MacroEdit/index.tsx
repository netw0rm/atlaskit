import * as React from 'react';
import { PureComponent } from 'react';
import FloatingToolbar from '../FloatingToolbar';
import ToolbarButton from '../ToolbarButton';
import EditIcon from '@atlaskit/icon/glyph/editor/edit';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { EditorView } from '../../prosemirror';

import { MacroState } from '../../plugins/macro';
import * as styles from './styles';

export interface Props {
  editorView: EditorView;
  pluginState: MacroState;
}

export interface State {
  toolbarVisible: boolean | undefined;
  target?: HTMLElement | undefined;
}

export default class MacroEdit extends PureComponent<Props, State> {
  state: State = { toolbarVisible: false };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { target, toolbarVisible } = this.state;
    if (toolbarVisible) {
      return (
        <FloatingToolbar target={target} align="left">
          <ToolbarButton
            wrapperClassName={
              styles.buttonWrapperStyle
            }
            onClick={this.handleParamsUpdate.bind(this, 'params')}
            iconBefore={<EditIcon label="Edit macro" />}
          />
          <span className={styles.removeButtonWrapperStyle}>
            <ToolbarButton
              wrapperClassName={styles.buttonWrapperStyle}
              onClick={this.handleRemoveMacro}
              iconBefore={<RemoveIcon label="Remove macro" />}
            />
          </span>
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  private handlePluginStateChange = (pluginState: MacroState) => {
    const { element: target, toolbarVisible } = pluginState;
    this.setState({
      toolbarVisible,
      target
    });
  }

  private handleParamsUpdate = (params: string, event) => {
    // TODO
  }

  private handleRemoveMacro = () => {
    const { editorView } = this.props;
    this.props.pluginState.removeMacro(editorView);
  }
}
