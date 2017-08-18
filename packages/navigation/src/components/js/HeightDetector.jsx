// @flow
import React, { Component } from 'react';
import memoizeOne from 'memoize-one';
import rafScheduler from 'raf-schd';
import { HeightDetectorRoot, HeightDetectorResizeAware } from '../styled/HeightDetector';
import type { ReactElement } from '../../types';

type Props = {|
  children?: ReactElement,
  onHeightChange: (number) => void,
  shouldDetectResize?: bool,
  shouldFillHeight?: bool,
|}

export default class HeightDetector extends Component {
  static defaultProps = {
    onHeightChange: () => {},
  }

  constructor(props: Props, context: mixed) {
    super(props, context);

    // If we are detecting resize of the root component, we use requestAnimationFrame to
    // debounce the events for improved performance.
    if (props.shouldDetectResize) {
      this.measureHeight = rafScheduler(this.measureHeight);
    }
  }

  componentDidMount() {
    this.triggerMeasureHeight();
  }

  componentDidUpdate() {
    this.triggerMeasureHeight();
  }

  componentWillUnmount() {
    if (this.measureFrameId) {
      window.cancelAnimationFrame(this.measureFrameId);
    }
  }

  measureFrameId: ?number;

  triggerMeasureHeight = () => {
    this.measureFrameId = this.measureHeight();
  }

  nodeToMeasure: ?HTMLElement

  handleRef = (ref: HTMLElement) => {
    this.nodeToMeasure = ref;
  }

  // Instead of calling this directly, call triggerMeasureHeight to ensure that the generated
  // animation frame id is stored and eventually cancelled.
  measureHeight = () => {
    const { nodeToMeasure } = this;
    if (nodeToMeasure) {
      const height = nodeToMeasure.clientHeight;
      this.heightChanged(height);
    }
  }

  props: Props

  heightChanged = memoizeOne(this.props.onHeightChange)

  render() {
    const { children, shouldDetectResize, shouldFillHeight } = this.props;
    return (
      <HeightDetectorRoot
        innerRef={this.handleRef}
        shouldFillHeight={shouldFillHeight}
      >
        {
          shouldDetectResize ? (
            <HeightDetectorResizeAware
              onlyEvent
              onResize={this.triggerMeasureHeight}
            >
              {children}
            </HeightDetectorResizeAware>
          ) : children
        }
      </HeightDetectorRoot>
    );
  }
}
