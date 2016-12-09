import React, { PureComponent } from 'react';
import { HyperlinkState } from 'ak-editor-plugin-hyperlink'
import OpenIcon from 'ak-icon/glyph/editor/open';
import UnlinkIcon from 'ak-icon/glyph/editor/unlink';
import IconButton from '../ToolbarIconButton';
import Panel from '../Panel';
import PanelTextInput from '../PanelTextInput';

interface Props {
  pluginState: HyperlinkState;
}

interface State {
  target?: HTMLElement;
  // URL of the hyperlink. The presence of this attribute causes an "open"
  // hyperlink to be rendered in the popup.
  href?: string;
  // Surprisingly not all hyperlinks can be unlinked. For example when the
  // storage format is Markdown, you can't represent some a URL as plain text
  // using standard markdown syntax alone.
  unlinkable?: boolean;
  textInputPlaceholder?: string;
  textInputValue?: string;
}

export default class HyperlinkEdit extends PureComponent<Props, State> {
  state: State = { unlinkable: true };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { href, target, unlinkable } = this.state;

    if (target) {
      const showOpenButton = !!href;
      const showUnlinkButton = unlinkable;
      const showSeparator = showOpenButton || showUnlinkButton;

      return (
        <Panel target={target} align='left' autoPosition>
          {!showOpenButton ? null :
          <IconButton
            href={href}
            target='_blank'
            theme='dark'
            icon={<OpenIcon label='Open' />}
          />
          }
          {!showUnlinkButton ? null :
          <IconButton
            theme='dark'
            onClick={this.handleUnlink}
            icon={<UnlinkIcon label='Unlink' />}
          />
          }
          {!showSeparator ? null :
          <span style={{ background: 'grey', width: 1, height: 20, display: 'inline-block', margin: '0 10px' }} />
          }
          <PanelTextInput
            placeholder='Link address'
            defaultValue={href}
            onSubmit={this.updateHref}
            onChange={this.updateHref}
            ref='textInput'
          />
        </Panel>
      );
    } else {
      return null;
    }
  }

  private handleUnlink = () => {
    this.props.pluginState.removeLink();
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    this.setState({
      target: pluginState.element,
      href: pluginState.href,
      textInputValue: pluginState.text,
    });
  }

  private updateHref = (href: string) => {
    this.props.pluginState.updateLink({ href });
  }
};
