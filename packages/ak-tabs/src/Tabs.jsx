import React, { PropTypes, PureComponent } from 'react';

import 'style!./styles.less';
import Tab from './internal/Tab';
import TabsNav from './internal/TabsNav';

export default class Tabs extends PureComponent {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      label: PropTypes.node.isRequired,
      onSelect: PropTypes.func.isRequired,
      isSelected: PropTypes.bool,
    })),
  }

  static defaultProps = {
    tabs: [],
  }

  render() {
    const selectedTabs = this.props.tabs.filter(tab => tab.isSelected);
    const selectedTab = selectedTabs.length ?
      (<Tab
        isSelected={selectedTabs[0].isSelected}
      >
        {selectedTabs[0].content}
      </Tab>) : null;

    return (
      <div>
        <TabsNav tabs={this.props.tabs} />
        {selectedTab}
      </div>
    );
  }
}
