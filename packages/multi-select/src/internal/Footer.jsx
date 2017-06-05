import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Item } from '@atlaskit/droplist';
import styles from '../styles.less';

export default class Footer extends PureComponent {
  static propTypes = {
    elemBefore: PropTypes.node,
    isFocused: PropTypes.bool,
    children: PropTypes.node,
    newLabel: PropTypes.string,
    shouldHideSeparator: PropTypes.bool,
    textColor: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
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
            elemBefore={this.props.elemBefore}
            isFocused={this.props.isFocused}
            type="option"
          >
            <span style={{ color: this.props.textColor || null }}>
              {this.props.children}
              {
                this.props.newLabel ? ` (${this.props.newLabel})` : null
              }
            </span>
          </Item>
        }
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
