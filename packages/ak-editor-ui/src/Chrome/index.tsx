import React, { PureComponent, ReactElement } from 'react';
import { ProseMirror } from 'ak-editor-prosemirror';
import BlockTypePlugin from 'ak-editor-plugin-block-type';
import ChromeCollapsed from '../ChromeCollapsed';
import ChromeExpanded from '../ChromeExpanded';

interface Props {
  defaultExpanded?: boolean;
  placeholder?: string;
  onCancel?: () => void;
  onSave?: () => void;
  pm?: ProseMirror;
  feedbackFormUrl?: string;
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
          pm={props.pm}
          feedbackFormUrl={props.feedbackFormUrl}
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
