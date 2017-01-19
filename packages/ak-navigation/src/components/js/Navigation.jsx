import React, { PureComponent, PropTypes } from 'react';
import AkBlanket from 'ak-blanket';
import styles from 'style!../less/Navigation.less';
import GlobalNavigation from './GlobalNavigation';
import ContainerNavigation from './ContainerNavigation';
import DefaultLinkComponent from './DefaultLinkComponent';
import Drawer from './Drawer';
import Resizer from './Resizer';
import Spacer from './Spacer';
import {
  containerClosedWidth,
  globalOpenWidth,
  navigationOpenWidth,
  resizeClosedBreakpoint,
  resizeExpandedBreakpoint,
} from '../../shared-variables';
import getContainerWidth from '../../utils/collapse';

export default class Navigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    containerAppearance: PropTypes.string,
    containerHeader: PropTypes.node,
    createDrawerContent: PropTypes.node,
    drawerBackIcon: PropTypes.node,
    globalAccountItem: PropTypes.node,
    globalCreateIcon: PropTypes.node,
    globalHelpItem: PropTypes.node,
    globalPrimaryIcon: PropTypes.node,
    globalPrimaryItemHref: PropTypes.string,
    globalSearchIcon: PropTypes.node,
    hasBlanket: PropTypes.bool,
    isCollapsible: PropTypes.bool,
    isCreateDrawerOpen: PropTypes.bool,
    isOpen: PropTypes.bool,
    isResizeable: PropTypes.bool,
    isSearchDrawerOpen: PropTypes.bool,
    linkComponent: PropTypes.func,
    onBlanketClicked: PropTypes.func,
    onCreateDrawerClose: PropTypes.func,
    onCreateDrawerOpen: PropTypes.func,
    onResize: PropTypes.func,
    onSearchDrawerClose: PropTypes.func,
    onSearchDrawerOpen: PropTypes.func,
    searchDrawerContent: PropTypes.node,
    width: PropTypes.number,
  };

  static defaultProps = {
    containerAppearance: 'default',
    globalAccountDropdownComponent: ({ children }) => children,
    globalHelpDropdownComponent: ({ children }) => children,
    isCollapsible: true,
    isCreateDrawerOpen: false,
    isOpen: true,
    isResizeable: true,
    isSearchDrawerOpen: false,
    linkComponent: DefaultLinkComponent,
    onBlanketClicked: () => {},
    onCreateDrawerClose: () => {},
    onCreateDrawerOpen: () => {},
    onResize: () => {},
    onSearchDrawerClose: () => {},
    onSearchDrawerOpen: () => {},
    width: navigationOpenWidth,
  };

  constructor(props) {
    super(props);
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
    const resizeState = {
      isOpen: (width > resizeClosedBreakpoint),
    };
    if (width > resizeExpandedBreakpoint) {
      resizeState.width = width;
    }
    this.setState({
      resizeDelta: 0,
    }, function callOnResizeAfterSetState() {
      this.props.onResize(resizeState);
    });
  }

  render() {
    const {
      children,
      containerAppearance,
      containerHeader,
      createDrawerContent,
      drawerBackIcon,
      globalAccountItem,
      globalCreateIcon,
      globalHelpItem,
      globalPrimaryIcon,
      globalPrimaryItemHref,
      globalSearchIcon,
      hasBlanket,
      isCreateDrawerOpen,
      isOpen,
      isResizeable,
      isSearchDrawerOpen,
      linkComponent,
      onBlanketClicked,
      onCreateDrawerClose,
      onCreateDrawerOpen,
      onSearchDrawerClose,
      onSearchDrawerOpen,
      searchDrawerContent,
    } = this.props;

    const shouldAnimate = this.state.resizeDelta === 0;
    const renderedWidth = this.getRenderedWidth();
    const isPartiallyCollapsed = renderedWidth < globalOpenWidth + containerClosedWidth;
    const onSearchDrawerTrigger = isSearchDrawerOpen ? onSearchDrawerClose : onSearchDrawerOpen;
    const onCreateDrawerTrigger = isCreateDrawerOpen ? onCreateDrawerClose : onCreateDrawerOpen;
    return (
      <div className={styles.navigation}>
        {
          hasBlanket && (isSearchDrawerOpen || isCreateDrawerOpen) ?
          (
            <AkBlanket isTinted onBlanketClicked={onBlanketClicked} />
          )
          : null
        }
        <Spacer
          shouldAnimate={shouldAnimate}
          width={renderedWidth}
        />
        <div className={styles.navigationInner}>
          <div style={{ zIndex: isPartiallyCollapsed ? false : 1 }}>
            <GlobalNavigation
              accountItem={globalAccountItem}
              helpItem={globalHelpItem}
              linkComponent={linkComponent}
              primaryIcon={globalPrimaryIcon}
              primaryItemHref={globalPrimaryItemHref}
              searchIcon={globalSearchIcon}
              onSearchActivate={onSearchDrawerTrigger}
              onCreateActivate={onCreateDrawerTrigger}
              createIcon={globalCreateIcon}
              shouldAnimate={shouldAnimate}
            />
          </div>
          <div style={{ zIndex: 2 }}>
            <Drawer
              backIcon={drawerBackIcon}
              backIconPosition="search"
              isOpen={isSearchDrawerOpen}
              isWide
              onBackButton={onSearchDrawerClose}
              primaryIcon={globalPrimaryIcon}
            >
              {searchDrawerContent}
            </Drawer>
            <Drawer
              backIcon={drawerBackIcon}
              backIconPosition="create"
              header={containerHeader}
              isOpen={isCreateDrawerOpen}
              onBackButton={onCreateDrawerClose}
              primaryIcon={globalPrimaryIcon}
            >
              {createDrawerContent}
            </Drawer>
          </div>
          <div>
            <ContainerNavigation
              appearance={containerAppearance}
              areGlobalActionsVisible={!isOpen && (this.state.resizeDelta <= 0)}
              globalPrimaryIcon={globalPrimaryIcon}
              header={containerHeader}
              linkComponent={linkComponent}
              offsetX={Math.min(renderedWidth - (globalOpenWidth + containerClosedWidth), 0)}
              shouldAnimate={shouldAnimate}
              width={getContainerWidth(renderedWidth)}
              globalPrimaryItemHref={globalPrimaryItemHref}
              globalCreateIcon={globalCreateIcon}
              globalSearchIcon={globalSearchIcon}
              onGlobalCreateActivate={onCreateDrawerTrigger}
              onGlobalSearchActivate={onSearchDrawerTrigger}
            >
              {children}
            </ContainerNavigation>
          </div>
          {
            isResizeable
            ? <Resizer
              onResize={this.onResize}
              onResizeEnd={this.triggerResizeHandler}
            />
            : null
          }
        </div>
      </div>
    );
  }
}
