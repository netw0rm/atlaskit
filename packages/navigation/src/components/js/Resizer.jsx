import React, { PureComponent, PropTypes } from 'react';
import styles from '../less/Resizer.less';
import ResizerButton from './ResizerButton';
import {
  navigationOpenWidth,
 } from '../../shared-variables';

export default class Resizer extends PureComponent {
  static propTypes = {
    onResizeStart: PropTypes.func,
    onResizeEnd: PropTypes.func,
    onResizeButton: PropTypes.func,
    onResize: PropTypes.func,
    navigationWidth: PropTypes.number,
  }
  static defaultProps = {
    onResizeStart: () => {},
    onResizeEnd: () => {},
    onResizeButton: () => {},
    onResize: () => {},
    navigationWidth: navigationOpenWidth,
  }
  constructor(props) {
    super(props);
    this.state = {
      startScreenX: 0,
      isHovering: false,
      isResizing: false,
    };
  }
  mouseDownHandler = (e) => {
    e.preventDefault();
    if (!this.resizerNode || e.target !== this.resizerNode) {
      return;
    }
    this.props.onResizeStart();
    this.setState({
      startScreenX: e.screenX,
    });
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  }

  mouseUpHandler = (e) => {
    this.props.onResizeEnd(e.screenX - this.state.startScreenX);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  mouseMoveHandler = (e) => {
    this.props.onResize(e.screenX - this.state.startScreenX);
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

  isPointingRight = () => this.props.navigationWidth < navigationOpenWidth

  resizeButtonHandler = () => {
    const isExpanded = (this.props.navigationWidth > navigationOpenWidth);
    const isPointingRight = this.isPointingRight();

    if (isPointingRight || isExpanded) {
      this.props.onResizeButton({
        isOpen: true,
        width: navigationOpenWidth,
      });
    } else {
      this.props.onResizeButton({
        isOpen: false,
      });
    }
  }

  render() {
    return (
      <div
        ref={(resizerNode) => {
          this.resizerNode = resizerNode;
        }}
        className={styles.resizer}
        onMouseDown={this.mouseDownHandler}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <ResizerButton
          isVisible={this.state.isHovering}
          isPointingRight={this.isPointingRight()}
          onClick={this.resizeButtonHandler}
        />
      </div>
    );
  }
}
