import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/GlobalNavigation.less';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';
import GlobalItem from './GlobalItem';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class GlobalNavigation extends PureComponent {
  static propTypes = {
    accountItem: PropTypes.node,
    children: PropTypes.node,
    helpItem: PropTypes.node,
    linkComponent: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    shouldAnimate: PropTypes.bool,
    width: PropTypes.number,
  };
  static defaultProps = {
    accountItem: null,
    helpItem: null,
    linkComponent: DefaultLinkComponent,
    primaryIcon: null,
    shouldAnimate: false,
    width: globalOpenWidth,
  };
  getTranslate() {
    return Math.min(0, this.props.width - globalOpenWidth);
  }
  render() {
    const {
      accountItem,
      children,
      helpItem,
      linkComponent,
      primaryIcon,
      primaryItemHref,
      shouldAnimate,
      width,
    } = this.props;
    return (
      <div
        className={classNames({
          [styles.shouldAnimate]: shouldAnimate,
        })}
      >
        <Spacer
          width={width}
          shouldAnimate={shouldAnimate}
        />
        <div
          className={styles.globalNavigation}
          style={{
            transform: `translateX(${this.getTranslate()}px)`,
          }}
        >
          <div className={styles.primaryIcon}>
            <GlobalItem
              size="medium"
              linkComponent={linkComponent}
              href={primaryItemHref}
            >
              {primaryIcon}
            </GlobalItem>
          </div>
          <div className={styles.primaryContainer}>
            {children}
          </div>
          <div className={styles.secondaryContainer}>
            {helpItem}
            {accountItem}
          </div>
        </div>
      </div>
    );
  }
}
