import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/ContainerItem.less';
import className from 'classnames';

export default class ContainerItem extends PureComponent {
  static propTypes = {
    text: PropTypes.node,
    icon: PropTypes.node,
    isSelected: PropTypes.bool,
  }

  render() {
    return (
      <div
        className={className(styles.containerItemOuter, {
          [styles.isSelected]: this.props.isSelected,
        })}
      >
        <div
          className={styles.containerItemInner}
        >
          {this.props.icon ?
            <div className={styles.icon}>{this.props.icon}</div> : null}
          <div className={styles.text}>{this.props.text}</div>
        </div>
      </div>
    );
  }
}
