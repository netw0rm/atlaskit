import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import { themeVariables } from '../../utils/theme';
import ContainerHeader from './ContainerHeader';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import Reveal from './Reveal';
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

  state = {
    shouldAnimateGlobalPrimaryActions: false,
  }

  componentWillReceiveProps() {
    // start animating global primary actions after initial mount
    if (!this.state.shouldAnimateGlobalPrimaryActions) {
      this.setState({
        shouldAnimateGlobalPrimaryActions: true,
      });
    }
  }

  getOuterStyles() {
    if (!this.props.offsetX) {
      return {
        width: this.props.width,
      };
    }

    // temporary fix for the AK-1780. When it resolved, this marginLeft should be changed back
    // to translateX
    return {
      marginLeft: `${this.props.offsetX}px`,
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

    const { shouldAnimateGlobalPrimaryActions } = this.state;

    const isWidthCollapsed = width <= containerClosedWidth;
    const header = headerComponent ? (
      <ContainerHeader>
        {headerComponent({ isCollapsed: width <= containerClosedWidth })}
      </ContainerHeader>
    ) : null;

    return (
      <ThemeProvider
        theme={{
          [themeVariables.appearance]: appearance,
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
            <ContainerNavigationInner>
              <Reveal
                shouldAnimate={shouldAnimateGlobalPrimaryActions}
                isOpen={areGlobalActionsVisible}
                openHeight={300}
              >
                <GlobalPrimaryActions
                  appearance={appearance}
                  createIcon={globalCreateIcon}
                  isVisible
                  linkComponent={linkComponent}
                  onCreateActivate={onGlobalCreateActivate}
                  onSearchActivate={onGlobalSearchActivate}
                  primaryIcon={globalPrimaryIcon}
                  primaryItemHref={globalPrimaryItemHref}
                  searchIcon={globalSearchIcon}
                />
              </Reveal>
              <div>
                {header}
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
