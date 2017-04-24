import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import memoizeOne from 'memoize-one';
import { themeVariables } from '../../utils/theme';
import ContainerHeader from './ContainerHeader';
import ContainerNoHeader from '../styled/ContainerNoHeader';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import Reveal from './Reveal';
import ContainerNavigationOuter from '../styled/ContainerNavigationOuter';
import ContainerNavigationInner from '../styled/ContainerNavigationInner';
import ContainerNavigationChildren from '../styled/ContainerNavigationChildren';
import subscribe from '../../watch-scroll-top';
import {
  containerOpenWidth,
  containerClosedWidth,
  globalPrimaryActions,
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
      shouldAnimateGlobalPrimaryActions: false,
    };

    // Memoizing this function so that it will only be called
    // when the underlying DOM node is changing OR if it is
    // unmounting (in which case it will be `null`).
    this.onRefChange = memoizeOne(this.onRefChange);
  }

  componentWillReceiveProps() {
    // start animating global primary actions after initial mount
    if (!this.state.shouldAnimateGlobalPrimaryActions) {
      this.setState({
        shouldAnimateGlobalPrimaryActions: true,
      });
    }
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

  onRefChange = (el) => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (!el) {
      return;
    }

    this.unsubscribe = subscribe(el, this.onScrollTopChange);
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

    return (
      <ThemeProvider
        theme={{
          [themeVariables.appearance]: appearance,
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
              innerRef={this.onRefChange}
            >
              <Reveal
                shouldAnimate={shouldAnimateGlobalPrimaryActions}
                isOpen={areGlobalActionsVisible}
                openHeight={globalPrimaryActions.height.outer}
              >
                <GlobalPrimaryActions
                  appearance={appearance}
                  createIcon={globalCreateIcon}
                  linkComponent={linkComponent}
                  onCreateActivate={onGlobalCreateActivate}
                  onSearchActivate={onGlobalSearchActivate}
                  primaryIcon={globalPrimaryIcon}
                  primaryItemHref={globalPrimaryItemHref}
                  searchIcon={globalSearchIcon}
                />
              </Reveal>
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
