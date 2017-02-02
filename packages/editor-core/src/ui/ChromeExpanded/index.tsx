import AkButton from 'ak-button';
import AkButtonGroup from 'ak-button-group';
import ImageIcon from 'ak-icon/glyph/editor/image';
import MentionIcon from 'ak-icon/glyph/editor/mention';
import { PureComponent } from 'react';
import * as React from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { BlockTypeState } from '../../plugins/block-type';
import { CodeBlockState } from '../../plugins/code-block';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ImageUploadState } from '../../plugins/image-upload';
import { ListsState } from '../../plugins/lists/index-future';
import { MentionsPluginState } from '../../plugins/mentions';
import { TextFormattingState } from '../../plugins/text-formatting';
import HyperlinkEdit from '../HyperlinkEdit';
import LanguagePicker from '../LanguagePicker';
import MentionPicker from '../MentionPicker';
import ToolbarBlockType from '../ToolbarBlockType';
import ToolbarButton from '../ToolbarButton';
import ToolbarFeedback from '../ToolbarFeedback';
import ToolbarHyperlink from '../ToolbarHyperlink';
import ToolbarLists from '../ToolbarLists';
import ToolbarTextFormatting from '../ToolbarTextFormatting';
import * as styles from './styles';

export interface Props {
  editorView?: any;
  feedbackFormUrl?: string;
  onCancel?: () => void;
  onInsertMention?: () => void;
  onInsertImage?: () => void;
  onSave?: () => void;
  pluginStateBlockType?: BlockTypeState;
  pluginStateCodeBlock?: CodeBlockState;
  pluginStateHyperlink?: HyperlinkState;
  pluginStateLists?: ListsState;
  pluginStateTextFormatting?: TextFormattingState;
  pluginStateImageUpload?: ImageUploadState;
  pluginStateMentions?: MentionsPluginState;
  mentionsResourceProvider?: any; // AbstractMentionResource
}

export default class ChromeExpanded extends PureComponent<Props, {}> {
  render() {
    const { props } = this;

    return (
      <div className={styles.container} data-editor-chrome>
        <div className={styles.toolbar}>
          {props.pluginStateBlockType ? <ToolbarBlockType pluginState={props.pluginStateBlockType} /> : null}
          {props.pluginStateTextFormatting ? <ToolbarTextFormatting pluginState={props.pluginStateTextFormatting} /> : null}
          {props.pluginStateLists ? <ToolbarLists pluginState={props.pluginStateLists} editorView={props.editorView} /> : null}
          {props.pluginStateHyperlink ? <ToolbarHyperlink pluginState={props.pluginStateHyperlink} /> : null}
          <span style={{ flexGrow: 1 }} />
          {props.feedbackFormUrl ? <ToolbarFeedback feedbackFormUrl={props.feedbackFormUrl} /> : null}
        </div>
        <div className={styles.content}>
          {props.children}
          {props.pluginStateHyperlink ? <HyperlinkEdit pluginState={props.pluginStateHyperlink} /> : null}
          {props.pluginStateCodeBlock ? <LanguagePicker pluginState={props.pluginStateCodeBlock} /> : null}
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
            <ToolbarButton onClick={this.handleInsertMention}>
              <MentionIcon label="Mention" />
            </ToolbarButton>
            }
            {!props.pluginStateImageUpload ? null :
            <ToolbarButton onClick={this.handleInsertImage}>
              <ImageIcon label="Image" />
            </ToolbarButton>
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
