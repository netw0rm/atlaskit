import React, { PureComponent } from 'react';
import * as styles from './styles.global.less';

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
