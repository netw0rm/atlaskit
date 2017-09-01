import OpenIcon from '@atlaskit/icon/glyph/editor/open';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import { ActivityProvider } from '@atlaskit/activity';
import * as React from 'react';
import { PureComponent } from 'react';
import { HyperlinkState } from '../../../../../editor/plugins/hyperlink/pm-plugins';
import { Separator, Container, FloatingToolbar, ToolbarButton } from './styles';
import { EditorView } from '../../../../../prosemirror';
import { normalizeUrl } from '../../../../../editor/plugins/hyperlink/pm-plugins/utils';
import PanelTextInput from '../../../../../ui/PanelTextInput';
import RecentSearch from '../RecentSearch';
import * as hyperlinkCommands from '../../pm-plugins/commands';

const TEXT_NODE = 3;

export interface Props {
  pluginState: HyperlinkState;
  editorView: EditorView;
  activityProvider?: Promise<ActivityProvider>;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  target?: HTMLElement;
  activeElement?: HTMLElement;
  // URL of the hyperlink. The presence of this attribute causes an "open"
  // hyperlink to be rendered in the popup.
  href?: string;
  text?: string;
  oldText?: string;
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

  private getOffsetParent() {
    const popupTarget = this.getPopupTarget();
    return this.props.popupsMountPoint
      ? this.props.popupsMountPoint.offsetParent
      : popupTarget && popupTarget.offsetParent;
  }

  private getPopupTarget(): HTMLElement | undefined {
    const { target, activeElement } = this.state;
    let popupTarget = target;

    if (!popupTarget && activeElement) {
      popupTarget = activeElement.nodeType === TEXT_NODE
        ? activeElement.parentElement as HTMLElement
        : activeElement;
    }

    return popupTarget;
  }

  /**
   * Dynamic offsets for hyperlink editing popup
   * because we need to show it next to cursor even without clear target for popup.
   */
  private adjustPosition = (position) => {
    const { pluginState } = this.props;
    if (!pluginState.active) {

      const offsetParent = this.getOffsetParent();

      if (!offsetParent) {
        return position;
      }

      const coordinates = pluginState.getCoordinates(this.props.editorView, offsetParent);

      if (position.left) {
        position.left = coordinates.left;
      }

      if (position.top) {
        position.top = coordinates.top;
      }

      if (position.bottom) {
        position.bottom = coordinates.bottom;
      }

      if (position.right) {
        position.right = coordinates.right;
      }
    }
    return position;
  }

  render() {
    const { href, oldHref, unlinkable, active, editorFocused, inputActive, showToolbarPanel } = this.state;
    const popupTarget = this.getPopupTarget();

    if (!popupTarget) {
      return null;
    }

    if ((active || showToolbarPanel) && (editorFocused || inputActive)) {
      const showOpenButton = !!oldHref;
      const showUnlinkButton = unlinkable && active && oldHref;

      return (
        <FloatingToolbar
          target={popupTarget}
          offset={[0, 3]}
          fitWidth={230}
          onPositionCalculated={this.adjustPosition}
          popupsMountPoint={this.props.popupsMountPoint}
          popupsBoundariesElement={this.props.popupsBoundariesElement}
        >
          <Container>
            {!showOpenButton ? null :
              <ToolbarButton
                href={href}
                target="_blank"
                title="Open link in new tab"
                iconBefore={<OpenIcon label="Open link" />}
              />
            }
            {!showUnlinkButton ? null :
              <ToolbarButton
                title="Unlink"
                onClick={this.handleUnlink}
                iconBefore={<UnlinkIcon label="Unlink" />}
              />
            }
            {!showUnlinkButton ? null :
              <Separator />
            }
            {this.renderInput()}
          </Container>
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  private renderInput() {
    const { href, oldHref, text, oldText } = this.state;
    const { editorView, pluginState, activityProvider } = this.props;
    const normalizedOldText = oldText && normalizeUrl(oldText);

    // insert new link with recently viewed dropdown
    if (activityProvider && !oldHref) {
      return (
        <RecentSearch
          editorView={editorView}
          pluginState={pluginState}
          activityProvider={activityProvider}
        />
      );
    }

    // edit link text
    if (normalizedOldText && href === normalizedOldText) {
      return (
        <PanelTextInput
          placeholder="Text to display"
          defaultValue={!text && href === normalizedOldText ? '' : text}
          onSubmit={this.updateLinkText}
          onChange={this.updateText}
          onMouseDown={this.setInputActive}
          onBlur={this.handleOnBlur}
        />
      );
    }

    // edit link href when text has not been set
    return (
      <PanelTextInput
        placeholder="Paste link"
        autoFocus={!href || href.length === 0}
        defaultValue={href}
        onSubmit={this.updateLinkHref}
        onChange={this.updateHref}
        onMouseDown={this.setInputActive}
        onBlur={this.handleOnBlur}
      />
    );
  }

  // ED-1323 `onBlur` covers all the use cases (click outside, tab, etc) for this issue
  private handleOnBlur = () => {
    const { editorView, pluginState } = this.props;
    const { state, dispatch } = editorView;
    const { href, text } = this.state;
    if (editorView.state.selection.empty && !pluginState.active) {
      pluginState.hideLinkPanel();
    } else if (!href || href.length === 0) {
      this.handleUnlink();
    } else {
      if (text && pluginState.text !== text) {
        hyperlinkCommands.updateLinkText(
          text,
          editorView,
          pluginState.activeLinkStartPos,
          pluginState.text,
          pluginState.activeLinkMark)(state, dispatch);
        this.setState({ text: '' });
      }
      if (href && pluginState.href !== href) {
        hyperlinkCommands.updateLink(
          { href },
          pluginState.activeLinkStartPos,
          pluginState.text,
          pluginState.activeLinkMark)(state, dispatch);
      }
    }
    this.resetInputActive();
  }

  private handleUnlink = () => {
    const { editorView, pluginState } = this.props;
    const { state, dispatch } = editorView;

    hyperlinkCommands.removeLink(
      editorView,
      pluginState.activeLinkStartPos,
      pluginState.text,
      pluginState.activeLinkMark)(state, dispatch);
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    const { inputActive } = this.state;
    const hrefNotPreset = pluginState.active && (!pluginState.href || pluginState.href.length === 0);

    this.setState({
      active: pluginState.active,
      target: pluginState.element,
      activeElement: pluginState.activeElement,
      href: pluginState.href,
      oldText: pluginState.text,
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

  private updateText = (text: string) => {
    this.setState({ text });
  }

  private updateLinkText = (text: string) => {
    if (text && text.length > 0 && text !== this.state.oldText) {
      const { editorView, pluginState } = this.props;
      const { state, dispatch } = editorView;
      hyperlinkCommands.updateLinkText(
        text,
        editorView,
        pluginState.activeLinkStartPos,
        pluginState.text,
        pluginState.activeLinkMark)(state, dispatch);
      this.setState({ text: '' });
    }
  }

  private updateLinkHref = (href: string) => {
    const { editorView, pluginState } = this.props;
    const { state, dispatch } = editorView;
    if (this.state.oldHref) {
      hyperlinkCommands.updateLink(
        { href },
        pluginState.activeLinkStartPos,
        pluginState.text,
        pluginState.activeLinkMark)(state, dispatch);
    } else {
      hyperlinkCommands.addLink({ href }, pluginState.linkable, pluginState.active)(state, dispatch);
    }
    editorView.focus();
  }
}
