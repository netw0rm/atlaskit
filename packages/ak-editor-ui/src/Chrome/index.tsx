import React, { PureComponent, ReactElement } from 'react';
import { ProseMirror } from 'ak-editor-prosemirror';
import { BlockTypeState } from 'ak-editor-plugin-block-type';
import { HyperlinkState } from 'ak-editor-plugin-hyperlink';
import { ListsState } from 'ak-editor-plugin-lists';
import { TextFormattingState } from 'ak-editor-plugin-text-formatting';
import ChromeCollapsed from '../ChromeCollapsed';
import ChromeExpanded from '../ChromeExpanded';

interface Props {
  defaultExpanded?: boolean;
  placeholder?: string;
  onCancel?: () => void;
  onSave?: () => void;
  pm?: ProseMirror;
  feedbackFormUrl?: string;
  pluginStateBlockType?: BlockTypeState;
  pluginStateHyperlink?: HyperlinkState;
  pluginStateLists?: ListsState;
  pluginStateTextFormatting?: TextFormattingState;
}

interface State {
  expanded: boolean;
}

export default class Chrome extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { expanded: props.defaultExpanded || false };
  }

  render() {
    const { props, state } = this;

    return state.expanded
      ? <ChromeExpanded
          onCancel={props.onCancel}
          onSave={props.onSave}
          feedbackFormUrl={props.feedbackFormUrl}
          pluginStateBlockType={props.pluginStateBlockType}
          pluginStateHyperlink={props.pluginStateHyperlink}
          pluginStateLists={props.pluginStateLists}
          pluginStateTextFormatting={props.pluginStateTextFormatting}
        >
          {props.children}
        </ChromeExpanded>
      : <ChromeCollapsed
          onFocus={this.handleChromeCollapsedFocus}
          text={props.placeholder}
        />;
  }

  collapse() {
    this.setState({ expanded: false });
  }

  private handleChromeCollapsedFocus = () => {
    this.setState({ expanded: true });
  }
};
