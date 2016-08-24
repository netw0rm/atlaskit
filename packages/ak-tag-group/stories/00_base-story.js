import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
import AkTagWebComponent from 'ak-tag';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import styles from 'style!./../src/host.less';
import tagStyles from 'style!ak-tag/src/host.less';

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
      <Tag text="Cupcake" className={tagStyles.akTag} />
      <Tag text="Wagon Wheel" className={tagStyles.akTag} />
      <Tag text="Jelly beans" className={tagStyles.akTag} />
      <Tag text="Chocolate" className={tagStyles.akTag} />
    </Group>
  ));
