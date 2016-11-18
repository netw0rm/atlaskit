import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import styles from 'style!./styles.less';


export default class AkutilComponentTemplate extends Component {
  static get defaultProps() {
    return {
      name: 'AkUtilComponentTemplate',
    };
  }

  static get propTypes() {
    return {
      name: PropTypes.string,
    };
  }

  render() {
    return (
      <p
        className={classNames({
          [styles.myClassName]: true,
          anotherClass: false,
        })}
      >My name is {this.props.name}!</p>
    );
  }
}
