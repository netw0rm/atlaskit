import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styles from 'style!./story-styles.less';
import Question from 'ak-icon/glyph/question';
import Avatar from 'ak-avatar';
import avatarUrl from 'url!./doge.jpg';

import Item from '../src';
import { name } from '../package.json';

/* eslint-disable react/prop-types */
const ItemsWrapper = props => <div className={styles.storyesContainer}>{props.children}</div>;
const DropImitation = props => <div className={styles.itemsContainer}>{props.children}</div>;
const Icon = () => <Question label="test question" />;
const DogeAvatar = () => <Avatar src={avatarUrl} size="small" />;
/* eslint-enable react/prop-types */

storiesOf(name, module)
  .add('simple item', () => (
    <ItemsWrapper>
      <DropImitation>
        <Item href="http://atlassian.com">This link will reload this window</Item>
        <Item isActive>This is just a highlighted item</Item>
        <Item href="http://atlassian.com" target="_blank">This link will open in another tab</Item>
      </DropImitation>
    </ItemsWrapper>
  ))
  .add('simple checkbox item', () => (
    <ItemsWrapper>
      <DropImitation>
        <Item type="checkbox">first item</Item>
        <Item type="checkbox" isChecked>checked item</Item>
        <Item type="checkbox">third item</Item>
      </DropImitation>
    </ItemsWrapper>
  ))
  .add('simple radio item', () => (
    <ItemsWrapper>
      <DropImitation>
        <Item type="radio">first item</Item>
        <Item type="radio" isChecked>checked item</Item>
        <Item type="radio">third item</Item>
      </DropImitation>
    </ItemsWrapper>
  ))
  .add('simple item with icons', () => (
    <ItemsWrapper>
      <DropImitation>
        <Item elemBefore={<Icon />}>first item</Item>
        <Item elemBefore={<Icon />}>second item</Item>
        <Item elemBefore={<Icon />}>third item</Item>
      </DropImitation>
    </ItemsWrapper>
  ))
  .add('simple item with avatars', () => (
    <ItemsWrapper>
      <DropImitation>
        <Item elemBefore={<DogeAvatar />}>first item</Item>
        <Item elemBefore={<DogeAvatar />}>second item</Item>
        <Item elemBefore={<DogeAvatar />}>third item</Item>
      </DropImitation>
    </ItemsWrapper>
  ))
  .add('disabled items', () => (
    <ItemsWrapper>
      <DropImitation>
        <Item elemBefore={<Icon />} isDisabled>first item</Item>
        <Item type="radio" isDisabled>second item</Item>
        <Item href="http://atlassian.com" target="_blank" isDisabled>This link will open in another tab</Item>
      </DropImitation>
    </ItemsWrapper>
  ));

