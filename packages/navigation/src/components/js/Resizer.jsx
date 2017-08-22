import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import rafSchedule from 'raf-schd';
import ResizerInner from '../styled/ResizerInner';
import ResizerButton from './ResizerButton';
import {
  globalOpenWidth,
  standardOpenWidth,
} from '../../shared-variables';

export default class Resizer extends PureComponent {
  static propTypes = {
    onResizeStart: PropTypes.func,
    onResizeEnd: PropTypes.func,
    onResizeButton: PropTypes.func,
    onResize: PropTypes.func,
    navigationWidth: PropTypes.number,
    showResizeButton: PropTypes.bool,
  }
  static defaultProps = {
    onResizeStart: () => {},
    onResizeEnd: () => {},
    onResizeButton: () => {},
    onResize: () => {},
    navigationWidth: standardOpenWidth,
    showResizeButton: true,
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

  isPointingRight = () => this.props.navigationWidth < standardOpenWidth

  resizeButtonHandler = () => {
    const isExpanded = (this.props.navigationWidth > standardOpenWidth);
    const isPointingRight = this.isPointingRight();

    if (isPointingRight || isExpanded) {
      this.props.onResizeButton({
        isOpen: true,
        width: standardOpenWidth,
      });
    } else {
      this.props.onResizeButton({
        isOpen: false,
        width: globalOpenWidth,
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
