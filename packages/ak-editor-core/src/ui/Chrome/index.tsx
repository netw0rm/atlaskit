import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import { ProseMirror } from '../../prosemirror';
import { BlockTypeState } from '../../plugins/block-type';
import { CodeBlockState } from '../../plugins/code-block';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ListsState } from '../../plugins/lists';
import { TextFormattingState } from '../../plugins/text-formatting';
import { MentionsPluginState } from '../../plugins/mentions';
import { ImageUploadState } from '../../plugins/image-upload';
import ChromeCollapsed from '../ChromeCollapsed';
import ChromeExpanded from '../ChromeExpanded';

export interface Props {
  isExpanded?: boolean;
  placeholder?: string;
  onCancel?: () => void;
  onSave?: () => void;
  pm?: ProseMirror;
  feedbackFormUrl?: string;
  pluginStateBlockType?: BlockTypeState;
  pluginStateCodeBlock?: CodeBlockState;
  pluginStateHyperlink?: HyperlinkState;
  pluginStateLists?: ListsState;
  pluginStateTextFormatting?: TextFormattingState;
  pluginStateImageUpload?: ImageUploadState;
  pluginStateMentions?: MentionsPluginState;
  mentionsResourceProvider?: any; // AbstractMentionResource
  onCollapsedChromeFocus: () => void;
}

export interface State {}

export default class Chrome extends PureComponent<Props, State> {
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
          pluginStateImageUpload={props.pluginStateImageUpload}
          pluginStateMentions={props.pluginStateMentions}
          mentionsResourceProvider={props.mentionsResourceProvider}
      >
        {props.children}
      </ChromeExpanded>
      : <ChromeCollapsed
        onFocus={this.props.onCollapsedChromeFocus}
        text={props.placeholder}
      />;
  }
};
