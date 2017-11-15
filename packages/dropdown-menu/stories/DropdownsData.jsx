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
import { action } from '@kadira/storybook';

const clickAction = action('Item clicked');

export const simpleDropdownItems = (
  <DropdownItemGroup title="Heading">
    <DropdownItem onClick={clickAction}>
      Hello it with some really quite long text here.
    </DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 2</DropdownItem>
    <DropdownItem onClick={clickAction} isDisabled>Some disabled text</DropdownItem>
    <DropdownItem onClick={clickAction}>Some more text</DropdownItem>
    <DropdownItem href="//atlassian.com" target="_new">A link item</DropdownItem>
  </DropdownItemGroup>
);

export const dropdownItemsWithGroups = (
  <div>
    <DropdownItemGroup title="The first group">
      <DropdownItem onClick={clickAction}>Some text 1</DropdownItem>
      <DropdownItem onClick={clickAction} isDisabled>Some text 2</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Second group">
      <DropdownItem onClick={clickAction}>Some text 3</DropdownItem>
      <DropdownItem onClick={clickAction}>Some text 4</DropdownItem>
    </DropdownItemGroup>
  </div>
);

export const simpleDropdownItemsWithAvatars = (
  <DropdownItemGroup title="Friends">
    <DropdownItem
      onClick={clickAction}
      elemBefore={<Avatar size="small" />}
    >
      Some text
    </DropdownItem>
    <DropdownItem
      onClick={clickAction}
      elemBefore={<Avatar size="small" />}
    >
      Some text also
    </DropdownItem>
  </DropdownItemGroup>
);

export const simpleDropdownItemsWithCheckboxes = (
  <DropdownItemGroupCheckbox id="example-checkbox-group" title="Languages">
    <DropdownItemCheckbox onClick={clickAction} id="js">JavaScript</DropdownItemCheckbox>
    <DropdownItemCheckbox onClick={clickAction} id="java">Java</DropdownItemCheckbox>
    <DropdownItemCheckbox onClick={clickAction} id="ruby">Ruby</DropdownItemCheckbox>
  </DropdownItemGroupCheckbox>
);

export const simpleDropdownItemsWithRadio = [
  <DropdownItemGroupRadio id="example-radio-group" title="Languages">
    <DropdownItemRadio defaultSelected onClick={clickAction} id="js">JavaScript</DropdownItemRadio>
    <DropdownItemRadio onClick={clickAction} id="java">Java</DropdownItemRadio>
    <DropdownItemRadio onClick={clickAction} id="ruby">Ruby</DropdownItemRadio>
  </DropdownItemGroupRadio>,
  <DropdownItemGroupRadio id="example-radio-group1" behavior="radio" title="Platforms">
    <DropdownItemRadio defaultSelected onClick={clickAction} id="mac">MacOS</DropdownItemRadio>
    <DropdownItemRadio onClick={clickAction} id="win">Windows</DropdownItemRadio>
  </DropdownItemGroupRadio>,
];

export const simpleDropdownItemsWithRadioAndCheckbox = [
  <DropdownItemGroupRadio id="languages" title="Languages">
    <DropdownItemRadio defaultSelected onClick={clickAction} id="js-radio">JavaScript</DropdownItemRadio>
    <DropdownItemRadio onClick={clickAction} id="java">Java</DropdownItemRadio>
    <DropdownItemRadio onClick={clickAction} id="ruby">Ruby</DropdownItemRadio>
  </DropdownItemGroupRadio>,
  <DropdownItemGroupCheckbox id="languages2" title="Languages">
    <DropdownItemCheckbox defaultSelected onClick={clickAction} id="js-check">JavaScript</DropdownItemCheckbox>
    <DropdownItemCheckbox onClick={clickAction} id="java">Java</DropdownItemCheckbox>
    <DropdownItemCheckbox defaultSelected onClick={clickAction} id="ruby">Ruby</DropdownItemCheckbox>
  </DropdownItemGroupCheckbox>,
];

export const lotsOfItems = (
  <DropdownItemGroup title="">
    <DropdownItem onClick={clickAction}>Some text</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 2</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 3</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 4</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 5</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 6</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 7</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 8</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 9</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 10</DropdownItem>
    <DropdownItem onClick={clickAction}>Some text 11</DropdownItem>
  </DropdownItemGroup>
);

export const itemsWithTooltips = (
  <DropdownItemGroup title="Composed tooltips">
    {
      ['right', 'left', 'top', 'bottom'].map((tooltipPos, i) => (
        <Tooltip
          content="Oh, hello there!"
          position={tooltipPos}
          key={i}
        >
          <DropdownItem onClick={clickAction}>
            Tooltip on the {tooltipPos}
          </DropdownItem>
        </Tooltip>
      ))
    }
  </DropdownItemGroup>
);
