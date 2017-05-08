import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EditorView } from '../../prosemirror';
import { MentionsState } from '../../plugins/mentions';
import ToolbarButton from '../ToolbarButton';
import * as styles from './styles';

export interface Props {
  editorView: EditorView;
  pluginState: MentionsState;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMention extends PureComponent<Props, State> {
  state: State = { disabled: false };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { disabled } = this.state;

    return (
      <ToolbarButton
        wrapperClassName={styles.button}
        onClick={this.handleInsertMention}
        disabled={disabled}
        title="mention a person (@)"
        iconBefore={<MentionIcon label="Mention" />}
      />
    );
  }

  private handlePluginStateChange = (pluginState: MentionsState) => {
    this.setState({
      disabled: pluginState.mentionDisabled()
    });
  }

  @analytics('atlassian.editor.mention.button')
  private handleInsertMention = () => {
    this.props.pluginState.isnertMentionQuery();
  }
}
