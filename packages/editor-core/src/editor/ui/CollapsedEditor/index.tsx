import * as React from 'react';
import ChromeCollapsed from '../../../ui/ChromeCollapsed';

export interface Props {
  placeholder?: string;
  children?: any;
  onFocus: (e) => void;
  isExpanded: boolean;
}

export interface State {}

export default class CollapsedEditor extends React.Component<Props, State> {
  render() {
    if (this.props.isExpanded) {
      return this.props.children;
    }

    return <ChromeCollapsed onFocus={this.props.onFocus} text={this.props.placeholder} />;
  }
}
