import * as React from 'react';
import { PureComponent } from 'react';
import LinkIcon from 'ak-icon/glyph/editor/link';
import { HyperlinkState } from '../../../src/plugins/hyperlink';
import Panel from '../Panel';
import TextInput from '../PanelTextInput';
import ToolbarButton from '../ToolbarButton';
import { analyticsDecorator as analytics } from '../../analytics';
import * as styles from './styles';

export interface Props {
  pluginState: HyperlinkState;
}

export interface State {
  active?: boolean;
  adding?: boolean;
  disabled?: boolean;
}

export default class ToolbarHyperlink extends PureComponent<Props, State> {
  state: State = {};

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { active, adding, disabled } = this.state;

    return (
      <span style={{ position: 'relative' }}>
        <ToolbarButton
          disabled={disabled || active}
          onClick={this.openLinkPanel}
          selected={adding}
        >
          <LinkIcon label="Link" />
        </ToolbarButton>
        {!adding ? null :
        <Panel align="center" onOutsideClick={this.closeLinkPanel}>
          <div className={styles.textInputContainer}>
            <TextInput
              autoFocus
              placeholder="Paste link"
              onSubmit={this.handleSubmit}
              onCancel={this.closeLinkPanel}
            />
          </div>
        </Panel>
        }
      </span>
    );
  }

  private openLinkPanel = () => {
    this.setState({ adding: true });
  }

  private closeLinkPanel = () => {
    this.setState({ adding: false });
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    this.setState({
      active: pluginState.active,
      disabled: !pluginState.canAddLink
    });
  }

  @analytics('atlassian.editor.format.hyperlink.button')
  private handleSubmit = (value: string) => {
    this.props.pluginState.addLink({ href: value });
    this.closeLinkPanel();
  }
}
