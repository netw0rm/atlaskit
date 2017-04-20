import React, { PropTypes, PureComponent } from 'react';

import styles from './styles.less';
import TabPane from './internal/TabPane';
import TabsNav from './internal/TabsNav';

export default class Tabs extends PureComponent {
  static propTypes = {
    onKeyboardNav: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      isSelected: PropTypes.bool,
      label: PropTypes.node.isRequired,
      onSelect: PropTypes.func.isRequired,
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
      <div className={styles.akTabsRoot}>
        <TabsNav
          onKeyboardNav={this.props.onKeyboardNav}
          tabs={this.props.tabs}
        />
        {selectedTab}
      </div>
    );
  }
}
