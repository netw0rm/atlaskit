import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import styles from '../less/ContainerHeader.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class ContainerHeader extends Component {
  static get propTypes() {
    return {
      text: PropTypes.string,
      icon: PropTypes.node,
    };
  }

  render() {
    return (
      <div className={classNames(styles.locals.containerHeaderWrapper)}>
        <div className={classNames(styles.locals.containerHeader)}>
          <style>{styles.toString()}</style>
          <div className={classNames(styles.locals.icon)}>
            {this.props.icon}
          </div>
          <div className={classNames(styles.locals.text)}> {this.props.text} </div>
        </div>
      </div>
    );
  }
}

