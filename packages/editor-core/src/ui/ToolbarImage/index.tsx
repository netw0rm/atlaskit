import ImageIcon from 'ak-icon/glyph/editor/image';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { ImageUploadState } from '../../plugins/image-upload';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  pluginState: ImageUploadState;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarImage extends PureComponent<Props, State> {
  state: State = {disabled: false};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { disabled } = this.state;

    return (
      <ToolbarButton
        onClick={this.handleInsertImage}
        disabled={disabled}
        iconBefore={<ImageIcon label="Image" />}
      />
    );
  }

  private handlePluginStateChange = (pluginState: ImageUploadState) => {
    this.setState({
      disabled: !pluginState.enabled
    });
  }

  @analytics('atlassian.editor.image.button')
  private handleInsertImage = () => {
    this.props.pluginState.handleImageUpload();
  }
}
