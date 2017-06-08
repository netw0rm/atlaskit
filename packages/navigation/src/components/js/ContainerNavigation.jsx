import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import { WithRootTheme } from '../../theme/util';
import ContainerHeader from './ContainerHeader';
import ContainerNoHeader from '../styled/ContainerNoHeader';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActions from './GlobalPrimaryActions';
import Reveal from './Reveal';
import ContainerNavigationInner from '../styled/ContainerNavigationInner';
import ContainerNavigationChildren from '../styled/ContainerNavigationChildren';
import subscribe from '../../watch-scroll-top';
import { globalPrimaryActions } from '../../shared-variables';
import { container } from '../../theme/presets';

export default class ContainerNavigation extends PureComponent {
  static propTypes = {
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
    theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    showGlobalPrimaryActions: false,
    isCollapsed: false,
    linkComponent: DefaultLinkComponent,
    theme: container,
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
      theme,
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
      <WithRootTheme
        provided={theme}
        isCollapsed={isCollapsed}
      >
        {/* This div is needed for legacy reasons.
        All children should use isCollapsed on the theme */}
        <ContainerNavigationInner
          data-__ak-navigation-container-closed={isCollapsed}
          innerRef={this.onRefChange}
        >
          <Reveal
            shouldAnimate={isInitiallyRendered}
            isOpen={showGlobalPrimaryActions}
            openHeight={globalPrimaryActions.height.outer}
          >
            <GlobalPrimaryActions
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
      </WithRootTheme>
    );
  }
}
