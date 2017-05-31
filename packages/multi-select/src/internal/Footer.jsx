import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';

import styles from '../styles.less';

export default class Footer extends PureComponent {
  static propTypes = {
    isFocused: PropTypes.bool,
    children: PropTypes.node,
    newLabel: PropTypes.string,
    shouldHideSeparator: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => {},
  }

  render() {
    const classes = classNames([styles.footer, {
      [styles.noSeparator]: this.props.shouldHideSeparator,
    }]);

    const newItemClasses = classNames([styles.footerNewItem, {
      [styles.footerNewItemFocused]: this.props.isFocused,
    }]);

    // keyboard interactions are handled in the main component
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={classes} onClick={this.props.onClick}>
        {
          this.props.newLabel ?
            <span className={newItemClasses}>
              {this.props.children} ({ this.props.newLabel })
            </span> :
            <span className={styles.emptyFooter}>
              {this.props.children}
            </span>
        }
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
