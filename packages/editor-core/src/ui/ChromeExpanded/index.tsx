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
import { TextColorState } from '../../plugins/text-color';
import { TableState } from '../../plugins/table';
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
import ToolbarTextColor from '../ToolbarTextColor';
import TableHeader from '../TableHeader';
import ToolbarTable from '../ToolbarTable';
import {
  Container,
  Content,
  Footer,
  FooterActions,
  Toolbar,
  SecondaryToolbar
} from './styles';
import { EditorView } from '../../prosemirror';

export interface Props {
  editorView: EditorView;
  disabled?: boolean;
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
  pluginStateTextColor?: TextColorState;
  pluginStateTable?: TableState;
  presenceResourceProvider?: any; // AbstractPresenceResource
  saveDisabled?: boolean;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  mediaProvider?: Promise<MediaProvider>;
  pluginStatePanel?: PanelState;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
}

export default class ChromeExpanded extends PureComponent<Props, {}> {
  private editorContainer: HTMLElement;

  static defaultProps = {
    saveDisabled: false,
  };

  private handleSpinnerComplete() {}

  render() {
    const {
      disabled,
      editorView,
      emojiProvider,
      feedbackFormUrl,
      mentionProvider,
      onCancel,
      onSave,
      packageName,
      packageVersion,
      pluginStateBlockType,
      pluginStateClearFormatting,
      pluginStateCodeBlock,
      pluginStateEmojis,
      pluginStateHyperlink,
      pluginStateImageUpload,
      pluginStateLists,
      pluginStateMedia,
      pluginStateMentions,
      pluginStatePanel,
      pluginStateTextColor,
      pluginStateTextFormatting,
      pluginStateTable,
      saveDisabled,
      popupsMountPoint,
      popupsBoundariesElement
    } = this.props;
    const iconAfter = saveDisabled
      ? <Spinner isCompleting={false} onComplete={this.handleSpinnerComplete} />
      : undefined;

    const saveButtonAppearance = saveDisabled || disabled
      ? 'default'
      : 'primary';

    return (
      <Container data-editor-chrome={true} tabIndex={-1} innerRef={this.handleEditorContainerRef}>
        <Toolbar>
          {pluginStateBlockType ?
            <ToolbarBlockType
              isDisabled={disabled}
              pluginState={pluginStateBlockType}
              editorView={editorView}
              softBlurEditor={this.softBlurEditor}
              focusEditor={this.focusEditor}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null
          }
          {pluginStateTextFormatting ?
            <ToolbarTextFormatting
              disabled={disabled}
              pluginState={pluginStateTextFormatting}
              editorView={editorView}
            /> : null
          }
          {pluginStateTextColor ?
            <ToolbarTextColor
              disabled={disabled}
              pluginState={pluginStateTextColor}
              editorView={editorView}
              softBlurEditor={this.softBlurEditor}
              focusEditor={this.focusEditor}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null
          }
          {pluginStateTextFormatting || pluginStateClearFormatting ?
            <ToolbarAdvancedTextFormatting
              isDisabled={disabled}
              pluginStateTextFormatting={pluginStateTextFormatting}
              pluginStateClearFormatting={pluginStateClearFormatting}
              editorView={editorView}
              softBlurEditor={this.softBlurEditor}
              focusEditor={this.focusEditor}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null
          }
          {pluginStateLists ?
            <ToolbarLists
              disabled={disabled}
              pluginState={pluginStateLists}
              editorView={editorView}
            /> : null
          }
          {pluginStateHyperlink ?
            <ToolbarHyperlink
              disabled={disabled}
              pluginState={pluginStateHyperlink}
              editorView={editorView}
            /> : null
          }
          {pluginStateTable ?
            <ToolbarTable
              disabled={disabled}
              pluginState={pluginStateTable}
              editorView={editorView}
            /> : null
          }
          <span style={{ flexGrow: 1 }} />
          {feedbackFormUrl ? <ToolbarFeedback packageVersion={packageVersion} packageName={packageName} /> : null}
        </Toolbar>
        <Content>
          {this.props.children}

          {pluginStateHyperlink && !disabled ?
            <HyperlinkEdit
              pluginState={pluginStateHyperlink}
              editorView={editorView}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null}

          {pluginStateCodeBlock && !disabled ?
            <LanguagePicker
              pluginState={pluginStateCodeBlock}
              editorView={editorView}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
            /> : null}

          {pluginStateTable && !disabled &&
            <TableHeader
              pluginState={pluginStateTable}
              editorView={editorView}
            /> }

          {pluginStateMentions && mentionProvider && !disabled ?
            <MentionPicker
              pluginState={pluginStateMentions}
              resourceProvider={mentionProvider}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsMountPoint={popupsMountPoint}
            /> : null}

          {pluginStateEmojis && emojiProvider && !disabled ?
            <EmojiTypeAhead
              pluginState={pluginStateEmojis}
              emojiProvider={emojiProvider}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsMountPoint={popupsMountPoint}
            /> : null}

          {pluginStatePanel ? <PanelEdit pluginState={pluginStatePanel} editorView={editorView} /> : null}
        </Content>
        <Footer>
          <FooterActions>
            <AkButtonGroup>
              {!onSave ? null :
                <span onClick={this.handleSave}>
                  <AkButton
                    iconAfter={iconAfter}
                    isDisabled={saveDisabled}
                    appearance={saveButtonAppearance}
                  >
                    Save
                  </AkButton>
                </span>
              }
              {!onCancel ? null :
                <span onClick={this.handleCancel}>
                  <AkButton appearance="subtle">Cancel</AkButton>
                </span>
              }
            </AkButtonGroup>
          </FooterActions>
          <SecondaryToolbar>
            {pluginStateMentions && !disabled ? <ToolbarMention pluginState={pluginStateMentions} editorView={editorView} /> : null}
            {pluginStateImageUpload && !disabled ? <ToolbarImage pluginState={pluginStateImageUpload} editorView={editorView} /> : null}
            {pluginStateMedia && !disabled ? <ToolbarMedia pluginState={pluginStateMedia} /> : null}
          </SecondaryToolbar>
        </Footer>
      </Container>
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
