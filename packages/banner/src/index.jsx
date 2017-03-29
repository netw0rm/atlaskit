import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./style.less';
import classNames from 'classnames';

export default class Banner extends PureComponent {
  static propTypes = {
    /** Visual style to be used for the banner */
    appearance: PropTypes.oneOf(['warning', 'error']),
    /** Content to be shown next to the icon. Typically text content but can contain links. */
    children: PropTypes.node,
    /** Icon to be shown left of the main content. Typically an AtlasKit icon (ak-icon) */
    icon: PropTypes.element,
    /** Defines whether the banner is shown. An animation is used when the value is changed. */
    isOpen: PropTypes.bool,
  };

  static defaultProps = {
    appearance: 'warning',
    isOpen: false,
  };

  render() {
    return (
      <div
        aria-hidden={!this.props.isOpen}
        className={classNames({
          [styles.banner]: true,
          [styles[this.props.appearance]]: true,
          [styles.open]: this.props.isOpen,
        })}
        role="alert"
      >
        <div className={styles.bannerContent}>
          <span className={styles.bannerIcon}>{this.props.icon}</span>
          <span className={styles.bannerText}>{this.props.children}</span>
        </div>
      </div>
    );
  }
}
