import * as React from 'react';
import { PureComponent } from 'react';
import * as styles from './styles';

export interface Props {
  text?: string;
  onFocus?: () => void;
}

export interface State {}

export default class ChromeCollapsed extends PureComponent<Props, State> {
  render() {
    const placeholder = this.props.text || 'Type something…';

    return (
      <input
        className={styles.input}
        onFocus={this.props.onFocus}
        placeholder={placeholder}
      />
    );
  }
};
