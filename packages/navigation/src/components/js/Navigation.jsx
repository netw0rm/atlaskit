import React, { PureComponent, PropTypes } from 'react';
import GlobalNavigation from './GlobalNavigation';
import ContainerNavigation from './ContainerNavigation';
import DefaultLinkComponent from './DefaultLinkComponent';
import Resizer from './Resizer';
import Spacer from './Spacer';
import {
  containerClosedWidth,
  globalOpenWidth,
  navigationOpenWidth,
  resizeClosedBreakpoint,
} from '../../shared-variables';
import NavigationOuter from '../styled/NavigationOuter';
import NavigationInner from '../styled/NavigationInner';

export default class Navigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    containerAppearance: PropTypes.string,
    containerHeaderComponent: PropTypes.func,
    drawers: PropTypes.arrayOf(PropTypes.node),
    globalAppearance: PropTypes.string,
    globalCreateIcon: PropTypes.node,
    globalPrimaryIcon: PropTypes.node,
    globalPrimaryItemHref: PropTypes.string,
    globalSearchIcon: PropTypes.node,
    globalSecondaryActions: PropTypes.arrayOf(PropTypes.node),
    isCollapsible: PropTypes.bool,
    isOpen: PropTypes.bool,
    isResizeable: PropTypes.bool,
    linkComponent: PropTypes.func,
    onCreateDrawerOpen: PropTypes.func,
    onResize: PropTypes.func,
    onResizeStart: PropTypes.func,
    onSearchDrawerOpen: PropTypes.func,
    width: PropTypes.number,
  };

  static defaultProps = {
    containerAppearance: 'container',
    drawers: [],
    globalAppearance: 'global',
    globalSecondaryActions: [],
    isCollapsible: true,
    isCreateDrawerOpen: false,
    isOpen: true,
    isResizeable: true,
    isSearchDrawerOpen: false,
    linkComponent: DefaultLinkComponent,
    onCreateDrawerOpen: () => { },
    onResize: () => { },
    onResizeStart: () => { },
    onSearchDrawerOpen: () => { },
    width: navigationOpenWidth,
  };

  state = {
    resizeDelta: 0,
    isTogglingIsOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isTogglingIsOpen: this.props.isOpen !== nextProps.isOpen,
    });
  }

  onResize = (resizeDelta) => {
    this.setState({
      resizeDelta,
    });
  }

  getRenderedWidth = () => {
    const baselineWidth = this.props.isOpen ? this.props.width : containerClosedWidth;
    const minWidth = this.props.isCollapsible ? containerClosedWidth : navigationOpenWidth;
    return Math.max(
      minWidth,
      baselineWidth + this.state.resizeDelta
    );
  }

  callOnResizeProp = () => {
    const width = this.getRenderedWidth();

    const snappedWidth = (() => {
      if (width > navigationOpenWidth) {
        return width;
      }
      if (width < resizeClosedBreakpoint) {
        return containerClosedWidth;
      }
      return navigationOpenWidth;
    })();

    const resizeState = {
      isOpen: (width >= resizeClosedBreakpoint),
      width: snappedWidth,
    };

    this.setState({
      resizeDelta: 0,
    }, function callOnResizeAfterSetState() {
      this.props.onResize(resizeState);
    });
  }

  triggerResizeButtonHandler = (resizeState) => {
    this.props.onResize(resizeState);
  }

  render() {
    const {
      children,
      containerAppearance,
      containerHeaderComponent,
      drawers,
      globalAppearance,
      globalCreateIcon,
      globalPrimaryIcon,
      globalPrimaryItemHref,
      globalSearchIcon,
      globalSecondaryActions,
      isResizeable,
      isOpen,
      linkComponent,
      onCreateDrawerOpen,
      onResizeStart,
      onSearchDrawerOpen,
    } = this.props;

    const {
      isTogglingIsOpen,
      resizeDelta,
     } = this.state;

    const isResizing = resizeDelta !== 0;
    const renderedWidth = this.getRenderedWidth();

    const isGlobalNavPartiallyCollapsed = isResizing &&
      renderedWidth < (globalOpenWidth + containerClosedWidth);

    // Cover over the global navigation when it is partially collapsed
    const containerOffsetX = isGlobalNavPartiallyCollapsed ?
      renderedWidth - (globalOpenWidth + containerClosedWidth) : 0;

    const showGlobalNavigation = isOpen || isResizing;

    const containerWidth = showGlobalNavigation ?
      Math.max(renderedWidth - globalOpenWidth, containerClosedWidth) :
      containerClosedWidth;

    const isContainerCollapsed = !showGlobalNavigation || containerWidth === containerClosedWidth;
    const shouldAnimateContainer = isTogglingIsOpen && !isResizing;

    const globalNavigation = showGlobalNavigation ? (
      <Spacer width={globalOpenWidth + containerOffsetX}>
        <GlobalNavigation
          appearance={globalAppearance}
          createIcon={globalCreateIcon}
          linkComponent={linkComponent}
          onCreateActivate={onCreateDrawerOpen}
          onSearchActivate={onSearchDrawerOpen}
          primaryIcon={globalPrimaryIcon}
          primaryItemHref={globalPrimaryItemHref}
          searchIcon={globalSearchIcon}
          secondaryActions={globalSecondaryActions}
        />
      </Spacer>
    ) : null;

    const resizer = isResizeable ? (
      <Resizer
        navigationWidth={renderedWidth}
        onResize={this.onResize}
        onResizeButton={this.triggerResizeButtonHandler}
        onResizeStart={onResizeStart}
        onResizeEnd={this.callOnResizeProp}
      />
    ) : null;

    return (
      <NavigationOuter>
        {/* Used to push the page to the right the width of the nav */}
        <Spacer
          shouldAnimate={shouldAnimateContainer}
          width={renderedWidth}
        />
        <NavigationInner>
          <div style={{ zIndex: isGlobalNavPartiallyCollapsed ? false : 1 }}>
            {globalNavigation}
          </div>
          <div style={{ zIndex: 2, position: 'relative' }}>
            {drawers}
          </div>
          <div>
            <Spacer
              shouldAnimate={shouldAnimateContainer}
              width={containerWidth}
            >
              <ContainerNavigation
                appearance={containerAppearance}
                areGlobalActionsVisible={!showGlobalNavigation}
                globalCreateIcon={globalCreateIcon}
                globalPrimaryIcon={globalPrimaryIcon}
                globalPrimaryItemHref={globalPrimaryItemHref}
                globalSearchIcon={globalSearchIcon}
                headerComponent={containerHeaderComponent}
                linkComponent={linkComponent}
                onGlobalCreateActivate={onCreateDrawerOpen}
                onGlobalSearchActivate={onSearchDrawerOpen}
                isCollapsed={isContainerCollapsed}
              >
                {children}
              </ContainerNavigation>
            </Spacer>
          </div>
          {resizer}
        </NavigationInner>
      </NavigationOuter>
    );
  }
}
