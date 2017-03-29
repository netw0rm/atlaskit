import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import ContainerHeader from './ContainerHeader';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import ContainerNavigationOuter from '../styled/ContainerNavigationOuter';
import ContainerNavigationInner from '../styled/ContainerNavigationInner';

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
    appearance: 'container',
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
      headerComponent,
      linkComponent,
      offsetX,
      onGlobalCreateActivate,
      onGlobalSearchActivate,
      shouldAnimate,
      width,
    } = this.props;

    const isWidthCollapsed = width <= containerClosedWidth;
    return (
      <ThemeProvider
        theme={{
          ContainerNavigationAppearance: appearance,
        }}
      >
        <nav
          data-__ak-navigation-container-closed={isWidthCollapsed}
        >
          <Spacer
            shouldAnimate={shouldAnimate}
            width={width + offsetX}
          />
          <ContainerNavigationOuter
            shouldAnimate={shouldAnimate}
            style={this.getOuterStyles()}
          >
            <ContainerNavigationInner
              appearance={appearance}
            >
              <GlobalPrimaryActions
                appearance={appearance}
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
                  headerComponent ? (
                    <ContainerHeader>
                      {headerComponent({ isCollapsed: width <= containerClosedWidth })}
                    </ContainerHeader>) : null
                }
              </div>
              <div>
                {children}
              </div>
            </ContainerNavigationInner>
          </ContainerNavigationOuter>
        </nav>
      </ThemeProvider>
    );
  }
}
