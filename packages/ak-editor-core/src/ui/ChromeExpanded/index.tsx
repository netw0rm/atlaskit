import * as React from 'react';
import { PureComponent } from 'react';
import AkButton from 'ak-button';
import AkButtonGroup from 'ak-button-group';
import { ProseMirror } from '../../prosemirror';
import { BlockTypeState } from '../../plugins/block-type';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ListsState } from '../../plugins/lists';
import { TextFormattingState } from '../../plugins/text-formatting';
import { ImageUploadState } from '../../plugins/image-upload'
import { MentionsPluginState } from '../../plugins/mentions';
import MentionIcon from 'ak-icon/glyph/editor/mention';
import ImageIcon from 'ak-icon/glyph/editor/image';
import * as styles from './styles';
import HyperlinkEdit from '../HyperlinkEdit';
import ToolbarIconButton from '../ToolbarIconButton';
import ToolbarBlockType from '../ToolbarBlockType';
import ToolbarLists from '../ToolbarLists';
import ToolbarHyperlink from '../ToolbarHyperlink';
import ToolbarTextFormatting from '../ToolbarTextFormatting';
import ToolbarFeedback from '../ToolbarFeedback';
import MentionPicker from '../MentionPicker';
import { decorator as analytics } from '../../analytics';

export interface Props {
  feedbackFormUrl?: string;
  onCancel?: () => void;
  onInsertMention?: () => void;
  onInsertImage?: () => void;
  onSave?: () => void;
  pluginStateBlockType?: BlockTypeState;
  pluginStateHyperlink?: HyperlinkState;
  pluginStateLists?: ListsState;
  pluginStateTextFormatting?: TextFormattingState;
  pluginStateImageUpload?: ImageUploadState;
  pluginStateMentions?: MentionsPluginState;
  mentionsResourceProvider?: any; // AbstractMentionResource
}

export interface State {}

export default class ChromeExpanded extends PureComponent<Props, State> {
  render() {
    const { props } = this;

    return (
      <div className={styles.container} data-editor-chrome>
        <div className={styles.toolbar}>
          {props.pluginStateBlockType ? <ToolbarBlockType pluginState={props.pluginStateBlockType} /> : null}
          {props.pluginStateTextFormatting ? <ToolbarTextFormatting pluginState={props.pluginStateTextFormatting} /> : null}
          {props.pluginStateLists ? <ToolbarLists pluginState={props.pluginStateLists} /> : null}
          {props.pluginStateHyperlink ? <ToolbarHyperlink pluginState={props.pluginStateHyperlink} /> : null}
          <span style={{ flexGrow: 1 }} />
          {props.feedbackFormUrl ? <ToolbarFeedback feedbackFormUrl={props.feedbackFormUrl} /> : null}
        </div>
        <div className={styles.content}>
          {props.children}
          {props.pluginStateHyperlink ? <HyperlinkEdit pluginState={props.pluginStateHyperlink} /> : null}
          {props.pluginStateMentions ? <MentionPicker pluginState={props.pluginStateMentions} resourceProvider={props.mentionsResourceProvider} /> : null}
        </div>
        <div className={styles.footer}>
          <div className={styles.footerActions}>
            <AkButtonGroup>
              {!this.props.onSave ? null :
              <span onClick={this.handleSave}>
                <AkButton appearance="primary">Save</AkButton>
              </span>
              }
              {!this.props.onCancel ? null :
              <span onClick={this.handleCancel}>
                <AkButton appearance="subtle">Cancel</AkButton>
              </span>
              }
            </AkButtonGroup>
          </div>
          <div>
            {!props.onInsertMention ? null :
            <ToolbarIconButton
              onClick={this.handleInsertMention}
              icon={<MentionIcon label="Mention" />}
            />
            }
            {!props.pluginStateImageUpload ? null :
            <ToolbarIconButton
              onClick={this.handleInsertImage}
              icon={<ImageIcon label="Image" />}
            />
            }
          </div>
        </div>
      </div>
    );
  }

  @analytics('atlassian.editor.stop.cancel')
  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  @analytics('atlassian.editor.image.button')
  private handleInsertImage = () => {
    const { pluginStateImageUpload } = this.props;

    if (pluginStateImageUpload) {
      pluginStateImageUpload.handleImageUpload();
    }
  }

  @analytics('atlassian.editor.mention.button')
  private handleInsertMention = () => {
    const { onInsertMention } = this.props;
    if (onInsertMention) {
      onInsertMention();
    }
  }

  @analytics('atlassian.editor.stop.save')
  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave();
    }
  }
};
