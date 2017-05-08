import React, { Component } from 'react';
import DropdownMenu from '../src';
import {
  atlassianProductsDropdownItems,
  simpleDropdownItemsWithRadio,
  simpleDropdownItemsWithCheckboxes,
} from './DropdownsData';

export default class DropdownWithItemsFilter extends Component {
  render() {
    const exampleStyles = {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 20px',
    };
    return (<div>
      <div
        style={exampleStyles}
      >
        <p>Dropdown menu with items filter and link items</p>
        <div
          style={{
            padding: '10px',
          }}
        >
          <DropdownMenu
            triggerType="button"
            hasItemsFilter
            items={atlassianProductsDropdownItems}
          >
            <span tabIndex="0">link items</span>
          </DropdownMenu>
        </div>
      </div>
      <div
        style={exampleStyles}
      >
        <p>Dropdown menu with items filter and radio items</p>
        <div
          style={{
            padding: '10px',
          }}
        >
          <DropdownMenu
            triggerType="button"
            hasItemsFilter
            items={simpleDropdownItemsWithRadio}
          >
            <span tabIndex="0">radio items</span>
          </DropdownMenu>
        </div>
      </div>
      <div
        style={exampleStyles}
      >
        <p>Dropdown menu with items filter and checkbox items</p>
        <div
          style={{
            padding: '10px',
          }}
        >
          <DropdownMenu
            triggerType="button"
            hasItemsFilter
            items={simpleDropdownItemsWithCheckboxes}
          >
            <span tabIndex="0">checkbox items</span>
          </DropdownMenu>
        </div>
      </div>
    </div>);
  }
}
