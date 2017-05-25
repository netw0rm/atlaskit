import React, { PureComponent, PropTypes } from 'react';
import memoizeOne from 'memoize-one';
import * as presets from '../../theme/presets';
import { WithTheme } from '../../theme/util';
import ContainerHeader from './ContainerHeader';
import ContainerNoHeader from '../styled/ContainerNoHeader';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import Reveal from './Reveal';
import ContainerNavigationInner from '../styled/ContainerNavigationInner';
import ContainerNavigationChildren from '../styled/ContainerNavigationChildren';
import subscribe from '../../watch-scroll-top';
import { globalPrimaryActions } from '../../shared-variables';

export default class ContainerNavigation extends PureComponent {
  static propTypes = {
    appearance: PropTypes.string,
    showGlobalPrimaryActions: PropTypes.bool,
    children: PropTypes.node,
    headerComponent: PropTypes.func,
    isCollapsed: PropTypes.bool,
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
    showGlobalPrimaryActions: false,
    isCollapsed: false,
    linkComponent: DefaultLinkComponent,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      isScrolling: false,
      isInitiallyRendered: false,
    };

    // Memoizing this function so that it will only be called
    // when the underlying DOM node is changing OR if it is
    // unmounting (in which case it will be `null`).
    this.onRefChange = memoizeOne(this.onRefChange);
  }

  componentWillReceiveProps() {
    // After any update we are going to start animating.
    // Not doing this in componentDidMount to prevent an
    // unneeded second render on mount.
    if (!this.state.isInitiallyRendered) {
      this.setState({
        isInitiallyRendered: true,
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

  render() {
    const {
      appearance,
      showGlobalPrimaryActions,
      children,
      globalCreateIcon,
      globalPrimaryIcon,
      globalPrimaryItemHref,
      globalSearchIcon,
      headerComponent,
      linkComponent,
      onGlobalCreateActivate,
      onGlobalSearchActivate,
      isCollapsed,
    } = this.props;

    // Only animating the revealing of GlobalPrimaryActions
    // after the first render. Before that it is rendered
    // without animation.
    const { isInitiallyRendered } = this.state;

    const header = headerComponent ? (
      <ContainerHeader
        isContentScrolled={this.state.isScrolling}
      >
        {headerComponent({ isCollapsed })}
      </ContainerHeader>) : <ContainerNoHeader />;

    return (
      <WithTheme
        provided={presets[appearance]}
        isCollapsed={isCollapsed}
      >
        <div data-__ak-navigation-container-closed={isCollapsed}>
          <ContainerNavigationInner
            innerRef={this.onRefChange}
          >
            <Reveal
              shouldAnimate={isInitiallyRendered}
              isOpen={showGlobalPrimaryActions}
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
            {header}
            <ContainerNavigationChildren>
              {children}
            </ContainerNavigationChildren>
          </ContainerNavigationInner>
        </div>
      </ThemeProvider>
    );
  }
}
