// @flow
/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';
import TabsStateless from './TabsStateless';
import type { ChildrenType } from '../types';

type Props = {
  /** Handler for selecting a new tab. Called with the number of the tab, zero-indexed */
  onSelect: (number) => void,
  /** The tabs to display, with content being hidden unless the tab is selected. */
  tabs: Array<{
    content?: ChildrenType,
    defaultSelected?: boolean,
    selectedTab?: boolean,
    label: ChildrenType,
  }>,
};
type State = {|
  selectedIndex?: number
  |}

export default class Tabs extends PureComponent {
  props: Props
  state: State
  static defaultProps = {
    onSelect: () => {},
    tabs: [],
  }

  componentDidMount() {
    const { tabs } = this.props;

    if (!tabs || !tabs.length) return;

    let selectedIndex = 0;

    // Set the selected tab to the first tab with defaultSelected provided

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].defaultSelected) {
        selectedIndex = i;
        break;
      }
    }

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ selectedIndex });
  }

  getTabs = () => this.props.tabs.map((tab, index) => ({
    ...tab,
    isSelected: index === this.state.selectedIndex,
    onKeyboardNav: this.tabKeyboardNavHandler,
    onSelect: () => this.tabSelectHandler(index),
  }));

  tabSelectHandler = (selectedIndex: number) => {
    this.props.onSelect(selectedIndex);
    this.setState({ selectedIndex });
  }

  tabKeyboardNavHandler = (key: string) => {
    // Handle left and right arrow key presses by selecting the previous or next tab
    const selectedIndex = this.state.selectedIndex || 0;
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
