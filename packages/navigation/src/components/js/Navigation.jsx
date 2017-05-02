import React, { PureComponent, PropTypes } from 'react';
import GlobalNavigation from './GlobalNavigation';
import ContainerNavigation from './ContainerNavigation';
import DefaultLinkComponent from './DefaultLinkComponent';
import Resizer from './Resizer';
import Spacer from './Spacer';
import {
  containerClosedWidth,
  containerOpenWidth,
  globalOpenWidth,
  resizeClosedBreakpoint,
  standardOpenWidth,
} from '../../shared-variables';
import NavigationOuter from '../styled/NavigationOuter';
import NavigationInner from '../styled/NavigationInner';

const warnIfCollapsedPropsAreInvalid = ({ isCollapsible, isOpen }) => {
  if (!isCollapsible && !isOpen) {
    console.warn(`
        Navigation is being told it cannot collapse and that it is not open.
        When Navigation cannot collapse it must always be open.
        Ignoring isOpen={true}
      `);
  }
};

const getSnappedWidth = (width) => {
  // |------------------------------|
  //      |           |             |
  //    closed    breakpoint       open
  //          * snap closed
  //                       * snap open
  //                                    * maintain expanded width

  // Snap closed if width ever goes below the resizeClosedBreakpoint
  if (width < resizeClosedBreakpoint) {
    return globalOpenWidth;
  }

  // Snap open if in between the closed breakpoint and the standard width
  if (width > resizeClosedBreakpoint && width < standardOpenWidth) {
    return standardOpenWidth;
  }

  // At this point the width > standard width.
  // We allow you to have your own wider width.
  return width;
};

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
    width: globalOpenWidth + containerOpenWidth,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      resizeDelta: 0,
      isResizing: false,
      isTogglingIsOpen: false,
    };

    warnIfCollapsedPropsAreInvalid(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isTogglingIsOpen: this.props.isOpen !== nextProps.isOpen,
    });

    warnIfCollapsedPropsAreInvalid(nextProps);
  }

  onResize = (resizeDelta) => {
    this.setState({
      isResizing: true,
      resizeDelta,
    });
  }

  onResizeEnd = () => {
    const width = this.getRenderedWidth();
    const snappedWidth = getSnappedWidth(width);

    const resizeState = {
      isOpen: (snappedWidth >= standardOpenWidth),
      width: snappedWidth,
    };

    this.setState({
      resizeDelta: 0,
      isResizing: false,
    }, function callOnResizeAfterSetState() {
      this.props.onResize(resizeState);
    });
  }

  getRenderedWidth = () => {
    const baselineWidth = this.props.isOpen ? this.props.width : containerClosedWidth;
    const minWidth = this.props.isCollapsible ? containerClosedWidth : standardOpenWidth;
    return Math.max(
      minWidth,
      baselineWidth + this.state.resizeDelta
    );
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
      isCollapsible,
      isResizeable,
      isOpen,
      linkComponent,
      onCreateDrawerOpen,
      onResizeStart,
      onSearchDrawerOpen,
    } = this.props;

    const {
      isTogglingIsOpen,
      isResizing,
    } = this.state;

    // if the Navigation then:
    // 1. isOpen is ignored
    // 2. You cannot resize to a size smaller than the default open size

    const renderedWidth = this.getRenderedWidth();

    const isGlobalNavPartiallyCollapsed = isResizing &&
      renderedWidth < (globalOpenWidth + containerClosedWidth);

    // Cover over the global navigation when it is partially collapsed
    const containerOffsetX = isGlobalNavPartiallyCollapsed ?
      renderedWidth - (globalOpenWidth + containerClosedWidth) : 0;

    // always show global navigation if it is not collapsible
    const showGlobalNavigation = !isCollapsible || isOpen || isResizing;

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
        onResizeEnd={this.onResizeEnd}
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
