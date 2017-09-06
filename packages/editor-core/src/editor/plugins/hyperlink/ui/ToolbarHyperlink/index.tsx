import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../../../../analytics';
import { addLink, tooltip } from '../../../../../keymaps';
import { EditorView, PluginKey } from '../../../../../prosemirror';
import { HyperlinkState } from '../../../../../editor/plugins/hyperlink/pm-plugins';
import { showLinkPanel } from '../../../../../editor/plugins/hyperlink/pm-plugins/commands';
import ToolbarButton from '../../../../../ui/ToolbarButton';
import { OuterContainer } from './styles';

export interface Props {
  editorView: EditorView;
  pluginState: HyperlinkState;
  disabled?: boolean;
}

export interface State {
  adding?: boolean;
  disabled?: boolean;
}

export const stateKey = new PluginKey('hypelinkPlugin');

export default class ToolbarHyperlink extends PureComponent<Props, State> {
  state: State = {};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { adding, disabled } = this.state;

    return (
      <OuterContainer>
        <ToolbarButton
          disabled={disabled || this.props.disabled}
          onClick={this.toggleLinkPanel}
          selected={adding}
          title={tooltip(addLink)}
          iconBefore={<LinkIcon label="Add link" />}
        />
      </OuterContainer>
    );
  }

  @analytics('atlassian.editor.format.hyperlink.button')
  private toggleLinkPanel = () => {
    const { pluginState, editorView } = this.props;
    const { state, dispatch } = editorView;
    const { showToolbarPanel, linkable, active } = pluginState;
    return showLinkPanel(showToolbarPanel, linkable, active)(state, dispatch);
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    this.setState({
      disabled: !pluginState.linkable || pluginState.active
    });
  }
}
