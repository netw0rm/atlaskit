import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';

export default class Tab extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isSelected: PropTypes.bool,
    label: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  }

  static defaultProps = {
    selected: false,
  }

  render() {
    return (
      <div aria-hidden={this.props.isSelected ? 'true' : 'false'}>
        <div
          className={classNames(styles.locals.akTabPane, {
            [styles.locals.selected]: this.props.isSelected,
          })}
          role="tabpanel"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
