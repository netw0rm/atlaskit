import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
import AkTagWebComponent from 'ak-tag';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import styles from 'style!./../src/host.less';
import tagStyles from 'style!ak-tag/src/host.less';
import tagNames from './tagNames';

const Group = reactify(WebComponent, {
  React,
  ReactDOM,
});

const Tag = reactify(AkTagWebComponent, {
  React,
  ReactDOM,
});

const overflowStory = () => (
  <div style={{ border: '1px solid black' }}>
    <Group className={styles.akTagGroup}>
      {tagNames.map((sweet, i) => (
        <Tag
          className={tagStyles.akTag}
          href="http://www.cupcakeipsum.com/"
          key={i}
          text={sweet}
        />))}
    </Group>
  </div>
);

storiesOf(name, module)
  .add('tag overflow', overflowStory)
  .addRTL('tag overflow (RTL)', overflowStory);
