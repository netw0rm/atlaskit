import OpenIcon from 'ak-icon/glyph/editor/open';
import UnlinkIcon from 'ak-icon/glyph/editor/unlink';
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
              defaultValue={href}
              onSubmit={this.updateHref}
              onChange={this.updateHref}
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
    this.props.pluginState.removeLink(this.props.editorView);
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    this.setState({
      target: pluginState.element,
      href: pluginState.href,
      textInputValue: pluginState.text,
    });
  }

  private updateHref = (href: string) => {
    this.props.pluginState.updateLink({ href }, this.props.editorView);
  }
};
