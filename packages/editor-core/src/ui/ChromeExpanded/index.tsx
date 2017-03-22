import AkButton from 'ak-button';
import AkButtonGroup from 'ak-button-group';
import MentionIcon from 'ak-icon/glyph/editor/mention';
import { PureComponent } from 'react';
import * as React from 'react';
import { EmojiProvider } from '@atlaskit/emoji';
import { analyticsDecorator as analytics } from '../../analytics';
import { BlockTypeState } from '../../plugins/block-type';
import { CodeBlockState } from '../../plugins/code-block';
import { EmojisPluginState } from '../../plugins/emojis';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ImageUploadState } from '../../plugins/image-upload';
import { ListsState } from '../../plugins/lists';
import { MentionsPluginState } from '../../plugins/mentions';
import { TextFormattingState } from '../../plugins/text-formatting';
import { ClearFormattingState } from '../../plugins/clear-formatting';
import { PanelState } from '../../plugins/panel';
import HyperlinkEdit from '../HyperlinkEdit';
import LanguagePicker from '../LanguagePicker';
import MentionPicker from '../MentionPicker';
import PanelEdit from '../PanelEdit';
import ToolbarBlockType from '../ToolbarBlockType';
import ToolbarButton from '../ToolbarButton';
import ToolbarFeedback from '../ToolbarFeedback';
import ToolbarHyperlink from '../ToolbarHyperlink';
import ToolbarLists from '../ToolbarLists';
import ToolbarTextFormatting from '../ToolbarTextFormatting';
import ToolbarAdvancedTextFormatting from '../ToolbarAdvancedTextFormatting';
import ToolbarImage from '../ToolbarImage';
import * as styles from './styles';
import { EditorView } from '../../prosemirror';
import 'css-loader!prosemirror-view/style/prosemirror.css';

export interface Props {
    editorView: EditorView;
    feedbackFormUrl?: string;
    onCancel?: () => void;
    onInsertMention?: () => void;
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
    pluginStateMentions?: MentionsPluginState;
    pluginStateEmojis?: EmojisPluginState;
    mentionsResourceProvider?: any; // AbstractMentionResource
    presenceResourceProvider?: any; // AbstractPresenceResource
    emojiProvider?: Promise<EmojiProvider>;
    pluginStatePanel?: PanelState;
}

export default class ChromeExpanded extends PureComponent<Props, {}> {
    render() {
        const { props } = this;

        return (
            <div className={styles.container} data-editor-chrome>
                <div className={styles.toolbar}>
                    {props.pluginStateBlockType ? <ToolbarBlockType pluginState={props.pluginStateBlockType} /> : null}
                    {props.pluginStateTextFormatting ? <ToolbarTextFormatting pluginState={props.pluginStateTextFormatting} /> : null}
                    {props.pluginStateTextFormatting || props.pluginStateClearFormatting ?
                        <ToolbarAdvancedTextFormatting
                            pluginStateTextFormatting={props.pluginStateTextFormatting}
                            pluginStateClearFormatting={props.pluginStateClearFormatting}
                        /> : null}
                    {props.pluginStateLists ? <ToolbarLists pluginState={props.pluginStateLists} /> : null}
                    {props.pluginStateHyperlink ? <ToolbarHyperlink pluginState={props.pluginStateHyperlink} /> : null}
                    <span style={{ flexGrow: 1 }} />
                    {props.feedbackFormUrl ? <ToolbarFeedback packageVersion={props.packageVersion} packageName={props.packageName} /> : null}
                </div>
                <div className={styles.content}>
                    {props.children}
                    {props.pluginStateHyperlink ? <HyperlinkEdit pluginState={props.pluginStateHyperlink} /> : null}
                    {props.pluginStateCodeBlock ? <LanguagePicker pluginState={props.pluginStateCodeBlock} /> : null}
                    {props.pluginStateMentions ? <MentionPicker pluginState={props.pluginStateMentions} resourceProvider={props.mentionsResourceProvider} presenceProvider={props.presenceResourceProvider} /> : null}
                    {props.pluginStateEmojis && props.emojiProvider ? <EmojiTypeAhead pluginState={props.pluginStateEmojis} emojiProvider={props.emojiProvider} /> : null}
                    {props.pluginStatePanel ? <PanelEdit pluginState={props.pluginStatePanel} /> : null}
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
                        {props.pluginStateImageUpload ? <ToolbarImage pluginState={props.pluginStateImageUpload} editorView={props.editorView} /> : null}
import EmojiTypeAhead from '../EmojiTypeAhead';
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
