import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';

export default class TabPane extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isSelected: PropTypes.bool,
  }

  static defaultProps = {
    isSelected: false,
  }

  render() {
    return (
      <div
        aria-hidden={this.props.isSelected ? 'false' : 'true'}
        className={classNames(styles.akTabPane, {
          [styles.selected]: this.props.isSelected,
        })}
        role="tabpanel"
      >
        {this.props.children}
      </div>
    );
  }
}
