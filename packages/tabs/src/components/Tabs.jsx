// @flow
/* eslint-disable react/sort-comp */
// TODO: fix flow errors
import React, { PureComponent } from 'react';
import TabsStateless from './TabsStateless';
import type { ChildrenType } from '../types';

type Props = {
  /** Handler for selecting a new tab. Called with the number of the tab, zero-indexed */
  onSelect?: (number) => void,
  /** The tabs to display, with content being hidden unless the tab is selected. */
  tabs: Array<{
    content?: ChildrenType,
    defaultSelected?: boolean,
    label: ChildrenType,
  }>,
};

export default class Tabs extends PureComponent {
  props: Props
  static defaultProps = {
    onSelect: () => {},
    tabs: [],
  }

  constructor(props: Props) {
    super(props);

    // Set the selected tab to the first tab with defaultSelected provided
    let defaultSelectedIndex = null;
    if (props) {
      for (let i = 0; i < props.tabs.length; i++) {
        if (props.tabs[i].defaultSelected) {
          defaultSelectedIndex = i;
          break;
        }
      }
    }
// $FlowFixMe
    this.state = {
      selectedTab: defaultSelectedIndex,
    };
  }

  getTabs = () => this.props.tabs.map((tab, index) => ({
    ...tab,
    // $FlowFixMe
    isSelected: index === this.state.selectedTab,
    onKeyboardNav: this.tabKeyboardNavHandler,
    onSelect: () => this.tabSelectHandler(index),
  }));

  tabSelectHandler = (selectedTabIndex: number) => {
    // $FlowFixMe
    this.props.onSelect(selectedTabIndex);
    // $FlowFixMe
    this.setState({ selectedTab: selectedTabIndex });
  }

  tabKeyboardNavHandler = (key: string) => {
    // Handle left and right arrow key presses by selecting the previous or next tab
    // $FlowFixMe
    const selectedIndex = this.state.selectedTab;
    if (selectedIndex !== null) {
      let nextIndex = selectedIndex;

      if (key === 'ArrowLeft') {
        nextIndex = selectedIndex - 1 < 0 ? 0 : selectedIndex - 1;
      } else if (key === 'ArrowRight') {
        nextIndex = selectedIndex + 1 > this.props.tabs.length - 1
          ? this.props.tabs.length - 1
          : selectedIndex + 1;
      }

      if (nextIndex !== selectedIndex) {
        this.tabSelectHandler(nextIndex);
      }
    }
  }

  render() {
    return (
      <TabsStateless
        onKeyboardNav={this.tabKeyboardNavHandler}
        tabs={this.getTabs()}
      />
    );
  }
}
