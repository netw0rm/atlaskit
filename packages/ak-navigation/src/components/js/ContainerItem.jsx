import React, { Component, PropTypes } from 'react';
import styles from 'style!../less/ContainerItem.less';

export default class ContainerItem extends Component {
  static get propTypes() {
    return {
      text: PropTypes.node,
      icon: PropTypes.node,
    };
  }

  render() {
    return (
      <div>
        <div className={styles.containerItem}>
          {this.props.icon ?
            <div className={styles.icon}>{this.props.icon}</div> : null}
          <div className={styles.text}>{this.props.text}</div>
        </div>
      </div>
    );
  }
}
