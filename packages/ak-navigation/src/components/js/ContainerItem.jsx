import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/ContainerItem.less';

// eslint-disable-next-line react/prefer-stateless-function
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
        <style>{styles.toString()}</style>
        <div className={classNames(styles.locals.containerItem)}>
          {this.props.icon} {this.props.text}
        </div>
      </div>
    );
  }
}
