import React, { Component } from 'react';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';

import DropdownList from '../../src';

const DroplistOverview = class extends Component {
  render() {
    return (<DropdownList
      isFitContainerWidthEnabled
      isOpen
      trigger={<div style={{ border: '1px solid black' }}>Click here!</div>}
    >
      <Group heading="Australia">
        <Item>Sydney</Item>
        <Item>Canberra</Item>
        <Item>Melbourne</Item>
      </Group>
    </DropdownList>);
  }
};

export default (
  <DroplistOverview />
);
