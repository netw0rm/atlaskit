/** @jsx React.createElement */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import styles from './styles.less';
import size from './internal/size';

export default class Root extends Component {
  static get propTypes() {
    return {
      size: PropTypes.oneOf(Object.values(size)),
      onClick: PropTypes.func,
      children: PropTypes.node,
    };
  }

  static get defaultProps() {
    return {
      size: size.small,
      onClick() {},
    };
  }

  render() {
    const classes = {
      [styles.locals.icon]: true,
      [styles.locals[this.props.size]]: !!this.props.size,
    };
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className={classnames(classes)} onClick={this.props.onClick}>
        <style>{styles.toString()}</style>
        {this.props.children}
      </div>
    );
  }
}
