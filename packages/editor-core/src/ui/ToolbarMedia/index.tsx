import ImageIcon from '@atlaskit/icon/glyph/editor/image';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { MediaState } from '../../plugins/media';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  pluginState: MediaState;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMedia extends PureComponent<Props, State> {
  state: State = {disabled: false};

  render() {
    const { disabled } = this.state;

    return (
      <ToolbarButton
        onClick={this.handleInsertMedia}
        disabled={disabled}
        iconBefore={<ImageIcon label="Image" />}
      />
    );
  }

  @analytics('atlassian.editor.media.button')
  private handleInsertMedia = () => {
    this.props.pluginState.handleClickMediaButton();
  }
}
