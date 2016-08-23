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

storiesOf(name, module)
  .add('a simple ak-tag-group', () => (
    <Group className={styles.akTagGroup}>
      <Tag text="Cupcake" />
      <Tag text="Wagon Wheel" />
      <Tag text="Jelly beans" />
      <Tag text="Chocolate" />
    </Group>
  ));
