import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/ContainerNavigation.less';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalActions from './GlobalActions';
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
    header: PropTypes.node,
    shouldAnimate: PropTypes.bool,
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
      header,
      linkComponent,
      offsetX,
      onGlobalCreateActivate,
      onGlobalSearchActivate,
      shouldAnimate,
      width,
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
              [styles.hasContainerHeader]: header !== null,
              [styles.hasGlobalAppearance]: appearance === 'global',
            })}
          >
            <GlobalActions
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
              {header}
            </div>
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
