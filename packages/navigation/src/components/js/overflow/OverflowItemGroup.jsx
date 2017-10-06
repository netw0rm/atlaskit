// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  overflowManagerNamespace,
  overflowGroupNamespace,
  shouldReportItemHeight,
} from './shared-variables';
import type { ReactElement } from '../../../types';

type Props = {
  overflowGroupIndex: number,
  itemCount: number,
  children: ReactElement,
}

export default class OverflowItemGroup extends Component {
  props: Props // eslint-disable-line react/sort-comp
  rootNode: ?HTMLElement
  heights: []

  static childContextTypes = {
    [overflowGroupNamespace]: PropTypes.object,
  }

  static contextTypes = {
    [overflowManagerNamespace]: PropTypes.object,
    [shouldReportItemHeight]: PropTypes.bool,
  }

  constructor(props: Props) {
    super(props);

    this.heights = new Array(this.props.itemCount);
  }

  isInNavigation = () => !!this.context[shouldReportItemHeight]

  shouldRender = () => {
    const { overflowGroupIndex } = this.props;
    if (this.isInNavigation()) {
      return this.context[overflowManagerNamespace].isGroupVisibleInNav(overflowGroupIndex);
    }
    return this.context[overflowManagerNamespace].isGroupVisibleInDropdown(overflowGroupIndex);
  };

  shouldRenderItem = (overflowItemIndex: number) => {
    if (this.isInNavigation()) {
      return this.context[overflowManagerNamespace].isGroupItemVisibleInNav(
        this.props.overflowGroupIndex,
        overflowItemIndex
      );
    }
    return this.context[overflowManagerNamespace].isGroupItemVisibleInDropdown(
      this.props.overflowGroupIndex,
      overflowItemIndex
    );
  }

  hasAllItemHeights = () => {
    // Note: we can't use a simple this.heights.length check here because it always equals
    // props.itemCount; We also can't use .filter() because that skips any undefined items.
    for (let i = 0; i < this.heights.length; i++) {
      if (typeof this.heights[i] === 'undefined') {
        return false;
      }
    }
    return true;
  }

  combinedItemHeights = () =>
    this.heights.reduce((sum, value, i) => (
      sum + (this.shouldRenderItem(i) ? value : 0)
    ), 0)

  nonItemHeight = () => this.groupHeight() - this.combinedItemHeights();

  groupHeight = () => (this.rootNode ? this.rootNode.clientHeight : 0);

  reportHeightsToOverflowManager = () => {
    if (!this.isInNavigation() || !this.rootNode || !this.hasAllItemHeights()) {
      return;
    }
    this.context[overflowManagerNamespace].reportGroupHeightToManager({
      groupIndex: this.props.overflowGroupIndex,
      itemHeights: this.heights,
      nonItemHeight: this.nonItemHeight(),
    });
  }

  handleItemHeightReport = (overflowItemIndex: number, height: number) => {
    this.heights[overflowItemIndex] = height;
    this.reportHeightsToOverflowManager();
  }

  getChildContext() {
    return {
      [overflowGroupNamespace]: {
        reportItemHeightToGroup: this.handleItemHeightReport,
        shouldRenderItem: this.shouldRenderItem,
      },
    };
  }

  handleRootNodeRef = (ref?: HTMLElement) => {
    this.rootNode = ref;
    this.reportHeightsToOverflowManager();
  }

  render() {
    if (!this.shouldRender()) {
      return null;
    }

    if (this.context[shouldReportItemHeight]) {
      return (
        <div ref={this.handleRootNodeRef}>
          {this.props.children}
        </div>
      );
    }

    return this.props.children;
  }
}
