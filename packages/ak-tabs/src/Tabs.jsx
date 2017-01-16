import React, { PropTypes, PureComponent } from 'react';

import Tab from './Tab';
import TabsNav from './internal/TabsNav';

export default class Tabs extends PureComponent {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.instanceOf(Tab)),
  }

  static defaultProps = {
    tabs: [],
  }

  render() {
    const selectedTabs = this.props.tabs.filter(tab => tab.props.selected);
    const selectedTab = selectedTabs && selectedTabs[0];
    return (
      <div>
        <TabsNav tabs={this.props.tabs} />
        {selectedTab}
      </div>
    );
  }
}
