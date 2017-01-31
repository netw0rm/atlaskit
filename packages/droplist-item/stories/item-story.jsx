import { storiesOf } from '@kadira/storybook';
import React from 'react';
// import styles from 'style!./story-styles.less';
import styled from 'styled-components';

import Question from '@atlaskit/icon/glyph/question';
import Arrow from '@atlaskit/icon/glyph/arrowrightlong';
import Avatar from '@atlaskit/avatar';
import Lozenge from '@atlaskit/lozenge';

import { akColorN0 } from 'akutil-shared-styles';
import Item, { SecondaryText } from '../src';
import { name } from '../package.json';

/* eslint-disable react/prop-types */
const Icon = () => <Question label="test question" />;
/* eslint-enable react/prop-types */
const imports = [['React', 'react'], ['Item', '@atlaskit/droplist-item']];

const StoryContainer = styled.div`
  padding: 30px;
`;

const ItemContainer = styled.div`
  background: ${akColorN0};
  width: 300px;
  margin-top: 10px;
`;

storiesOf(name)
  .addCodeExampleStory('simple item', () => (
    <StoryContainer>
      <p>This is an example of simple droplist items with or without links</p>
      <ItemContainer>
        <Item href="http://atlassian.com">This link will reload this window</Item>
        <Item isActive>This is just a highlighted item</Item>
        <Item href="http://atlassian.com" target="_blank">This link will open in another tab</Item>
        <Item>This item has <SecondaryText>(secondary text)</SecondaryText></Item>
        <Item isFocused>Focused item</Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports })
  .addCodeExampleStory('simple checkbox item', () => (
    <StoryContainer>
      <p>This is an example of droplist items with checkboxes</p>
      <ItemContainer>
        <Item type="checkbox" isFocused>Focused item</Item>
        <Item type="checkbox" isChecked>checked item</Item>
        <Item type="checkbox">third item</Item>
        <Item type="checkbox">This item has <SecondaryText>(secondary text)</SecondaryText></Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports })
  .addCodeExampleStory('simple radio item', () => (
    <StoryContainer>
      <p>This is an example of radio droplist items</p>
      <ItemContainer>
        <Item type="radio" isFocused>focused Item</Item>
        <Item type="radio" isChecked>checked item</Item>
        <Item type="radio">third item</Item>
        <Item type="radio">This item has <SecondaryText>(secondary text)</SecondaryText></Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports })
  .addCodeExampleStory('simple item with icons', () => (
    <StoryContainer>
      <p>This is an example of droplist items with icons</p>
      <ItemContainer>
        <Item elemBefore={<Icon />}>first item</Item>
        <Item elemBefore={<Icon />}>second item</Item>
        <Item elemBefore={<Icon />}>third item</Item>
        <Item elemBefore={<Icon />}>Item with<SecondaryText>(secondary text)</SecondaryText></Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports: [...imports, ['Icon', 'ak-icon/glyph/question']] })
  .addCodeExampleStory('simple item with avatars', () => (
    <StoryContainer>
      <p>This is an example of droplist items with avatars</p>
      <ItemContainer>
        <Item elemBefore={<Avatar size="small" />}>first item</Item>
        <Item elemBefore={<Avatar size="small" />}>second item</Item>
        <Item elemBefore={<Avatar size="small" />}>third item</Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports: [...imports, ['Avatar', 'ak-avatar']] })
  .addCodeExampleStory('simple item with additional space', () => (
    <StoryContainer>
      <p>This is an example of droplist items with additional space to the right</p>
      <ItemContainer>
        <Item
          elemAfter={
            <div style={{ display: 'flex', alignItems: 'center', width: '105px' }}>
              <Arrow label="" /><Lozenge appearance="success">done</Lozenge>
            </div>
          }
        >first item</Item>
        <Item
          elemAfter={
            <div style={{ display: 'flex', alignItems: 'center', width: '105px' }}>
              <Arrow label="" /><Lozenge appearance="inprogress">in progress</Lozenge>
            </div>
          }
        >second item with very long text that is going to be cut off</Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports: [...imports, ['Lozenge', 'ak-lozenge'], ['t', 'ak-icon/glyph/arrowrightlong']] })
  .addCodeExampleStory('item with avatars and checkboxes', () => (
    <StoryContainer>
      <p>This is an example of droplist items with avatars and checkboxes</p>
      <ItemContainer>
        <Item elemBefore={<Avatar size="small" />} type="checkbox" isFocused>first item</Item>
        <Item elemBefore={<Avatar size="small" />} type="checkbox" isChecked>second item</Item>
        <Item elemBefore={<Avatar size="small" />} type="checkbox">third item</Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports: [...imports, ['Avatar', 'ak-avatar']] })
  .addCodeExampleStory('disabled items', () => (
    <StoryContainer>
      <p>This is an example of disabled droplist items</p>
      <ItemContainer>
        <Item elemBefore={<Icon />} isDisabled>first item</Item>
        <Item type="radio" isDisabled>second item</Item>
        <Item href="http://atlassian.com" target="_blank" isDisabled>This link will open in another tab</Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports: [...imports, ['Icon', 'ak-icon/glyph/question']] })
  .addCodeExampleStory('items and handlers', () => (
    <StoryContainer>
      <p>Items have a handler to help them communicate with the outside world.</p>
      <p><b>onActivate</b> is called when the item is activated (clicked, pressed enter,
        pressed space).</p>
      <ItemContainer>
        <Item
          onActivate={(attr) => {
            console.log('look ma, I was activated!', attr.item);
          }}
        >first item</Item>
      </ItemContainer>
    </StoryContainer>
  ), { imports })
  .addCodeExampleStory('items in different contexts (accessibility test)', () => (
    <StoryContainer>
      <ItemContainer>
        <p>Should announce checkbox (menu)</p>
        <div role="group">
          <Item type="checkbox">Choose me</Item>
          <Item type="checkbox" isChecked>Or me</Item>
        </div>
        <p>Should announce radio (menu)</p>
        <div role="group">
          <Item type="radio">Choose me</Item>
          <Item type="radio" isChecked>Or me</Item>
        </div>
        <p>Should announce menu item (menu)</p>
        <div role="group">
          <Item>I`m an item</Item>
          <Item isActive>Me too</Item>
        </div>
        <p>Should announce option (select/multiselect)</p>
        <div role="listbox">
          <Item type="option">I`m an option</Item>
          <Item type="option" isSelected>Me too</Item>
        </div>
      </ItemContainer>
    </StoryContainer>
  ));

