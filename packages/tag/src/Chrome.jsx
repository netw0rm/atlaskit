import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions */
export default class Chrome extends PureComponent {
  static propTypes = {
    isLink: PropTypes.bool.isRequired,
    markedForRemoval: PropTypes.bool.isRequired,
    isRemovable: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  refLinkTag = (linkTag) => {
    this.chromeLink = linkTag;
  }

  handleKeyPress = (e) => {
    if (e.charCode === 32 || e.charCode === 13) {
      if (this.chromeLink) {
        this.chromeLink.querySelector('a')
        .click();
      }
    }
  }

  render() {
    const chromeClassNames = classNames({
      [styles.chrome]: true,
      [styles.markedForRemoval]: this.props.markedForRemoval,
      [styles.isRemovable]: this.props.isRemovable,
    });
    const chromeProps = {};
    if (this.props.isLink) {
      chromeProps.role = 'link';
      chromeProps.ref = 'chromeLink';
      chromeProps.tabIndex = 0;
    } else {
      chromeProps.tabIndex = -1;
    }
    return (
      <span
        {...chromeProps}
        ref={this.refLinkTag}
        className={chromeClassNames}
        onKeyPress={this.handleKeyPress}
      >
        {this.props.children}
      </span>
    );
  }
}
