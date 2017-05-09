import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { addLink, tooltip } from '../../keymaps';
import { EditorView, PluginKey } from '../../prosemirror';
import { HyperlinkState } from '../../plugins/hyperlink';
import ToolbarButton from '../ToolbarButton';
import * as styles from './styles';

export interface Props {
  editorView: EditorView;
  pluginState: HyperlinkState;
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

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { adding, disabled } = this.state;

    return (
      <span className={styles.outerContainer}>
        <ToolbarButton
          disabled={disabled}
          onClick={this.toggleLinkPanel}
          selected={adding}
          title={tooltip(addLink)}
          iconBefore={<LinkIcon label="add link" />}
        />
      </span>
    );
  }

  @analytics('atlassian.editor.format.hyperlink.button')
  private toggleLinkPanel = () => {
    const { pluginState, editorView } = this.props;
    pluginState.showLinkPanel(editorView);
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    this.setState({
      disabled: !pluginState.linkable || pluginState.active
    });
  }
}
