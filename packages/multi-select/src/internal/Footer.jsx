import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';

import styles from '../styles.less';

export default class NothingWasFound extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    newLabel: PropTypes.string,
    shouldHideSeparator: PropTypes.bool,
  }

  render() {
    const classes = classNames([styles.footer, {
      [styles.noSeparator]: this.props.shouldHideSeparator,
    }]);
    return (
      <div className={classes}>
        {this.props.children}
        <span className={styles.footerNewLabel}> ({ this.props.newLabel })</span>
      </div>
    );
  }
}
