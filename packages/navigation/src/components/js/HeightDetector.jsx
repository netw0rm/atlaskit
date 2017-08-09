// @flow

import React, { Component } from 'react';
import memoizeOne from 'memoize-one';
import rafScheduler from 'raf-schd';
import { HeightDetectorRoot, HeightDetectorResizeAware } from '../styled/HeightDetector';
import type { ReactElement } from '../../types';

type Props = {|
  children?: ReactElement,
  onHeightChange: Function,
  shouldMeasureImmediately?: bool,
  shouldDetectResize?: bool,
  shouldFillHeight?: bool,
|}

export default class HeightDetector extends Component {
  static defaultProps = {
    onHeightChange: () => {},
  }

  constructor(props: Props, context: mixed) {
    super(props, context);

    if (!props.shouldMeasureImmediately) {
      this.measureHeight = rafScheduler(this.measureHeight);
    }
  }

  componentDidMount() {
    this.measureHeight();
  }

  componentDidUpdate() {
    this.measureHeight();
  }

  nodeToMeasure: ?HTMLElement

  handleRef = (ref: HTMLElement) => {
    this.nodeToMeasure = ref;
  }

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
              onResize={this.measureHeight}
            >
              {children}
            </HeightDetectorResizeAware>
          ) : children
        }
      </HeightDetectorRoot>
    );
  }
}
