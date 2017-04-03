import * as React from 'react';
import { PureComponent } from 'react';
// import { EmojiProvider } from '@atlaskit/emoji';
import { MentionProvider } from '@atlaskit/mention';
import { BlockTypeState } from '../../plugins/block-type';
import { CodeBlockState } from '../../plugins/code-block';
// import { EmojisPluginState } from '../../plugins/emojis';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ImageUploadState } from '../../plugins/image-upload';
import { ListsState } from '../../plugins/lists';
import { MentionsState } from '../../plugins/mentions';
import { TextFormattingState } from '../../plugins/text-formatting';
import { ClearFormattingState } from '../../plugins/clear-formatting';
import { EditorView } from '../../prosemirror';
import { PanelState } from '../../plugins/panel';
import ChromeCollapsed from '../ChromeCollapsed';
import ChromeExpanded from '../ChromeExpanded';

export interface Props {
  editorView: EditorView;
  isExpanded?: boolean;
  placeholder?: string;
  onCancel?: () => void;
  onSave?: () => void;
  packageVersion?: string;
  packageName?: string;
  feedbackFormUrl?: string;
  pluginStateBlockType?: BlockTypeState;
  pluginStateCodeBlock?: CodeBlockState;
  pluginStateHyperlink?: HyperlinkState;
  pluginStateLists?: ListsState;
  pluginStateTextFormatting?: TextFormattingState;
  pluginStateClearFormatting?: ClearFormattingState;
  pluginStateImageUpload?: ImageUploadState;
  pluginStateMentions?: MentionsState;
  pluginStatePanel?: PanelState;
  pluginStateEmojis?: any; // EmojisPluginState;
  presenceResourceProvider?: any; // AbstractPresenceResource
  emojiProvider?: any; // Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  onCollapsedChromeFocus: () => void;
}

export default class Chrome extends PureComponent<Props, {}> {
  render() {
    const { props } = this;

    return props.isExpanded
      ? <ChromeExpanded
        onCancel={props.onCancel}
        onSave={props.onSave}
        feedbackFormUrl={props.feedbackFormUrl}
        pluginStateBlockType={props.pluginStateBlockType}
        pluginStateCodeBlock={props.pluginStateCodeBlock}
        pluginStateHyperlink={props.pluginStateHyperlink}
        pluginStateLists={props.pluginStateLists}
        pluginStateTextFormatting={props.pluginStateTextFormatting}
        pluginStateClearFormatting={props.pluginStateClearFormatting}
        pluginStateImageUpload={props.pluginStateImageUpload}
        pluginStateMentions={props.pluginStateMentions}
        pluginStateEmojis={props.pluginStateEmojis}
        mentionProvider={props.mentionProvider}
        presenceResourceProvider={props.presenceResourceProvider}
        emojiProvider={props.emojiProvider}
        editorView={props.editorView}
        pluginStatePanel={props.pluginStatePanel}
        packageVersion={props.packageVersion}
        packageName={props.packageName}
      >
        {props.children}
      </ChromeExpanded>
      : <ChromeCollapsed
        onFocus={this.props.onCollapsedChromeFocus}
        text={props.placeholder}
      />;
  }
};
