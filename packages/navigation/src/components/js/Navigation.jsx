import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GlobalNavigation from './GlobalNavigation';
import ContainerNavigation from './ContainerNavigation';
import NavigationFixedContainer from '../styled/NavigationFixedContainer';
import NavigationGlobalNavigationWrapper from '../styled/NavigationGlobalNavigationWrapper';
import NavigationContainerNavigationWrapper from '../styled/NavigationContainerNavigationWrapper';
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
import * as presets from '../../theme/presets';

const warnIfCollapsedPropsAreInvalid = ({ isCollapsible, isOpen }) => {
  if (!isCollapsible && !isOpen) {
    // eslint-disable-next-line no-console
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
    containerTheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    containerHeaderComponent: PropTypes.func,
    drawers: PropTypes.arrayOf(PropTypes.node),
    globalTheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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
    containerTheme: presets.container,
    drawers: [],
    globalTheme: presets.global,
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
      containerTheme,
      containerHeaderComponent,
      drawers,
      globalTheme,
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

    // if collapsed then:
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
      <NavigationGlobalNavigationWrapper>
        <GlobalNavigation
          theme={globalTheme}
          createIcon={globalCreateIcon}
          linkComponent={linkComponent}
          onCreateActivate={onCreateDrawerOpen}
          onSearchActivate={onSearchDrawerOpen}
          primaryIcon={globalPrimaryIcon}
          primaryItemHref={globalPrimaryItemHref}
          searchIcon={globalSearchIcon}
          secondaryActions={globalSecondaryActions}
        />
      </NavigationGlobalNavigationWrapper>
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
      <div>
        {/* Used to push the page to the right the width of the nav */}
        <Spacer
          shouldAnimate={shouldAnimateContainer}
          width={renderedWidth}
        >
          <NavigationFixedContainer>
            {globalNavigation}
            <NavigationContainerNavigationWrapper
              horizontalOffset={containerOffsetX}
            >
              <ContainerNavigation
                theme={containerTheme}
                showGlobalPrimaryActions={!showGlobalNavigation}
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
            </NavigationContainerNavigationWrapper>
            {resizer}
          </NavigationFixedContainer>
        </Spacer>
        {drawers}
      </div>
    );
  }
}
