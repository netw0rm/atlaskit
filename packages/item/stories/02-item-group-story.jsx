import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Item, { ItemGroup } from '../src';
import { name } from '../package.json';
import { GroupsWrapper } from './styled/StoryHelpers';

// eslint-disable-next-line react/prop-types
const DemoGroup = props => (
  <ItemGroup {...props}>
    <Item href="//atlassian.com">This link will reload this window</Item>
    <Item>This is just a standard item</Item>
    <Item href="//atlassian.com" target="_blank">This link will open in another tab</Item>
  </ItemGroup>
);

storiesOf(`${name} - ItemGroup`, module)
  .add('simple group', () => (
    <GroupsWrapper>
      <DemoGroup />
    </GroupsWrapper>
  ))
  .add('with title', () => (
    <GroupsWrapper>
      <DemoGroup title="Group heading" />
    </GroupsWrapper>
  ))
  .add('with elemAfter as text', () => (
    <GroupsWrapper>
      <DemoGroup
        elemAfter="Text after"
        title="Group heading"
      />
    </GroupsWrapper>
  ))
  .add('with elemAfter as JSX', () => (
    <GroupsWrapper>
      <DemoGroup
        elemAfter={
          <div>
            <span>Text</span>
            <span> after</span>
          </div>
        }
        title="Group heading"
      />
    </GroupsWrapper>
  ));

