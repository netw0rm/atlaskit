import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import AvatarWc from 'ak-avatar';

import avatarUrl from 'url!./doge.jpg';

import Dropdown, {
  DropdownTrigger, DropdownTriggerButton, DropdownTriggerArrow,
  Group, Item, CheckboxItem, RadioItem,
} from '../src';
import { name } from '../package.json';
import styles from '../src/less/shadow-list.less';

const dropdownClass = styles.locals.akDropdown;
const DropdownReactComponent = reactify(Dropdown);
const DropdownTriggerReact = reactify(DropdownTrigger);
const DropdownTriggerButtonReact = reactify(DropdownTriggerButton);
const DropdownTriggerArrowReact = reactify(DropdownTriggerArrow);
const GroupReact = reactify(Group);
const ItemReact = reactify(Item);
const CheckboxItemReact = reactify(CheckboxItem);
const RadioItemReact = reactify(RadioItem);
const Avatar = reactify(AvatarWc);

storiesOf(`${name} component`, module)
  .add('simple dropdown', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger" tab-index="1">
          Dropdown-button
        </DropdownTriggerButtonReact>
        <ItemReact>text1</ItemReact>
        <ItemReact hidden>hidden ItemReact</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text2</ItemReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with checkbox items', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger">Dropdown-button</DropdownTriggerButtonReact>
        <GroupReact heading="Checkboxes title">
          <CheckboxItemReact>text1</CheckboxItemReact>
          <CheckboxItemReact disabled>text2</CheckboxItemReact>
          <CheckboxItemReact>some text here</CheckboxItemReact>
          <CheckboxItemReact>another text</CheckboxItemReact>
        </GroupReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with radio items', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger" tab-index="1">
          Dropdown
        </DropdownTriggerButtonReact>
        <GroupReact heading="Radio title">
          <RadioItemReact>text1</RadioItemReact>
          <RadioItemReact disabled>text2</RadioItemReact>
          <RadioItemReact>some text here</RadioItemReact>
          <RadioItemReact>another text</RadioItemReact>
        </GroupReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with radio items inside different groups', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger" tab-index="1">
          Dropdown
        </DropdownTriggerButtonReact>
        <GroupReact heading="One title">
          <RadioItemReact>one</RadioItemReact>
          <RadioItemReact>two</RadioItemReact>
        </GroupReact>
        <GroupReact heading="Two title">
          <RadioItemReact>three</RadioItemReact>
          <RadioItemReact>four</RadioItemReact>
        </GroupReact>
        <GroupReact>
          <RadioItemReact>this is a titleless group</RadioItemReact>
          <RadioItemReact>separate group</RadioItemReact>
        </GroupReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with avatars', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger" tab-index="1">
          People list
        </DropdownTriggerButtonReact>
        <ItemReact>
          <Avatar slot="left" src={avatarUrl} size="small" />
          Adam Smith
        </ItemReact>
        <ItemReact>
          <Avatar slot="left" src={avatarUrl} size="small" />
          Eva Smith
        </ItemReact>
        <ItemReact>
          <Avatar slot="left" src={avatarUrl} size="small" />
          Ivan Ivanov
        </ItemReact>
        <ItemReact>
          <Avatar slot="left" src={avatarUrl} size="small" />
          Jane Black
        </ItemReact>
        <ItemReact>
          <Avatar slot="left" src={avatarUrl} size="small" />
          Mike Cannon-Brookes
        </ItemReact>
        <ItemReact>
          <Avatar slot="left" src={avatarUrl} size="small" />
          Some very long name very long name very long
          name very long name very long name very long name
        </ItemReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with grouping', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <DropdownTriggerReact slot="trigger" tab-index="1">Dropdown-button</DropdownTriggerReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>some text here</ItemReact>
        <GroupReact heading="title one">
          <ItemReact>text1</ItemReact>
          <ItemReact selected>text2</ItemReact>
        </GroupReact>
        <GroupReact heading="title two">
          <ItemReact disabled>some text here</ItemReact>
          <ItemReact>another text</ItemReact>
        </GroupReact>
        <GroupReact>
          <ItemReact>this is a group</ItemReact>
          <ItemReact>without any title</ItemReact>
        </GroupReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with grouping without headers', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent open className={dropdownClass}>
        <DropdownTriggerReact slot="trigger" tab-index="1">Dropdown-button</DropdownTriggerReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>some text here</ItemReact>
        <GroupReact>
          <ItemReact>text1</ItemReact>
          <ItemReact>text2</ItemReact>
        </GroupReact>
        <GroupReact>
          <ItemReact disabled>some text here</ItemReact>
          <ItemReact>another text</ItemReact>
        </GroupReact>
        <GroupReact>
          <ItemReact>this is a group</ItemReact>
          <ItemReact>without any title</ItemReact>
        </GroupReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with a buttonless trigger', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent className={dropdownClass}>
        <DropdownTriggerReact slot="trigger" tab-index="1">
          <Avatar src={avatarUrl} size="small" />
        </DropdownTriggerReact>
        <ItemReact>Joscha</ItemReact>
        <ItemReact>Wuz</ItemReact>
        <ItemReact>Here</ItemReact>
        <ItemReact>2016</ItemReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('two dropdowns', () => (
    <div>
      <DropdownReactComponent className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger" tab-index="1">A</DropdownTriggerButtonReact>
        <ItemReact>A</ItemReact>
      </DropdownReactComponent>
      <DropdownReactComponent className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger" tab-index="1">B</DropdownTriggerButtonReact>
        <ItemReact>B</ItemReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with a link that opens in a new tab', () => (
    <div>
      <DropdownReactComponent className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger" tab-index="1">
          Dropdown-button
        </DropdownTriggerButtonReact>
        <ItemReact href="http://atlassian.design" target="_blank">New tab</ItemReact>
        <ItemReact href="http://atlassian.design">Same tab</ItemReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with icon only button trigger', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent className={dropdownClass}>
        <DropdownTriggerArrowReact slot="trigger" tab-index="1" />
        <ItemReact>Joscha</ItemReact>
        <ItemReact>Wuz</ItemReact>
        <ItemReact>Here</ItemReact>
        <ItemReact>2016</ItemReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('dropdown with everything for the screenreaders test', () => (
    <div style={{ padding: '40px' }}>
      <input type="text" placeholder="item before" />
      <DropdownReactComponent className={dropdownClass}>
        <DropdownTriggerButtonReact slot="trigger" tab-index="1">Text</DropdownTriggerButtonReact>
        <GroupReact heading="People">
          <ItemReact href="http://atlassian.com" target="_blank">Joscha</ItemReact>
          <ItemReact href="http://google.com" target="_blank">Jennifer</ItemReact>
        </GroupReact>
        <GroupReact heading="Gender">
          <CheckboxItemReact selected>Female</CheckboxItemReact>
          <CheckboxItemReact>Male</CheckboxItemReact>
        </GroupReact>
        <GroupReact heading="Favourites">
          <RadioItemReact>jQuery</RadioItemReact>
          <RadioItemReact selected>React</RadioItemReact>
          <RadioItemReact selected>Web components</RadioItemReact>
          <RadioItemReact>Vanilla JS</RadioItemReact>
        </GroupReact>
      </DropdownReactComponent>
      <a href="http://www.atlassian.com">link after</a>
    </div>
  ))
  .add('dropdown with lots of items', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent className={dropdownClass}>
        <DropdownTriggerArrowReact slot="trigger" tab-index="1" />
        <ItemReact>Joscha</ItemReact>
        <ItemReact>Wuz</ItemReact>
        <ItemReact>Here</ItemReact>
        <ItemReact>2016</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('appearance: tall', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent className={dropdownClass} appearance="tall">
        <DropdownTriggerArrowReact slot="trigger" tab-index="1" />
        <ItemReact>Joscha</ItemReact>
        <ItemReact>Wuz</ItemReact>
        <ItemReact>Here</ItemReact>
        <ItemReact>2016</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
      </DropdownReactComponent>
    </div>
  ))
  .add('appearance: fitwidth', () => (
    <div style={{ padding: '40px' }}>
      <DropdownReactComponent
        className={dropdownClass}
        appearance="fitwidth"
        style={{ width: '500px' }}
      >
        <DropdownTriggerReact slot="trigger" tab-index="1">
          <div
            style={{
              border: '3px solid #ddd',
              borderRadius: '3px',
              padding: '10px',
              width: '100%',
            }}
          >trigger</div>
        </DropdownTriggerReact>
        <ItemReact>Joscha</ItemReact>
        <ItemReact>Wuz</ItemReact>
        <ItemReact>Here</ItemReact>
        <ItemReact>2016</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
        <ItemReact>text1</ItemReact>
        <ItemReact disabled>text2</ItemReact>
        <ItemReact>some text here</ItemReact>
        <ItemReact>another text</ItemReact>
      </DropdownReactComponent>
    </div>
  ));
