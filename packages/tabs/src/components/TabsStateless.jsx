// @flow
/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';

import TabsNav from './TabsNav';
import { TabPane, Tabs } from '../styled';
import { Props } from '../types';

export default class TabsStateless extends PureComponent {
  props: Props
  static defaultProps = { tabs: [] }

  render() {
    const { onKeyboardNav, tabs } = this.props;
    const selectedTabs = tabs.filter(tab => tab.isSelected);
    const selectedTab = selectedTabs.length ? (
      <TabPane role="tabpanel">
        {selectedTabs[0].content}
      </TabPane>
    ) : null;

    return (
      <Tabs>
        <TabsNav onKeyboardNav={onKeyboardNav} tabs={tabs} />
        {selectedTab}
      </Tabs>
    );
  }
}
