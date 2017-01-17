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
      globalPrimaryIcon,
      globalPrimaryItemHref,
      header,
      linkComponent,
      offsetX,
      shouldAnimate,
      width,
      onGlobalCreateActivate,
      onGlobalSearchActivate,
      globalSearchIcon,
      globalCreateIcon,
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
          width={width + offsetX}
          shouldAnimate={shouldAnimate}
        />
        <div
          style={this.getOuterStyles()}
          className={styles.containerNavigationOuter}
        >
          <div
            className={classNames(styles.containerNavigationInner, {
              [styles.hasContainerHeader]: header !== null,
              [styles.hasGlobalAppearance]: appearance === 'global',
            })}
          >
            <GlobalActions
              appearance={appearance === 'global' ? 'global' : 'container'}
              primaryIcon={globalPrimaryIcon}
              primaryItemHref={globalPrimaryItemHref}
              linkComponent={linkComponent}
              onCreateActivate={onGlobalCreateActivate}
              onSearchActivate={onGlobalSearchActivate}
              searchIcon={globalSearchIcon}
              createIcon={globalCreateIcon}
              isVisible={areGlobalActionsVisible}
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
