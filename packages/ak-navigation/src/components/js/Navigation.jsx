import React, { Component, PropTypes } from 'react';
import styles from 'style!../less/Navigation.less';
import GlobalNavigation from './GlobalNavigation';
import GlobalItem from './GlobalItem';
import ContainerNavigation from './ContainerNavigation';
import Drawer from './Drawer';
import Resizer from './Resizer';
import Spacer from './Spacer';
import {
  navigationOpenWidth,
  containerClosedWidth,
  resizeExpandedBreakpoint,
  resizeClosedBreakpoint,
} from '../../shared-variables';
import { getGlobalWidth, getContainerWidth } from '../../utils/collapse';

export default class Navigation extends Component {
  static propTypes = {
    searchDrawerContent: PropTypes.node,
    isSearchDrawerOpen: PropTypes.bool,
    onSearchDrawerActivated: PropTypes.func,
    createDrawerContent: PropTypes.node,
    isCreateDrawerOpen: PropTypes.bool,
    onCreateDrawerActivated: PropTypes.func,
    containerHeader: PropTypes.node,
    children: PropTypes.node,
    width: PropTypes.number,
    open: PropTypes.bool,
    onResize: PropTypes.func,
    globalNavigation: PropTypes.node,
    isResizeable: PropTypes.bool,
    globalPrimaryIcon: PropTypes.node,
    globalSearchIcon: PropTypes.node,
    globalCreateIcon: PropTypes.node,
  };

  static defaultProps = {
    width: navigationOpenWidth,
    open: true,
    isResizeable: true,
    onResize: () => {},
    isSearchDrawerOpen: false,
    isCreateDrawerOpen: false,
    onSearchDrawerActivated: () => {},
    onCreateDrawerActivated: () => {},
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
    const baselineWidth = this.props.open ? this.props.width : containerClosedWidth;
    return Math.max(containerClosedWidth, baselineWidth + this.state.resizeDelta);
  }

  triggerResizeHandler = () => {
    const width = this.getRenderedWidth();
    const resizeState = {
      open: (width > resizeClosedBreakpoint),
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
    const globalItemIfPropSet = (prop, onActivate) => {
      if (!prop) return null;
      return (
        <GlobalItem onActivate={onActivate}>
          {prop}
        </GlobalItem>
      );
    };

    const { onSearchDrawerActivated, onCreateDrawerActivated, globalSearchIcon, globalCreateIcon,
      searchDrawerContent, createDrawerContent, containerHeader, children, isResizeable,
      globalNavigation, globalPrimaryIcon, isSearchDrawerOpen, isCreateDrawerOpen } = this.props;

    const shouldAnimate = this.state.resizeDelta === 0;
    const renderedWidth = this.getRenderedWidth();
    return (
      <div className={styles.navigation}>
        <Spacer
          shouldAnimate={shouldAnimate}
          width={renderedWidth}
        />
        <div className={styles.navigationInner}>
          <div style={{ zIndex: 2 }}>
            {
              globalNavigation || (
                <GlobalNavigation
                  shouldAnimate={shouldAnimate}
                  width={getGlobalWidth(this.getRenderedWidth())}
                  primaryIcon={globalItemIfPropSet(globalPrimaryIcon)}
                >
                  {globalItemIfPropSet(globalSearchIcon, onSearchDrawerActivated)}
                  {globalItemIfPropSet(globalCreateIcon, onCreateDrawerActivated)}
                </GlobalNavigation>
              )
            }
          </div>
          <div style={{ zIndex: 1 }}>
            <Drawer open={isSearchDrawerOpen} wide>{searchDrawerContent}</Drawer>
            <Drawer open={isCreateDrawerOpen}>{createDrawerContent}</Drawer>
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
