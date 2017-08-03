import React from 'react';
import Avatar from '@atlaskit/avatar';
import {
  DropdownItem,
  DropdownItemCheckbox,
  DropdownItemRadio,
  DropdownItemGroup,
  DropdownItemGroupCheckbox,
  DropdownItemGroupRadio,
} from '@atlaskit/dropdown-menu';
import Tooltip from '@atlaskit/tooltip';

export const simpleDropdownItems = (
  <DropdownItemGroup title="Heading">
    <DropdownItem>Hello it with some really quite long text here.</DropdownItem>
    <DropdownItem>Some text 2</DropdownItem>
    <DropdownItem isDisabled>Some disabled text</DropdownItem>
    <DropdownItem>Some more text</DropdownItem>
  </DropdownItemGroup>
);

export const dropdownItemsWithGroups = (
  <div>
    <DropdownItemGroup title="The first group">
      <DropdownItem>Some text 1</DropdownItem>
      <DropdownItem isDisabled>Some text 2</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Second group">
      <DropdownItem>Some text 3</DropdownItem>
      <DropdownItem>Some text 4</DropdownItem>
    </DropdownItemGroup>
  </div>
);

export const simpleDropdownItemsWithAvatars = (
  <DropdownItemGroup title="Friends">
    <DropdownItem elemBefore={<Avatar size="small" />}>Some text</DropdownItem>
    <DropdownItem elemBefore={<Avatar size="small" />}>Some text also</DropdownItem>
  </DropdownItemGroup>
);

export const simpleDropdownItemsWithCheckboxes = (
  <DropdownItemGroupCheckbox id="example-checkbox-group" title="Languages">
    <DropdownItemCheckbox id="js">JavaScript</DropdownItemCheckbox>
    <DropdownItemCheckbox id="java">Java</DropdownItemCheckbox>
    <DropdownItemCheckbox id="ruby">Ruby</DropdownItemCheckbox>
  </DropdownItemGroupCheckbox>
);

export const simpleDropdownItemsWithRadio = [
  <DropdownItemGroupRadio id="example-radio-group" title="Languages">
    <DropdownItemRadio id="js">JavaScript</DropdownItemRadio>
    <DropdownItemRadio id="java">Java</DropdownItemRadio>
    <DropdownItemRadio id="ruby">Ruby</DropdownItemRadio>
  </DropdownItemGroupRadio>,
  <DropdownItemGroupRadio behavior="radio" title="Platforms">
    <DropdownItemRadio id="mac">MacOS</DropdownItemRadio>
    <DropdownItemRadio id="win">Windows</DropdownItemRadio>
  </DropdownItemGroupRadio>,
];

export const simpleDropdownItemsWithRadioAndCheckbox = [
  <DropdownItemGroupRadio id="languages" title="Languages">
    <DropdownItemRadio id="js">JavaScript</DropdownItemRadio>
    <DropdownItemRadio id="java">Java</DropdownItemRadio>
    <DropdownItemRadio id="ruby">Ruby</DropdownItemRadio>
  </DropdownItemGroupRadio>,
  <DropdownItemGroupCheckbox id="languages2" title="Languages">
    <DropdownItemCheckbox id="js">JavaScript</DropdownItemCheckbox>
    <DropdownItemCheckbox id="java">Java</DropdownItemCheckbox>
    <DropdownItemCheckbox id="ruby">Ruby</DropdownItemCheckbox>
  </DropdownItemGroupCheckbox>,
];

export const lotsOfItems = (
  <DropdownItemGroup title="">
    <DropdownItem>Some text</DropdownItem>
    <DropdownItem>Some text 2</DropdownItem>
    <DropdownItem>Some text 3</DropdownItem>
    <DropdownItem>Some text 4</DropdownItem>
    <DropdownItem>Some text 5</DropdownItem>
    <DropdownItem>Some text 6</DropdownItem>
    <DropdownItem>Some text 7</DropdownItem>
    <DropdownItem>Some text 8</DropdownItem>
    <DropdownItem>Some text 9</DropdownItem>
    <DropdownItem>Some text 10</DropdownItem>
    <DropdownItem>Some text 11</DropdownItem>
  </DropdownItemGroup>
);

export const itemsWithTooltips = (
  <DropdownItemGroup title="Composed tooltips">
    {
      ['right', 'left', 'top', 'bottom'].map(tooltipPos => (
        <Tooltip
          description="Oh, hello there!"
          position={tooltipPos}
        >
          <DropdownItem>
            Tooltip on the {tooltipPos}
          </DropdownItem>
        </Tooltip>
      ))
    }
  </DropdownItemGroup>
);
