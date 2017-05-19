import * as React from 'react';
import { PureComponent } from 'react';
import { Input } from './styles';

export interface Props {
  text?: string;
  onFocus?: () => void;
}

export default class ChromeCollapsed extends PureComponent<Props, {}> {
  render() {
    const placeholder = this.props.text || 'Type something…';

    return (
      <Input
        onFocus={this.props.onFocus}
        placeholder={placeholder}
      />
    );
  }
}
