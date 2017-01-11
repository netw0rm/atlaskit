import React, { Component } from 'react';
import Group from 'ak-droplist-group';
import Item from 'ak-droplist-item';
import { akColorN800 } from 'akutil-shared-styles';

import DropdownList from '../../src';

const DroplistOverview = class extends Component {
  render() {
    return (<DropdownList
      shouldFitContainer
      isOpen
      trigger={<div style={{ border: `1px solid ${akColorN800}` }}>Click here!</div>}
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
