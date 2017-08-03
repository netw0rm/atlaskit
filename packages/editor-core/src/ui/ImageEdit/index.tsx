import * as React from 'react';
import { PureComponent } from 'react';
import FloatingToolbar from '../FloatingToolbar';
import AlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import AlignCenterIcon from '@atlaskit/icon/glyph/editor/align-center';
import AlignRightIcon from '@atlaskit/icon/glyph/editor/align-right';
import { EditorView } from '../../prosemirror';
import ToolbarButton from '../ToolbarButton';

import { MediaPluginState } from '../../plugins/media';

export interface Props {
  editorView: EditorView;
  pluginState: MediaPluginState;
}

export interface State {
  target?: HTMLElement | undefined;
  toolbarVisible: boolean;
}

export default class ImageEdit extends PureComponent<Props, State> {
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
        <FloatingToolbar
          target={target}
          offset={[-3, 3]}
          alignY="top"
        >
          <ToolbarButton
            onClick={this.alignLeft}
            iconBefore={<AlignLeftIcon label="Align left" />}
          />
          <ToolbarButton
            onClick={this.alignCenter}
            iconBefore={<AlignCenterIcon label="Align center" />}
          />
          <ToolbarButton
            onClick={this.alignRight}
            iconBefore={<AlignRightIcon label="Align right" />}
          />
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  private handlePluginStateChange = (pluginState: MediaPluginState) => {
    const { selectedMediaElement, toolbarVisible } = pluginState;
    this.setState({
      target: selectedMediaElement,
      toolbarVisible
    });
  }

  private alignLeft = (): void => {
    this.props.pluginState.alignLeft();
  }

  private alignCenter = (): void => {
    this.props.pluginState.alignCenter();
  }

  private alignRight = (): void => {

  }
}
