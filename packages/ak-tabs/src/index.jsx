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
    for (let i = 0; i < props.tabs.length; i++) {
      if (props.tabs[i].defaultSelected) {
        defaultSelectedIndex = i;
        break;
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
      onSelect: () => this.tabSelectHandler(index),
    },
  }));

  tabSelectHandler = index => this.setState({ selectedTab: index })

  render() {
    return (
      <StatelessTabs tabs={this.getTabs()} />
    );
  }
}
