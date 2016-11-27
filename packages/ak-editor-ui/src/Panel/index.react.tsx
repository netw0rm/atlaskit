import React, { FormEvent, PureComponent } from 'react';
import * as styles from './styles.global.less';

interface Props {}

interface State {}

export default class Panel extends PureComponent<Props, State> {
  state: State = {};

  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}
