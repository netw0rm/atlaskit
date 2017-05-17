import OpenIcon from '@atlaskit/icon/glyph/editor/open';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import * as React from 'react';
import { PureComponent } from 'react';
import { HyperlinkState } from '../../plugins/hyperlink';
import FloatingToolbar from '../FloatingToolbar';
import PanelTextInput from '../PanelTextInput';
import ToolbarButton from '../ToolbarButton';
import * as styles from './styles';
import { EditorView } from '../../prosemirror';

export interface Props {
  pluginState: HyperlinkState;
  editorView: EditorView;
}

export interface State {
  target?: HTMLElement;
  // URL of the hyperlink. The presence of this attribute causes an "open"
  // hyperlink to be rendered in the popup.
  href?: string;
  // Href before editing
  oldHref?: string;
  // Surprisingly not all hyperlinks can be unlinked. For example when the
  // storage format is Markdown, you can't represent some a URL as plain text
  // using standard markdown syntax alone.
  unlinkable?: boolean;
  textInputPlaceholder?: string;
  textInputValue?: string;
  editorFocused?: boolean;
  inputActive?: boolean;
  active?: boolean;
  showToolbarPanel?: boolean;
}

export default class HyperlinkEdit extends PureComponent<Props, State> {

  state: State = {
    unlinkable: true,
    editorFocused: false,
    inputActive: false,
    active: false,
    showToolbarPanel: false,
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

  updatePosition = () => {
    const { pluginState } = this.props;
    if (!pluginState.active) {
      return pluginState.getCoordniates(this.props.editorView);
    }
  }

  render() {
    const {
      href, target, unlinkable, active,
      editorFocused, inputActive, showToolbarPanel
    } = this.state;

    if ((active || showToolbarPanel) && (editorFocused || inputActive)) {
      const showOpenButton = !!href;
      const showUnlinkButton = unlinkable && active && href;
      const showSeparator = showOpenButton || showUnlinkButton;

      return (
        <FloatingToolbar
          target={target}
          align="left"
          onExtractStyle={this.updatePosition}
          autoPosition={true}
        >
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
              autoFocus={!href || href.length === 0}
              defaultValue={href}
              onSubmit={this.handleSubmit}
              onChange={this.updateHref}
              onMouseDown={this.setInputActive}
              onBlur={this.handleOnBlur}
            />
          </div>
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  // ED-1323 `onBlur` covers all the use cases (click outside, tab, etc) for this issue
  private handleOnBlur = () => {
    const { editorView, pluginState } = this.props;
    const { href = '' } = this.state;
    if (editorView.state.selection.empty && !pluginState.active) {
      pluginState.hideLinkPanel();
    } else if (!href || href.length === 0) {
      pluginState.removeLink(editorView);
    } else {
      pluginState.updateLink({ href }, editorView);
    }
    this.resetInputActive();
  }

  private handleUnlink = () => {
    this.props.pluginState.removeLink(this.props.editorView);
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    const { inputActive } = this.state;
    const hrefNotPreset = pluginState.active && (!pluginState.href || pluginState.href.length === 0);

    this.setState({
      active: pluginState.active,
      target: pluginState.element,
      href: pluginState.href,
      oldHref: pluginState.href,
      textInputValue: pluginState.text,
      editorFocused: pluginState.editorFocused,
      inputActive: hrefNotPreset || inputActive,
      showToolbarPanel: pluginState.showToolbarPanel,
    });
  }

  private updateHref = (href: string) => {
    this.setState({ href });
  }

  private handleSubmit = (href: string) => {
    const { editorView, pluginState } = this.props;
    if (this.state.oldHref) {
      pluginState.updateLink({ href }, editorView);
    } else {
      pluginState.addLink({ href }, editorView);
    }
    editorView.focus();
  }
}
