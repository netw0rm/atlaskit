import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styles from 'style!./story-styles.less';
import Question from 'ak-icon/glyph/question';
import Avatar from 'ak-avatar';

import Item from '../src';
import { name } from '../package.json';

/* eslint-disable react/prop-types */
const Icon = () => <Question label="test question" />;
/* eslint-enable react/prop-types */
const imports = [['React', 'react'], ['Item', 'ak-droplist-item']];
storiesOf(name, module)
  .addCodeExampleStory('simple item', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of simple droplist items with or without links</p>
      <div className={styles.itemsContainer}>
        <Item href="http://atlassian.com">This link will reload this window</Item>
        <Item isActive>This is just a highlighted item</Item>
        <Item href="http://atlassian.com" target="_blank">This link will open in another tab</Item>
        <Item isFocused>Focused item</Item>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('simple checkbox item', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of droplist items with checkboxes</p>
      <div className={styles.itemsContainer}>
        <Item type="checkbox" isFocused>Focused item</Item>
        <Item type="checkbox" isChecked>checked item</Item>
        <Item type="checkbox">third item</Item>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('simple radio item', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of radio droplist items</p>
      <div className={styles.itemsContainer}>
        <Item type="radio" isFocused>focused Item</Item>
        <Item type="radio" isChecked>checked item</Item>
        <Item type="radio">third item</Item>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('simple item with icons', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of droplist items with icons</p>
      <div className={styles.itemsContainer}>
        <Item elemBefore={<Icon />}>first item</Item>
        <Item elemBefore={<Icon />}>second item</Item>
        <Item elemBefore={<Icon />}>third item</Item>
      </div>
    </div>
  ), { imports: [...imports, ['Icon', 'ak-icon/glyph/question']] })
  .addCodeExampleStory('simple item with avatars', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of droplist items with avatars</p>
      <div className={styles.itemsContainer}>
        <Item elemBefore={<Avatar size="small" />}>first item</Item>
        <Item elemBefore={<Avatar size="small" />}>second item</Item>
        <Item elemBefore={<Avatar size="small" />}>third item</Item>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('disabled items', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of disabled droplist items</p>
      <div className={styles.itemsContainer}>
        <Item elemBefore={<Icon />} isDisabled>first item</Item>
        <Item type="radio" isDisabled>second item</Item>
        <Item href="http://atlassian.com" target="_blank" isDisabled>This link will open in another tab</Item>
      </div>
    </div>
  ), { imports: [...imports, ['Icon', 'ak-icon/glyph/question']] })
  .addCodeExampleStory('items and handlers', () => (
    <div className={styles.storiesContainer}>
      <p>Items have two handlers to help them communicate with the outside world.</p>
      <p><b>onActivate</b> is called when the item is activated (clicked, pressed enter,
        pressed space). On other key presses <b>onKeyDown</b> handler is called.</p>
      <div className={styles.itemsContainer}>
        <Item
          onActivate={(attr) => {
            console.log('look ma, I was activated!', attr.item);
          }}
        >first item</Item>
        <Item
          onKeyDown={(attr) => {
            console.log('look ma, someone pressed a button!', attr.event);
          }}
        >second item</Item>
      </div>
    </div>
  ), { imports });

