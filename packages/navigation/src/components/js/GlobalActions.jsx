import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/GlobalActions.less';
import GlobalItem from './GlobalItem';
import DrawerTrigger from './DrawerTrigger';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class GlobalActions extends PureComponent {
  static propTypes = {
    appearance: PropTypes.string,
    createIcon: PropTypes.node,
    isVisible: PropTypes.bool,
    linkComponent: PropTypes.func,
    onCreateActivate: PropTypes.func,
    onSearchActivate: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    searchIcon: PropTypes.node,
  };

  static defaultProps = {
    isVisible: true,
    linkComponent: DefaultLinkComponent,
  }

  render() {
    const {
      appearance,
      createIcon,
      isVisible,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryItemHref,
      searchIcon,
    } = this.props;
    return (
      <div
        className={classNames(styles.globalActions, {
          [styles.isVisible]: isVisible,
        })}
      >
        {primaryIcon ?
          <div className={styles.primaryItem}>
            <GlobalItem
              appearance={appearance}
              href={primaryItemHref}
              linkComponent={linkComponent}
              size="medium"
            >
              {primaryIcon}
            </GlobalItem>
          </div>
        : null}
        <div className={styles.actions}>
          {searchIcon ?
            <DrawerTrigger onActivate={onSearchActivate}>
              <GlobalItem appearance={appearance} size="medium">
                {searchIcon}
              </GlobalItem>
            </DrawerTrigger>
          : null}
          {createIcon ?
            <DrawerTrigger onActivate={onCreateActivate}>
              <GlobalItem appearance={appearance} size="medium">
                {createIcon}
              </GlobalItem>
            </DrawerTrigger>
          : null}
        </div>
      </div>
    );
  }
}
