// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rafSchedule from 'raf-schd';
import { containerDivStyle, objectStyle } from './styles';

export default class SizeDetector extends Component {
  static propTypes = {
    /** Function that accepts an object parameter containing 'height' and 'width' properties */
    children: PropTypes.func.isRequired,
    /** Optional styles object to be applied to the containing element */
    outerStyles: {},
  }

  static defaultProps = { // eslint-disable-line react/sort-comp
    outerStyles: {},
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
        style={{ ...containerDivStyle, ...this.props.outerStyles }}
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

