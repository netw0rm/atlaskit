import React, { PureComponent, PropTypes } from 'react';
import AkBlanket from 'ak-blanket';
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

export default class Navigation extends PureComponent {
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
    isResizeable: PropTypes.bool,
    isCollapsible: PropTypes.bool,
    globalPrimaryIcon: PropTypes.node,
    globalSearchIcon: PropTypes.node,
    globalCreateIcon: PropTypes.node,
    globalHelpIcon: PropTypes.node,
    globalAccountIcon: PropTypes.node,
    onHelpClicked: PropTypes.func,
    onAccountClicked: PropTypes.func,
    onBlanketClicked: PropTypes.func,
    hasBlanket: PropTypes.bool,
  };

  static defaultProps = {
    width: navigationOpenWidth,
    open: true,
    isCollapsible: true,
    isResizeable: true,
    onResize: () => {},
    isSearchDrawerOpen: false,
    isCreateDrawerOpen: false,
    onSearchDrawerActivated: () => {},
    onCreateDrawerActivated: () => {},
    onBlanketClicked: () => {},
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
    const minWidth = this.props.isCollapsible ? containerClosedWidth : navigationOpenWidth;
    return Math.max(
      minWidth,
      baselineWidth + this.state.resizeDelta
    );
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
    const { onSearchDrawerActivated, onCreateDrawerActivated, globalSearchIcon, globalCreateIcon,
      searchDrawerContent, createDrawerContent, containerHeader, children, isResizeable,
      globalPrimaryIcon, isSearchDrawerOpen, isCreateDrawerOpen,
      onHelpClicked, onAccountClicked, globalAccountIcon, globalHelpIcon,
      onBlanketClicked, hasBlanket } = this.props;

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
              primaryIcon={<GlobalItem size="large">{globalPrimaryIcon}</GlobalItem>}
              helpIcon={
                <GlobalItem size="small" onActivate={onHelpClicked}>
                  {globalHelpIcon}
                </GlobalItem>
              }
              accountIcon={
                <GlobalItem size="small" onActivate={onAccountClicked}>
                  {globalAccountIcon}
                </GlobalItem>
              }
            >
              <GlobalItem onActivate={onSearchDrawerActivated}>
                {globalSearchIcon}
              </GlobalItem>
              <GlobalItem onActivate={onCreateDrawerActivated}>
                {globalCreateIcon}
              </GlobalItem>
            </GlobalNavigation>
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
