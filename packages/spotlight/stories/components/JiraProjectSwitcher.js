import React, { PureComponent } from 'react';
import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import { AkContainerTitleDropdown } from '@atlaskit/navigation';
import NucleusIcon from '../components/NucleusIcon';

export default class JiraProjectSwitcher extends PureComponent {
  getContent = () => {
    const items = [
      'Project 1',
      'Project 2',
      'Project 3',
      'Project 4',
      'Project 5',
    ];

    return (
      <DropdownItemGroup title="Recent Projects">
        {
          items.map(item => <DropdownItem
            key={item}
            description="this is description"
            elemBefore={<div style={{ marginRight: 8 }}><NucleusIcon /></div>}
          >{item}</DropdownItem>)
        }
        <DropdownItem>View all projects</DropdownItem>
      </DropdownItemGroup>
    );
  }

  render() {
    return (
      <AkContainerTitleDropdown
        text="Project Switcher very long text"
        icon={<NucleusIcon />}
        subText="Software project"
      >
        {this.getContent()}
      </AkContainerTitleDropdown>
    );
  }
}
