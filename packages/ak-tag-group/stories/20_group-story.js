import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
import AkTagWebComponent from 'ak-tag';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Group = reactify(WebComponent, {
  React,
  ReactDOM,
});

const Tag = reactify(AkTagWebComponent, {
  React,
  ReactDOM,
});

const RemovableComponent = (props) => (
  <Tag
    {...props}
    className={styles.akTag}
    remove-button-text="Remove me"
  />
);

storiesOf(name, module)
  .add('alignment: left', () => (
    <Group className={styles.akTagGroup}>
      <RemovableComponent text="Candy canes" />
      <RemovableComponent text="Tiramisu" />
      <RemovableComponent text="Gummi bears" />
    </Group>
  ))
  .add('alignment: right', () => (
    <Group className={styles.akTagGroup}>
      <RemovableComponent text="Candy canes" />
      <RemovableComponent text="Tiramisu" />
      <RemovableComponent text="Gummi bears" />
    </Group>
  ));
