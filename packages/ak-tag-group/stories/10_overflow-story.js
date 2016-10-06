import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
import AkTagWebComponent from 'ak-tag';
import React from 'react';
import { name } from '../package.json';
import styles from 'style!./../src/host.less';
import tagStyles from 'style!./tagStyles.less';
import tagNames from './tagNames';

const Group = reactify(WebComponent);

const Tag = reactify(AkTagWebComponent);

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
  .addSwapped('tag overflow (swapped)', overflowStory);
