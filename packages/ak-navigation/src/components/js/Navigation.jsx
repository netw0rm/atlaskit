import React, { PureComponent, PropTypes } from 'react';
import AkBlanket from 'ak-blanket';
import styles from 'style!../less/Navigation.less';
import GlobalNavigation from './GlobalNavigation';
import GlobalItem from './GlobalItem';
import ContainerNavigation from './ContainerNavigation';
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
    containerHeader: PropTypes.node,
    createDrawerContent: PropTypes.node,
    globalAccountItem: PropTypes.node,
    globalCreateIcon: PropTypes.node,
    globalHelpItem: PropTypes.node,
    globalPrimaryItem: PropTypes.node,
    globalSearchIcon: PropTypes.node,
    hasBlanket: PropTypes.bool,
    isCollapsible: PropTypes.bool,
    isCreateDrawerOpen: PropTypes.bool,
    isOpen: PropTypes.bool,
    isResizeable: PropTypes.bool,
    isSearchDrawerOpen: PropTypes.bool,
    onBlanketClicked: PropTypes.func,
    onCreateDrawerActivated: PropTypes.func,
    onResize: PropTypes.func,
    onSearchDrawerActivated: PropTypes.func,
    searchDrawerContent: PropTypes.node,
    width: PropTypes.number,
  };

  static defaultProps = {
    globalAccountDropdownComponent: ({ children }) => children,
    globalHelpDropdownComponent: ({ children }) => children,
    isCollapsible: true,
    isCreateDrawerOpen: false,
    isOpen: true,
    isResizeable: true,
    isSearchDrawerOpen: false,
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
    this.props.onResize(resizeState);
    this.setState({
      resizeDelta: 0,
    });
  }

  render() {
    const {
      children,
      containerHeader,
      createDrawerContent,
      globalAccountItem,
      globalCreateIcon,
      globalHelpItem,
      globalPrimaryItem,
      globalSearchIcon,
      hasBlanket,
      isCreateDrawerOpen,
      isResizeable,
      isSearchDrawerOpen,
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
          <div style={{ zIndex: 2 }}>
            <GlobalNavigation
              shouldAnimate={shouldAnimate}
              width={getGlobalWidth(this.getRenderedWidth())}
              primaryItem={globalPrimaryItem}
              helpItem={globalHelpItem}
              accountItem={globalAccountItem}
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
            <Drawer isOpen={isSearchDrawerOpen} isWide>{searchDrawerContent}</Drawer>
            <Drawer isOpen={isCreateDrawerOpen}>{createDrawerContent}</Drawer>
          </div>
          <div>
            <ContainerNavigation
              shouldAnimate={shouldAnimate}
              width={getContainerWidth(renderedWidth)}
              header={containerHeader}
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
