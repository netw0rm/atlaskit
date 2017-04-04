import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/Navigation.less';
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
import getContainerWidth from '../../utils/collapse';

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
    onCreateDrawerOpen: () => {},
    onResize: () => {},
    onResizeStart: () => {},
    onSearchDrawerOpen: () => {},
    width: navigationOpenWidth,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      resizeDelta: 0,
    };
  }

  onResize = (resizeDelta) => {
    this.setState({ resizeDelta });
  }

  getRenderedWidth = () => {
    const baselineWidth = this.props.isOpen ? this.props.width : containerClosedWidth;
    const minWidth = this.props.isCollapsible ? containerClosedWidth : navigationOpenWidth;
    return Math.max(
      minWidth,
      baselineWidth + this.state.resizeDelta
    );
  }

  triggerResizeHandler = () => {
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

  isCollapsed() {
    const {
      isCollapsible,
      isOpen,
    } = this.props;

    if (!isCollapsible) {
      return false;
    }

    return !isOpen && (this.state.resizeDelta <= 0);
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
      linkComponent,
      onCreateDrawerOpen,
      onResizeStart,
      onSearchDrawerOpen,
    } = this.props;

    const shouldAnimate = this.state.resizeDelta === 0;
    const renderedWidth = this.getRenderedWidth();
    const isPartiallyCollapsed = renderedWidth < globalOpenWidth + containerClosedWidth;
    return (
      <div className={styles.navigation}>
        <Spacer
          shouldAnimate={shouldAnimate}
          width={renderedWidth}
        />
        <div className={styles.navigationInner}>
          <div style={{ zIndex: isPartiallyCollapsed ? false : 1 }}>
            <GlobalNavigation
              appearance={globalAppearance}
              createIcon={globalCreateIcon}
              linkComponent={linkComponent}
              onCreateActivate={onCreateDrawerOpen}
              onSearchActivate={onSearchDrawerOpen}
              primaryIcon={globalPrimaryIcon}
              primaryItemHref={globalPrimaryItemHref}
              searchIcon={globalSearchIcon}
              shouldAnimate={shouldAnimate}
              secondaryActions={globalSecondaryActions}
            />
          </div>
          <div style={{ zIndex: 2, position: 'relative' }}>
            {drawers}
          </div>
          <div>
            <ContainerNavigation
              appearance={containerAppearance}
              areGlobalActionsVisible={this.isCollapsed()}
              globalCreateIcon={globalCreateIcon}
              globalPrimaryIcon={globalPrimaryIcon}
              globalPrimaryItemHref={globalPrimaryItemHref}
              globalSearchIcon={globalSearchIcon}
              headerComponent={containerHeaderComponent}
              linkComponent={linkComponent}
              offsetX={Math.min(renderedWidth - (globalOpenWidth + containerClosedWidth), 0)}
              onGlobalCreateActivate={onCreateDrawerOpen}
              onGlobalSearchActivate={onSearchDrawerOpen}
              shouldAnimate={shouldAnimate}
              width={getContainerWidth(renderedWidth)}
            >
              {children}
            </ContainerNavigation>
          </div>
          {
            isResizeable
              ? <Resizer
                navigationWidth={renderedWidth}
                onResize={this.onResize}
                onResizeButton={this.triggerResizeButtonHandler}
                onResizeStart={onResizeStart}
                onResizeEnd={this.triggerResizeHandler}
              />
              : null
          }
        </div>
      </div>
    );
  }
}
