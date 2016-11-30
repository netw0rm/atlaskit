import React, { PureComponent } from 'react';
import LinkIcon from 'ak-icon/glyph/editor/link';
import { HyperlinkState } from 'ak-editor-plugin-hyperlink';
import Panel from '../Panel';
import DismissBlanket from '../DismissBlanket';
import TextInput from '../PanelTextInput';
import IconButton from '../ToolbarIconButton';

interface Props {
  pluginState: HyperlinkState;
}

interface State {
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
        <IconButton
          disabled={disabled || active}
          onClick={this.openLinkPanel}
          selected={adding}
          icon={<LinkIcon label='Link' />}
        />
        {!adding ? null :
        <DismissBlanket onDismiss={this.closeLinkPanel}>
          <Panel align='center'>
            <TextInput
              autoFocus
              placeholder="Paste link"
              onSubmit={this.handleSubmit}
              onCancel={this.closeLinkPanel}
            />
          </Panel>
        </DismissBlanket>
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

  private handleSubmit = (value: string) => {
    this.props.pluginState.addLink({ href: value });
    this.closeLinkPanel();
  }
}
