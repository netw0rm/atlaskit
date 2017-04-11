import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import memoizeOne from 'memoize-one';
import ContainerHeader from './ContainerHeader';
import ContainerNoHeader from '../styled/ContainerNoHeader';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import ContainerNavigationOuter from '../styled/ContainerNavigationOuter';
import ContainerNavigationInner from '../styled/ContainerNavigationInner';
import ContainerNavigationChildren from '../styled/ContainerNavigationChildren';
import subscribe from '../../watch-scroll-top';

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

  constructor(props, context) {
    super(props, context);

    this.state = {
      isScrolling: false,
    };

    this.onScrollTopChange = memoizeOne(this.onScrollTopChange);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  onScrollTopChange = (number) => {
    const isScrolling = number > 0;

    if (isScrolling === this.state.isScrolling) {
      return;
    }

    this.setState({
      isScrolling,
    });
  }

  getOuterStyles() {
    return {
      transform: `translateX(${this.props.offsetX}px)`,
      width: this.props.width,
    };
  }

  watchScrollTop = (el) => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (!el) {
      return;
    }

    this.unsubscribe = subscribe(el, this.onScrollTopChange);
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
          NavigationAppearance: appearance,
          isCollapsed: isWidthCollapsed,
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
              innerRef={this.watchScrollTop}
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
              {
                headerComponent ? (
                  <ContainerHeader
                    appearance={appearance}
                    isContentScrolled={this.state.isScrolling}
                  >
                    {headerComponent({ isCollapsed: isWidthCollapsed })}
                  </ContainerHeader>) : <ContainerNoHeader />
              }
              <ContainerNavigationChildren>
                {children}
              </ContainerNavigationChildren>
            </ContainerNavigationInner>
          </ContainerNavigationOuter>
        </nav>
      </ThemeProvider>
    );
  }
}
