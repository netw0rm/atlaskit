// @flow
// RB: TODO -> Fix flow errors in this file
import React, { Component } from 'react';
import memoizeOne from 'memoize-one';
import HeightDetector from './HeightDetector';
import OverflowDropdown from './NavigationOverflowDropdown';
import NavigationOverflowChildren from '../styled/NavigationOverflowChildren';
import { gridSize } from '../../shared-variables';
import type { ReactElement } from '../../types';

type State = {|
  maxChildToRender: number,
|}

type Props = {|
  children?: ReactElement,
|}

const buttonHeight = gridSize * 4;
const reservedGapHeight = gridSize * 4;

export default class NavigationOverflowHandler extends Component {
  constructor(props: Props, context: any) {
    super(props, context);
    this.availableHeight = 0;
    this.childHeights = [];
    this.state = { maxChildToRender: React.Children.count(props.children) - 1 };
  }

  state: State
  props: Props // eslint-disable-line react/sort-comp

  availableHeight: number
  childHeights: Array<number>

  handleAvailableHeight = (availableHeight: number) => {
    if (availableHeight === 0) {
      return;
    }

    const adjustedHeight = availableHeight - buttonHeight - reservedGapHeight;
    this.availableHeight = adjustedHeight;
    this.calculateMaxChildToRender();
  }

  handleChildHeight = (childIndex: number) => (childHeight: number) => {
    if (childHeight === 0) {
      return;
    }

    const newHeights = this.childHeights;
    if (childIndex > newHeights.length - 1) {
      newHeights.push(childHeight);
    } else {
      newHeights[childIndex] = childHeight;
    }
    this.childHeights = newHeights;
    this.calculateMaxChildToRender();
  }

  // Using the known height of the container area, and the known heights of each child
  // NavigationItem, finds the index of the last child that can fit without causing
  // scrollbars to appear.
  calculateMaxChildToRender = () => {
    const { children } = this.props;
    const { availableHeight, childHeights } = this;
    const childrenCount = React.Children.count(children);

    if (availableHeight === 0 || childrenCount !== childHeights.length) {
      this.setMaxChildToRender(childrenCount - 1);
      return;
    }
    let cumulativeHeight = 0;
    for (let i = 0; i < childHeights.length; i++) {
      cumulativeHeight += childHeights[i];
      if (cumulativeHeight > availableHeight) {
        this.setMaxChildToRender(i - 1);
        return;
      }
    }

    this.setMaxChildToRender(childrenCount - 1);
  }

  setMaxChildToRender = memoizeOne((maxChildToRender) => {
    this.setState({ maxChildToRender });
  })

  needsDropdown = () => React.Children.count(this.props.children) - 1 > this.state.maxChildToRender

  render() {
    const { children } = this.props;
    const { maxChildToRender } = this.state;

    const nonDropdownItems = React.Children.map(children, (child, childIndex) => (
      childIndex <= maxChildToRender ? (
        // $FlowFixMe
        <HeightDetector
          onHeightChange={this.handleChildHeight(childIndex)}
          shouldMeasureImmediately
        >
          {child}
        </HeightDetector>
      ) : null
    ));

    const dropdown = this.needsDropdown() ? (
      <OverflowDropdown>{
        React.Children.map(children, (child, childIndex) => (
          childIndex > maxChildToRender ? child : null
        ))
      }</OverflowDropdown>
    ) : null;

    return (
      // $FlowFixMe
      <HeightDetector
        onHeightChange={this.handleAvailableHeight}
        shouldDetectResize
        shouldFillHeight
      >
        <NavigationOverflowChildren>
          {nonDropdownItems}
          {dropdown}
        </NavigationOverflowChildren>
      </HeightDetector>
    );
  }
}
