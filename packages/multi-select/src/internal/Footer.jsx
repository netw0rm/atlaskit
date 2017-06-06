import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Item } from '@atlaskit/droplist';
import styles from '../styles.less';

export default class Footer extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'primary']),
    children: PropTypes.node,
    elemBefore: PropTypes.node,
    isFocused: PropTypes.bool,
    onClick: PropTypes.func,
    newLabel: PropTypes.string,
    shouldHideSeparator: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'default',
    onClick: () => {},
  }

  render() {
    const footerClasses = classNames([styles.footer, {
      [styles.noSeparator]: this.props.shouldHideSeparator,
    }]);

    // keyboard navigation is handled in the main component
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={footerClasses}
        onClick={this.props.onClick}
      >
        {
          <Item
            appearance={this.props.appearance}
            elemBefore={this.props.elemBefore}
            isFocused={this.props.isFocused}
            type="option"
          >
            {this.props.children}
            {
              this.props.newLabel ? ` (${this.props.newLabel})` : null
            }
          </Item>
        }
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
