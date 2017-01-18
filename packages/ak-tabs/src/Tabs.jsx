import React, { PropTypes, PureComponent } from 'react';

import 'style!./styles.less';
import TabPane from './internal/TabPane';
import TabsNav from './internal/TabsNav';

export default class Tabs extends PureComponent {
  static propTypes = {
    onKeyboardNav: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      label: PropTypes.node.isRequired,
      onKeyboardNav: PropTypes.func.isRequired,
      onSelect: PropTypes.func.isRequired,
      isSelected: PropTypes.bool,
    })),
  }

  static defaultProps = {
    tabs: [],
  }

  render() {
    const selectedTabs = this.props.tabs.filter(tab => tab.isSelected);
    const selectedTab = selectedTabs.length ? (
      <TabPane isSelected={selectedTabs[0].isSelected}>
        {selectedTabs[0].content}
      </TabPane>
    ) : null;

    return (
      <div>
        <TabsNav
          onKeyboardNav={this.props.onKeyboardNav}
          tabs={this.props.tabs}
        />
        {selectedTab}
      </div>
    );
  }
}
