import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
import AkTagWebComponent from 'ak-tag';
import React from 'react';
import { name } from '../package.json';
import styles from '../src/shadow.less';
import tagStyles from 'ak-tag/src/shadow.less';
import tagNames from './tagNames';

const Group = reactify(WebComponent);

const Tag = reactify(AkTagWebComponent);

const overflowStory = () => (
  <div style={{ border: '1px solid black' }}>
    <Group className={styles.locals.akTagGroup}>
      {tagNames.map((sweet, i) => (
        <Tag
          className={tagStyles.locals.akTag}
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
