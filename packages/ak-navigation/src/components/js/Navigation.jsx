import React, { PureComponent, PropTypes } from 'react';
import AkBlanket from 'ak-blanket';
import styles from 'style!../less/Navigation.less';
import GlobalNavigation from './GlobalNavigation';
import GlobalItem from './GlobalItem';
import ContainerNavigation from './ContainerNavigation';
import DefaultLinkComponent from './DefaultLinkComponent';
import Drawer from './Drawer';
import DrawerTrigger from './DrawerTrigger';
import Resizer from './Resizer';
import Spacer from './Spacer';
import {
  navigationOpenWidth,
  containerClosedWidth,
  resizeExpandedBreakpoint,
  resizeClosedBreakpoint,
} from '../../shared-variables';
import { getGlobalWidth, getContainerWidth } from '../../utils/collapse';

export default class Navigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    containerAppearance: PropTypes.string,
    containerHeader: PropTypes.node,
    createDrawerContent: PropTypes.node,
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
    onCreateDrawerActivated: PropTypes.func,
    onResize: PropTypes.func,
    onSearchDrawerActivated: PropTypes.func,
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
    onCreateDrawerActivated: () => {},
    onResize: () => {},
    onSearchDrawerActivated: () => {},
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
      globalAccountItem,
      globalCreateIcon,
      globalHelpItem,
      globalPrimaryIcon,
      globalPrimaryItemHref,
      globalSearchIcon,
      hasBlanket,
      isCreateDrawerOpen,
      isResizeable,
      isSearchDrawerOpen,
      linkComponent,
      onBlanketClicked,
      onCreateDrawerActivated,
      onSearchDrawerActivated,
      searchDrawerContent,
    } = this.props;

    const shouldAnimate = this.state.resizeDelta === 0;
    const renderedWidth = this.getRenderedWidth();
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
          <div>
            <GlobalNavigation
              accountItem={globalAccountItem}
              helpItem={globalHelpItem}
              linkComponent={linkComponent}
              primaryIcon={globalPrimaryIcon}
              primaryItemHref={globalPrimaryItemHref}
              shouldAnimate={shouldAnimate}
              width={getGlobalWidth(this.getRenderedWidth())}
            >
              <DrawerTrigger onActivate={onSearchDrawerActivated}>
                <GlobalItem isSelected={isSearchDrawerOpen} size="medium">
                  {globalSearchIcon}
                </GlobalItem>
              </DrawerTrigger>
              <DrawerTrigger onActivate={onCreateDrawerActivated}>
                <GlobalItem isSelected={isCreateDrawerOpen} size="medium">
                  {globalCreateIcon}
                </GlobalItem>
              </DrawerTrigger>
            </GlobalNavigation>
          </div>
          <div style={{ zIndex: 1 }}>
            <Drawer
              header={containerHeader}
              isOpen={isSearchDrawerOpen}
              isWide
              primaryIcon={globalPrimaryIcon}
            >
              {searchDrawerContent}
            </Drawer>
            <Drawer
              header={containerHeader}
              isOpen={isCreateDrawerOpen}
              primaryIcon={globalPrimaryIcon}
            >
              {createDrawerContent}
            </Drawer>
          </div>
          <div>
            <ContainerNavigation
              appearance={containerAppearance}
              header={containerHeader}
              shouldAnimate={shouldAnimate}
              width={getContainerWidth(renderedWidth)}
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
