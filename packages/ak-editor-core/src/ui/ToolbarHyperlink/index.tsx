import LinkIcon from 'ak-icon/glyph/editor/link';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { HyperlinkState } from '../../plugins/hyperlink';
import Panel from '../Panel';
import TextInput from '../PanelTextInput';
import ToolbarButton from '../ToolbarButton';
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
      <span className={styles.outerContainer}>
        <ToolbarButton
          disabled={disabled || active}
          onClick={this.openLinkPanel}
          selected={adding}
          iconBefore={<LinkIcon label="Link" />}
        />
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
