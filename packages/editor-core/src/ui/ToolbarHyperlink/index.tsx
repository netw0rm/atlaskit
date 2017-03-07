import LinkIcon from 'ak-icon/glyph/editor/link';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EditorView } from '../../prosemirror';
import { HyperlinkState } from '../../plugins/hyperlink';
import FloatingToolbar from '../FloatingToolbar';
import TextInput from '../PanelTextInput';
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
          onClick={this.openLinkPanel}
          selected={adding}
          iconBefore={<LinkIcon label="Link" />}
        />
        {!adding ? null :
          <FloatingToolbar align="center" onOutsideClick={this.closeLinkPanel}>
            <div className={styles.textInputContainer}>
              <TextInput
                autoFocus
                placeholder="Paste link"
                onSubmit={this.handleSubmit}
                onCancel={this.closeLinkPanel}
              />
            </div>
          </FloatingToolbar>
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
      disabled: !pluginState.linkable || pluginState.active
    });
  }

  @analytics('atlassian.editor.format.hyperlink.button')
  private handleSubmit = (value: string) => {
    this.props.pluginState.addLink({ href: value }, this.props.editorView);
    this.closeLinkPanel();
  }
}
