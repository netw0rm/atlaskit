import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/ContainerNavigation.less';
import ContainerHeader from './ContainerHeader';
import DefaultLinkComponent from './DefaultLinkComponent';
import PrimaryActions from './PrimaryActions';
import SecondaryActions from './SecondaryActions';
import {
  containerOpenWidth,
  containerClosedWidth,
} from '../../shared-variables';
import Spacer from './Spacer';

export default class ContainerNavigation extends PureComponent {
  static propTypes = {
    appearance: PropTypes.string,
    areGlobalActionsVisible: PropTypes.bool,
    children: PropTypes.node,
    headerComponent: PropTypes.func,
    shouldAnimate: PropTypes.bool,
    helpItem: PropTypes.func,
    accountItem: PropTypes.func,
    width: PropTypes.number,
    offsetX: PropTypes.number,
    linkComponent: PropTypes.func,
    globalPrimaryItemHref: PropTypes.string,
    globalPrimaryIcon: PropTypes.node,
    globalSearchIcon: PropTypes.node,
    globalCreateIcon: PropTypes.node,
    onGlobalCreateActivate: PropTypes.func,
    onGlobalSearchActivate: PropTypes.func,
  }

  static defaultProps = {
    appearance: 'default',
    areGlobalActionsVisible: false,
    shouldAnimate: false,
    width: containerOpenWidth,
    offsetX: 0,
    linkComponent: DefaultLinkComponent,
    helpItem: () => null,
    accountItem: () => null,
  }

  getOuterStyles() {
    return {
      transform: `translateX(${this.props.offsetX}px)`,
      width: this.props.width,
    };
  }

  render() {
    const {
      appearance,
      areGlobalActionsVisible,
      children,
      globalCreateIcon,
      globalPrimaryIcon,
      globalPrimaryItemHref,
      globalSearchIcon,
      headerComponent,
      linkComponent,
      offsetX,
      onGlobalCreateActivate,
      onGlobalSearchActivate,
      shouldAnimate,
      width,
      helpItem,
      accountItem,
    } = this.props;

    const isWidthCollapsed = width <= containerClosedWidth;

    return (
      <div
        className={classNames({
          [styles.shouldAnimate]: shouldAnimate,
        })}
        data-__ak-navigation-container-closed={isWidthCollapsed}
      >
        <Spacer
          shouldAnimate={shouldAnimate}
          width={width + offsetX}
        />
        <div
          className={styles.containerNavigationOuter}
          style={this.getOuterStyles()}
        >
          <div
            className={classNames(styles.containerNavigationInner, {
              [styles.hasContainerHeader]: headerComponent !== null,
              [styles.hasGlobalAppearance]: appearance === 'global',
            })}
          >
            <div className={styles.primaryContainer}>
              <PrimaryActions
                appearance={appearance === 'global' ? 'global' : 'container'}
                createIcon={globalCreateIcon}
                isVisible={areGlobalActionsVisible}
                linkComponent={linkComponent}
                onCreateActivate={onGlobalCreateActivate}
                onSearchActivate={onGlobalSearchActivate}
                primaryIcon={globalPrimaryIcon}
                primaryItemHref={globalPrimaryItemHref}
                searchIcon={globalSearchIcon}
              />
              <div>
                {
                this.props.headerComponent ? (
                  <ContainerHeader>
                    {this.props.headerComponent({ isCollapsed: width <= containerClosedWidth })}
                  </ContainerHeader>) : null
              }
              </div>
              <div>
                {children}
              </div>
            </div>
            <div className={styles.secondaryContainer}>
              <SecondaryActions
                appearance={appearance === 'global' ? 'global' : 'container'}
                isVisible={areGlobalActionsVisible}
                helpItem={helpItem}
                accountItem={accountItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
