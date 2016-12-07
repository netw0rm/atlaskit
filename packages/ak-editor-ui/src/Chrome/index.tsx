import React, { PureComponent, ReactElement } from 'react';
import { ProseMirror } from 'ak-editor-prosemirror';
import { BlockTypeState } from 'ak-editor-plugin-block-type';
import { HyperlinkState } from 'ak-editor-plugin-hyperlink';
import { ListsState } from 'ak-editor-plugin-lists';
import { TextFormattingState } from 'ak-editor-plugin-text-formatting';
import ChromeCollapsed from '../ChromeCollapsed';
import ChromeExpanded from '../ChromeExpanded';

interface Props {
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
  onCollapsedChromeFocus: () => void;
}

interface State {
  isExpanded: boolean;
}

export default class Chrome extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: !!props.isExpanded };
  }
  
  componentWillReceiveProps(props: Props) {
    this.setState({ isExpanded: !!props.isExpanded });
  }

  render() {
    const { props, state } = this;

    return state.isExpanded
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
          onFocus={this.props.onCollapsedChromeFocus}
          text={props.placeholder}
        />;
  }
};
