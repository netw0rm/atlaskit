import React, { PropTypes, PureComponent } from 'react';
import StatelessTabs from './Tabs';

export { StatelessTabs };

export default class Tabs extends PureComponent {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      label: PropTypes.node.isRequired,
      defaultSelected: PropTypes.bool,
    })),
  }

  static defaultProps = {
    tabs: [],
  }

  constructor(props) {
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

    this.state = {
      selectedTab: defaultSelectedIndex,
    };
  }

  getTabs = () => this.props.tabs.map((tab, index) => ({
    ...tab,
    ...{
      isSelected: index === this.state.selectedTab,
      onKeyboardNav: this.tabKeyboardNavHandler,
      onSelect: () => this.tabSelectHandler(index),
    },
  }));

  tabSelectHandler = index => this.setState({ selectedTab: index })

  tabKeyboardNavHandler = (key) => {
    // Handle left and right arrow key presses by selecting the previous or next tab
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
        this.setState({ selectedTab: nextIndex });
      }
    }
  }

  render() {
    return (
      <StatelessTabs
        onKeyboardNav={this.tabKeyboardNavHandler}
        tabs={this.getTabs()}
      />
    );
  }
}
