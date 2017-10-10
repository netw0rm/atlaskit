import * as React from 'react';
import ChromeCollapsed from '../../../ui/ChromeCollapsed';

export interface Props {
  placeholder?: string;
  children?: any;
}

export interface State {
  isExpanded: boolean;
}

export default class CollapsedEditor extends React.Component<Props, State> {
  state: State = {
    isExpanded: false
  };

  private handleFocus = () => {
    this.setState({ isExpanded: true });
  }

  render() {
    if (this.state.isExpanded) {
      return this.props.children;
    }

    return <ChromeCollapsed onFocus={this.handleFocus} text={this.props.placeholder} />;
  }
}
