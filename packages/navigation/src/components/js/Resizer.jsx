import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components';
import rafSchedule from 'raf-schd';
import ResizerInner from '../styled/ResizerInner';
import ResizerButton from './ResizerButton';
import {
  globalOpenWidth,
  standardOpenWidth,
} from '../../shared-variables';
import { isElectronMac } from '../../theme/util';

type Props = {
  onResizeStart?: () => {},
  onResizeEnd?: (resizeDelta: number) => {},
  onResizeButton?: () => {},
  onResize?: (resizeDelta: number) => {},
  navigationWidth?: number,
  showResizeButton?: boolean,
  theme?: {},
}

class Resizer extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  static defaultProps = {
    onResizeStart: () => {},
    onResizeEnd: () => {},
    onResizeButton: () => {},
    onResize: () => {},
    navigationWidth: standardOpenWidth(false),
    showResizeButton: true,
    theme: {},
  }
  state = {
    startScreenX: 0,
    isHovering: false,
    isResizing: false,
  }

  scheduleResize = rafSchedule((delta) => {
    if (this.state.isResizing) {
      this.props.onResize(delta);
    }
  })

  mouseDownHandler = (e) => {
    e.preventDefault();
    if (!this.resizerNode || e.target !== this.resizerNode) {
      return;
    }

    if (this.state.isResizing) {
      // eslint-disable-next-line no-console
      console.error('attempting to start a resize when another is occurring');
      return;
    }

    this.setState({
      isResizing: true,
      startScreenX: e.screenX,
    });
    this.props.onResizeStart();
    window.addEventListener('mousemove', this.mouseMoveHandler);
    window.addEventListener('mouseup', this.mouseUpHandler);
  }

  mouseUpHandler = (e) => {
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('mouseup', this.mouseUpHandler);
    this.setState({
      isResizing: false,
    });
    this.props.onResizeEnd(e.screenX - this.state.startScreenX);
  }

  mouseMoveHandler = (e) => {
    this.scheduleResize(e.screenX - this.state.startScreenX);
  }

  mouseEnterHandler = () => {
    this.setState({
      isHovering: true,
    });
  }

  mouseLeaveHandler = () => {
    this.setState({
      isHovering: false,
    });
  }

  isElectronMac = () => isElectronMac(this.props.theme)

  isPointingRight = () =>
    this.props.navigationWidth < standardOpenWidth(this.isElectronMac())

  resizeButtonHandler = () => {
    const isElectron = this.isElectronMac();
    const { navigationWidth, onResizeButton } = this.props;
    const standardOpenWidthResult = standardOpenWidth(isElectron);
    const isExpanded = navigationWidth > standardOpenWidthResult;
    const isPointingRight = this.isPointingRight();

    if (isPointingRight || isExpanded) {
      onResizeButton({
        isOpen: true,
        width: standardOpenWidthResult,
      });
    } else {
      onResizeButton({
        isOpen: false,
        width: globalOpenWidth(isElectron),
      });
    }
  }

  render() {
    const resizerButton = this.props.showResizeButton ? (
      <ResizerButton
        isVisible={this.state.isHovering}
        isPointingRight={this.isPointingRight()}
        onClick={this.resizeButtonHandler}
      />
    ) : null;

    return (
      <ResizerInner
        innerRef={(resizerNode) => {
          this.resizerNode = resizerNode;
        }}
        onMouseDown={this.mouseDownHandler}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        {resizerButton}
      </ResizerInner>
    );
  }
}

// We use the isElectronMac theme value in Resizer's calculation methods, so need access to
// the theme props which withTheme provides.
export default withTheme(Resizer);
