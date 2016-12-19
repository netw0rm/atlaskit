import React, { PureComponent, ReactElement } from 'react';
import { ProseMirror } from '../../prosemirror';
import { BlockTypeState } from '../../plugins/block-type';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ListsState } from '../../plugins/lists';
import { TextFormattingState } from '../../plugins/text-formatting';
import { MentionsPluginState } from '../../plugins/mentions';
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
