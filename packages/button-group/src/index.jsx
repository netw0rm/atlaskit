import React, { PureComponent } from 'react';
import styles from 'style!./styles.less';

export default class AkButtonGroup extends PureComponent {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div className={styles.wrapper}>
        { this.props.children }
      </div>
    );
  }
}
