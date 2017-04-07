import ImageIcon from '@atlaskit/icon/glyph/editor/image';
import * as React from 'react';
import { PureComponent } from 'react';
import { MediaPluginState } from '../../plugins/media';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  pluginState: MediaPluginState;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMedia extends PureComponent<Props, State> {
  state: State = {disabled: false};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    if (this.state.disabled) {
      return null;
    }

    return (
      <ToolbarButton
        onClick={this.handleClickMediaButton}
        iconBefore={<ImageIcon label="Image" />}
      />
    );
  }

  private handlePluginStateChange = (pluginState: MediaPluginState) => {
    this.setState({
      disabled: !pluginState.allowsUploads
    });
  }

  private handleClickMediaButton = () => {
    this.props.pluginState.showMediaPicker();
  }
}
