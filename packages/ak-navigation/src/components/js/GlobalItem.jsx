import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/GlobalItem.less';

export default class GlobalItem extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      onActivate: PropTypes.func,
    };
  }
  static get defaultProps() {
    return {
      onActivate: () => {},
    };
  }

  render() {
    return (
      <button
        onClick={() => this.props.onActivate()}
        onMouseDown={e => e.preventDefault()}
        tabIndex="0"
        className={classNames(styles.locals.globalItem)}
      >
        <style>{styles.toString()}</style>
        {this.props.children}
      </button>
    );
  }
}
