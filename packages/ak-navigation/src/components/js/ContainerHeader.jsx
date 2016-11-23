import React, { Component, PropTypes } from 'react';
import styles from 'style!../less/ContainerHeader.less';

export default class ContainerHeader extends Component {
  static get propTypes() {
    return {
      text: PropTypes.string,
      icon: PropTypes.node,
    };
  }

  render() {
    return (
      <div className={styles.containerHeaderWrapper}>
        <div className={styles.containerHeader}>
          <div className={styles.icon}>
            {this.props.icon}
          </div>
          <div className={styles.text}> {this.props.text} </div>
        </div>
      </div>
    );
  }
}

