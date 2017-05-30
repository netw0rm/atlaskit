import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';

import styles from '../styles.less';

export default class Footer extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['link', 'text']),
    isFocused: PropTypes.bool,
    children: PropTypes.node,
    href: PropTypes.string,
    newLabel: PropTypes.string,
    shouldHideSeparator: PropTypes.bool,
  }

  static defaultProps = {
    onClick: () => {},
    appearance: 'text',
  }

  render() {
    const footerClasses = classNames([styles.footer, {
      [styles.noSeparator]: this.props.shouldHideSeparator,
      [styles.linkAppearance]: this.props.appearance === 'link',
    }]);

    const itemClasses = classNames([styles.footerItem, {
      [styles.footerFocused]: this.props.isFocused,
      [styles.newItem]: this.props.newLabel || this.props.appearance === 'link',
    }]);

    return (
      <div
        className={footerClasses}
        data-role="multi-select-footer"
      >
        {
          <span className={itemClasses}>
            { this.props.href ?
              <a
                href={this.props.href}
                ref={ref => (this.linkRef = ref)}
              >{this.props.children}</a> :
              (this.props.children)}
            {
              this.props.newLabel ? `(${this.props.newLabel})` : null
            }
          </span>
        }
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
