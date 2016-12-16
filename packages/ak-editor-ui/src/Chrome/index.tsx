import React, { PureComponent, ReactElement } from 'react';
import { ProseMirror } from 'ak-editor-prosemirror';
import { BlockTypeState } from 'ak-editor-plugin-block-type';
import { HyperlinkState } from 'ak-editor-plugin-hyperlink';
import { ListsState } from 'ak-editor-plugin-lists';
import { TextFormattingState } from 'ak-editor-plugin-text-formatting';
import { ImageUploadState } from 'ak-editor-plugin-image-upload';
import { MentionsPluginState } from 'ak-editor-plugin-mentions';
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
