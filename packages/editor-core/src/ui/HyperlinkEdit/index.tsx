import OpenIcon from '@atlaskit/icon/glyph/editor/open';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import * as React from 'react';
import { PureComponent } from 'react';
import { HyperlinkState } from '../../plugins/hyperlink';
import FloatingToolbar from '../FloatingToolbar';
import PanelTextInput from '../PanelTextInput';
import ToolbarButton from '../ToolbarButton';
import * as styles from './styles';

export interface Props {
  pluginState: HyperlinkState;
}

export interface State {
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
  editorFocused?: boolean;
  inputActive?: boolean;
  autoFocusInput?: boolean;
  active?: boolean;
}

export default class HyperlinkEdit extends PureComponent<Props, State> {

  state: State = {
    unlinkable: true,
    editorFocused: false,
    inputActive: false,
    autoFocusInput: false,
    active: false,
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  setInputActive = () => {
    this.setState({
      inputActive: true,
    });
  }

  resetInputActive = () => {
    this.setState({
      inputActive: false,
    });
  }

  render() {
    const { href, target, unlinkable, active, editorFocused, inputActive, autoFocusInput } = this.state;

    if (active && (editorFocused || inputActive)) {
      const showOpenButton = !!href;
      const showUnlinkButton = unlinkable;
      const showSeparator = showOpenButton || showUnlinkButton;

      return (
        <FloatingToolbar target={target} align="left" autoPosition>
          <div className={styles.container}>
            {!showOpenButton ? null :
            <ToolbarButton
              href={href}
              target="_blank"
              theme="dark"
              title="Open link in new tab"
            >
              <OpenIcon label="Open" />
            </ToolbarButton>
            }
            {!showUnlinkButton ? null :
            <ToolbarButton
              theme="dark"
              title="Unlink"
              onClick={this.handleUnlink}
            >
              <UnlinkIcon label="Unlink" />
            </ToolbarButton>
            }
            {!showSeparator ? null :
            <span className={styles.seperator} />
            }
            <PanelTextInput
              placeholder="Link address"
              autoFocus={autoFocusInput}
              defaultValue={href}
              onSubmit={this.updateHref}
              onChange={this.updateHref}
              onMouseDown={this.setInputActive}
              onBlur={this.resetInputActive}
              ref="textInput"
            />
          </div>
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  private handleUnlink = () => {
    this.props.pluginState.removeLink();
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    const { inputActive } = this.state;
    const hrefNotPreset = pluginState.active && (!pluginState.href || pluginState.href.length === 0);

    this.setState({
      active: pluginState.active,
      target: pluginState.element,
      href: pluginState.href,
      textInputValue: pluginState.text,
      editorFocused: pluginState.editorFocused,
      inputActive: hrefNotPreset || inputActive,
      autoFocusInput: hrefNotPreset,
    });
  }

  private updateHref = (href: string) => {
    this.props.pluginState.updateLink({ href });
  }
};
