import React, { PureComponent } from 'react';
import { TabsStateless } from '@atlaskit/tabs';
import { tabs } from './Example';

export default class TabsStatelessExample extends PureComponent {
  state = { tabs, selectedIndex: 0 }

  getTabs = () => this.state.tabs.map((tab, index) => ({
    ...tab,
    isSelected: index === this.state.selectedIndex,
    onKeyboardNav: this.handleKeyPress,
    onSelect: () => this.handleSelect(index),
  }));

  handleSelect = selectedIndex => this.setState({ selectedIndex })
  handleKeyPress = (key) => {
    const selectedIndex = this.state.selectedIndex;

    if (selectedIndex !== null) {
      let nextIndex = selectedIndex;

      if (key === 'ArrowLeft') {
        nextIndex = selectedIndex - 1 < 0 ? 0 : selectedIndex - 1;
      } else if (key === 'ArrowRight') {
        nextIndex = selectedIndex + 1 > this.state.tabs.length - 1
          ? this.state.tabs.length - 1
          : selectedIndex + 1;
      }

      if (nextIndex !== selectedIndex) {
        this.handleSelect(nextIndex);
      }
    }
  }

  render() {
    return (
      <TabsStateless
        tabs={this.getTabs()}
        onKeyboardNav={this.handleKeyPress}
      />
    );
  }
}
