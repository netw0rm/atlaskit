import AkButton from '@atlaskit/button';
import AkButtonGroup from '@atlaskit/button-group';
import { PureComponent } from 'react';
import * as React from 'react';
import { EmojiProvider } from '@atlaskit/emoji';
import { MentionProvider } from '@atlaskit/mention';
import { MediaProvider } from '@atlaskit/media-core';
import Spinner from '@atlaskit/spinner';
import { analyticsDecorator as analytics } from '../../analytics';
import { BlockTypeState } from '../../plugins/block-type';
import { CodeBlockState } from '../../plugins/code-block';
import { EmojiState } from '../../plugins/emojis';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ImageUploadState } from '../../plugins/image-upload';
import { ListsState } from '../../plugins/lists';
import { MentionsState } from '../../plugins/mentions';
import { TextFormattingState } from '../../plugins/text-formatting';
import { ClearFormattingState } from '../../plugins/clear-formatting';
import { PanelState } from '../../plugins/panel';
import { MediaPluginState } from '../../plugins/media';
import EmojiTypeAhead from '../EmojiTypeAhead';
import HyperlinkEdit from '../HyperlinkEdit';
import LanguagePicker from '../LanguagePicker';
import MentionPicker from '../MentionPicker';
import PanelEdit from '../PanelEdit';
import ToolbarBlockType from '../ToolbarBlockType';
import ToolbarMention from '../ToolbarMention';
import ToolbarFeedback from '../ToolbarFeedback';
import ToolbarHyperlink from '../ToolbarHyperlink';
import ToolbarLists from '../ToolbarLists';
import ToolbarTextFormatting from '../ToolbarTextFormatting';
import ToolbarAdvancedTextFormatting from '../ToolbarAdvancedTextFormatting';
import ToolbarImage from '../ToolbarImage';
import ToolbarMedia from '../ToolbarMedia';
import * as styles from './styles';
import { EditorView } from '../../prosemirror';

export interface Props {
  editorView: EditorView;
  feedbackFormUrl?: string;
  onCancel?: () => void;
  onInsertImage?: () => void;
  onSave?: () => void;
  packageVersion?: string;
  packageName?: string;
  pluginStateBlockType?: BlockTypeState;
  pluginStateCodeBlock?: CodeBlockState;
  pluginStateHyperlink?: HyperlinkState;
  pluginStateLists?: ListsState;
  pluginStateTextFormatting?: TextFormattingState;
  pluginStateClearFormatting?: ClearFormattingState;
  pluginStateImageUpload?: ImageUploadState;
  pluginStateMentions?: MentionsState;
  pluginStateMedia?: MediaPluginState;
  pluginStateEmojis?: EmojiState;
  presenceResourceProvider?: any; // AbstractPresenceResource
  saveDisabled?: boolean;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  mediaProvider?: Promise<MediaProvider>;
  pluginStatePanel?: PanelState;
}

export default class ChromeExpanded extends PureComponent<Props, {}> {
  private editorContainer: HTMLElement;

  static defaultProps = {
    saveDisabled: false,
  };

  private handleSpinnerComplete() {}

  render() {
    const { props } = this;
    const iconAfter = props.saveDisabled
      ? <Spinner isCompleting={false} onComplete={this.handleSpinnerComplete} />
      : undefined;

    const saveButtonAppearance = props.saveDisabled
      ? 'default'
      : 'primary';

    return (
      <div className={styles.container} data-editor-chrome={true} tabIndex={-1} ref={this.handleEditorContainerRef}>
        <div className={styles.toolbar}>
          {props.pluginStateBlockType ? <ToolbarBlockType pluginState={props.pluginStateBlockType} editorView={props.editorView} softBlurEditor={this.softBlurEditor} focusEditor={this.focusEditor} /> : null}
          {props.pluginStateTextFormatting ? <ToolbarTextFormatting pluginState={props.pluginStateTextFormatting} editorView={props.editorView} /> : null}
          {props.pluginStateTextFormatting || props.pluginStateClearFormatting ?
            <ToolbarAdvancedTextFormatting
              pluginStateTextFormatting={props.pluginStateTextFormatting}
              pluginStateClearFormatting={props.pluginStateClearFormatting}
              editorView={props.editorView}
              softBlurEditor={this.softBlurEditor}
              focusEditor={this.focusEditor}
            /> : null}
          {props.pluginStateLists ? <ToolbarLists pluginState={props.pluginStateLists} editorView={props.editorView} /> : null}
          {props.pluginStateHyperlink ? <ToolbarHyperlink pluginState={props.pluginStateHyperlink} editorView={props.editorView} /> : null}
          <span style={{ flexGrow: 1 }} />
          {props.feedbackFormUrl ? <ToolbarFeedback packageVersion={props.packageVersion} packageName={props.packageName} /> : null}
        </div>
        <div className={styles.content}>
          {props.children}
          {props.pluginStateHyperlink ? <HyperlinkEdit pluginState={props.pluginStateHyperlink} editorView={props.editorView} /> : null}
          {props.pluginStateCodeBlock ? <LanguagePicker pluginState={props.pluginStateCodeBlock} editorView={props.editorView} /> : null}
          {props.pluginStateMentions && props.mentionProvider ? <MentionPicker pluginState={props.pluginStateMentions} resourceProvider={props.mentionProvider} /> : null}
          {props.pluginStateEmojis && props.emojiProvider ? <EmojiTypeAhead pluginState={props.pluginStateEmojis} emojiProvider={props.emojiProvider} /> : null}
          {props.pluginStatePanel ? <PanelEdit pluginState={props.pluginStatePanel} editorView={props.editorView} /> : null}
        </div>
        <div className={styles.footer}>
          <div className={styles.footerActions}>
            <AkButtonGroup>
              {!this.props.onSave ? null :
                <span onClick={this.handleSave}>
                  <AkButton
                    iconAfter={iconAfter}
                    isDisabled={this.props.saveDisabled}
                    appearance={saveButtonAppearance}
                  >
                    Save
                  </AkButton>
                </span>
              }
              {!this.props.onCancel ? null :
                <span onClick={this.handleCancel}>
                  <AkButton appearance="subtle">Cancel</AkButton>
                </span>
              }
            </AkButtonGroup>
          </div>
          <div className={styles.secondaryToolbar}>
            {props.pluginStateMentions ? <ToolbarMention pluginState={props.pluginStateMentions} editorView={props.editorView} /> : null}
            {props.pluginStateImageUpload ? <ToolbarImage pluginState={props.pluginStateImageUpload} editorView={props.editorView} /> : null}
            {props.pluginStateMedia ? <ToolbarMedia pluginState={props.pluginStateMedia} /> : null}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Blurs editor but keeps focus on editor container,
   * so components like inline-edit can check if focus is still inside them
   */
  softBlurEditor = () => {
    if (this.editorContainer) {
      this.editorContainer.focus();
    }
  }

  focusEditor = () => {
    this.props.editorView.focus();
  }

  private handleEditorContainerRef = ref => {
    this.editorContainer = ref;
  }

  @analytics('atlassian.editor.stop.cancel')
  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  @analytics('atlassian.editor.stop.save')
  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave();
    }
  }
}
