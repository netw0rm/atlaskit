import * as React from 'react';
import { PureComponent } from 'react';
import { BlockTypeState } from '../../plugins/block-type';
import { CodeBlockState } from '../../plugins/code-block';
import { HyperlinkState } from '../../plugins/hyperlink';
import { ImageUploadState } from '../../plugins/image-upload';
import { ListsState } from '../../plugins/lists';
import { MentionsPluginState } from '../../plugins/mentions';
import { TextFormattingState } from '../../plugins/text-formatting';
import { PanelState } from '../../plugins/panel';
import { ProseMirror } from '../../prosemirror';
import ChromeCollapsed from '../ChromeCollapsed';
import ChromeExpanded from '../ChromeExpanded';

export interface Props {
  isExpanded?: boolean;
  placeholder?: string;
  onCancel?: () => void;
  onSave?: () => void;
  packageVersion?: string;
  packageName?: string;
  pm?: ProseMirror;
  feedbackFormUrl?: string;
  pluginStateBlockType?: BlockTypeState;
  pluginStateCodeBlock?: CodeBlockState;
  pluginStateHyperlink?: HyperlinkState;
  pluginStateLists?: ListsState;
  pluginStateTextFormatting?: TextFormattingState;
  pluginStateImageUpload?: ImageUploadState;
  pluginStateMentions?: MentionsPluginState;
  pluginStatePanel?: PanelState;
  mentionsResourceProvider?: any; // AbstractMentionResource
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
          pluginStateImageUpload={props.pluginStateImageUpload}
          pluginStateMentions={props.pluginStateMentions}
          mentionsResourceProvider={props.mentionsResourceProvider}
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
