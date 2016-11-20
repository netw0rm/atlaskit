import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/ContainerItem.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class GlobalItem extends Component {
  static get propTypes() {
    return {
      link: PropTypes.node,
      icon: PropTypes.node,
    };
  }

  render() {
    const link = this.props.link;
    return (
      <link.type {...link.props}>
        <style>{styles.toString()}</style>
        <div className={classNames(styles.locals.containerItem)}>
          {this.props.icon} {link.props.children}
        </div>
      </link.type>
    );
  }
}
