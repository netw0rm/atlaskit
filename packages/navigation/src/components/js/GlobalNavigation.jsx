import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/GlobalNavigation.less';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';
import PrimaryActions from './PrimaryActions';
import SecondaryActions from './SecondaryActions';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class GlobalNavigation extends PureComponent {
  static propTypes = {
    accountItem: PropTypes.func,
    helpItem: PropTypes.func,
    linkComponent: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    shouldAnimate: PropTypes.bool,
    searchIcon: PropTypes.node,
    onSearchActivate: PropTypes.func,
    onCreateActivate: PropTypes.func,
    createIcon: PropTypes.node,
  };
  static defaultProps = {
    accountItem: () => null,
    helpItem: () => null,
    linkComponent: DefaultLinkComponent,
    primaryIcon: null,
    shouldAnimate: false,
  };
  render() {
    const {
      accountItem,
      createIcon,
      helpItem,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryItemHref,
      searchIcon,
      shouldAnimate,
    } = this.props;
    return (
      <div
        className={classNames(styles.globalNavigationOuter, {
          [styles.shouldAnimate]: shouldAnimate,
        })}
      >
        <Spacer
          shouldAnimate={shouldAnimate}
          width={globalOpenWidth}
        />
        <div
          className={styles.globalNavigation}
        >
          <div className={styles.primaryContainer}>
            <PrimaryActions
              createIcon={createIcon}
              linkComponent={linkComponent}
              onCreateActivate={onCreateActivate}
              onSearchActivate={onSearchActivate}
              primaryIcon={primaryIcon}
              primaryItemHref={primaryItemHref}
              searchIcon={searchIcon}
            />
          </div>
          <div className={styles.secondaryContainer}>
            <SecondaryActions
              appearance="global"
              helpItem={helpItem}
              accountItem={accountItem}
            />
          </div>
        </div>
      </div>
    );
  }
}
