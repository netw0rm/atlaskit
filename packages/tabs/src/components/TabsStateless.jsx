// @flow
/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';

import TabsNav from './TabsNav';
import { TabPane, Tabs } from '../styled';
import { ChildrenType, FunctionType } from '../types';

type Props = {
  /** Handler for navigation using the keyboard buttons. */
  onKeyboardNav: (string) => void,
  /** The tabs to display, with content being hidden unless the tab is selected. */
  tabs?: Array<{
    content?: ChildrenType,
    isSelected?: boolean,
    label: string,
    onSelect: FunctionType,
  }>
};

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
