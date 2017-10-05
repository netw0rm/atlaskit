// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rafSchedule from 'raf-schd';

// Need to make outer div full height in case consumer wants to align
// child content vertically center. These styles can be overridden by the
// product using the optional SizeDetector.containerStyle prop.
const containerDivStyle = {
  height: '100%',
  flex: '1 0 auto',
  position: 'relative',
};

// Not using styled-components here for performance
// and framework-agnostic reasons.
const objectStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1,
};

export default class SizeDetector extends Component {
  static propTypes = {
    /** Function that accepts an object parameter containing 'height' and 'width' properties */
    children: PropTypes.func.isRequired,
    /** Optional styles object to be applied to the containing element */
    containerStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = { // eslint-disable-line react/sort-comp
    containerStyle: {},
  };

  state = {}
  rafFrame: number; // eslint-disable-line react/sort-comp
  container: ?HTMLDivElement;
  resizeObjectDocument: ?window;
  resizeObject: ?HTMLElement;

  queueSizeDetect = () => {
    this.rafFrame = this.handleResize();
  }

  handleResize = rafSchedule(() => {
    const { container } = this;
    if (!container) {
      return;
    }

    this.setState({
      sizeMetrics: {
        width: container.offsetWidth,
        height: container.offsetHeight,
      },
    });
  })

  componentDidMount() {
    if (this.resizeObject) {
      // $FlowFixMe - resizeObject is HTMLElement which doesn't contain .data prop
      this.resizeObject.data = 'about:blank';
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafFrame);
    if (this.resizeObjectDocument) {
      this.resizeObjectDocument.removeEventListener('resize', this.queueSizeDetect);
    }
  }

  handleContainerRef = (ref: ?HTMLDivElement) => {
    if (!ref) {
      return;
    }
    this.container = ref;
    this.queueSizeDetect();
  }

  handleObjectRef = (ref: ?HTMLElement) => {
    if (!ref) {
      return;
    }
    this.resizeObject = ref;
  };

  handleObjectLoad = () => {
    if (!this.resizeObject) {
      return;
    }

    // $FlowFixMe - resizeObject is typed as HTMLElement which has no contentDocument prop
    this.resizeObjectDocument = this.resizeObject.contentDocument.defaultView;
    this.resizeObjectDocument.addEventListener('resize', this.queueSizeDetect);
  }

  renderChildren = () => {
    const { sizeMetrics } = this.state;
    if (!sizeMetrics) {
      return null;
    }
    return this.props.children(sizeMetrics);
  }

  render() {
    return (
      <div
        style={{ ...containerDivStyle, ...this.props.containerStyle }}
        ref={this.handleContainerRef}
      >
        <object
          type="text/html"
          style={objectStyle}
          ref={this.handleObjectRef}
          onLoad={this.handleObjectLoad}
          aria-hidden
          tabIndex={-1}
        />
        {this.renderChildren()}
      </div>
    );
  }
}
