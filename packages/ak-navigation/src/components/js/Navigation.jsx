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
  static get propTypes() {
    return {
      searchDrawerContent: PropTypes.node,
      createDrawerContent: PropTypes.node,
      containerHeader: PropTypes.node,
      children: PropTypes.node,
      width: PropTypes.number,
      open: PropTypes.bool,
      onResize: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      width: navigationOpenWidth,
      open: true,
      onResize: () => {},
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      resizeDelta: 0,
      searchOpen: false,
      createOpen: false,
    };
  }


  getRenderedWidth() {
    const baselineWidth = this.props.open ? this.props.width : containerClosedWidth;
    return Math.max(containerClosedWidth, baselineWidth + this.state.resizeDelta);
  }

  searchActivated() {
    this.setState({ createOpen: false, searchOpen: !this.state.searchOpen });
  }

  createActivated() {
    this.setState({ createOpen: !this.state.createOpen, searchOpen: false });
  }

  triggerResizeHandler() {
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
    const shouldAnimate = this.state.resizeDelta === 0;
    return (
      <div className={styles.navigation}>
        <Spacer
          shouldAnimate={shouldAnimate}
          width={this.getRenderedWidth()}
        />
        <style>{styles.toString()}</style>
        <div className={styles.navigationInner}>
          <div style={{ zIndex: 2 }}>
            <GlobalNavigation
              shouldAnimate={shouldAnimate}
              width={getGlobalWidth(this.getRenderedWidth())}
            >
              <GlobalItem>P</GlobalItem>
              <GlobalItem onActivate={() => this.searchActivated()}>S</GlobalItem>
              <GlobalItem onActivate={() => this.createActivated()}>C</GlobalItem>
            </GlobalNavigation>
          </div>
          <div style={{ zIndex: 1 }}>
            <Drawer open={this.state.searchOpen} wide>{this.props.searchDrawerContent}</Drawer>
            <Drawer open={this.state.createOpen}>{this.props.createDrawerContent}</Drawer>
          </div>
          <div>
            <ContainerNavigation
              shouldAnimate={shouldAnimate}
              width={getContainerWidth(this.getRenderedWidth())}
              header={this.props.containerHeader}
            >
              {this.props.children}
            </ContainerNavigation>
          </div>
          <Resizer
            onResize={(resizeDelta) => { this.setState({ resizeDelta }); }}
            onResizeEnd={() => { this.triggerResizeHandler(); }}
          />
        </div>
      </div>
    );
  }
}
