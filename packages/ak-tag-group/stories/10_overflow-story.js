import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import AkTagWebComponent from 'ak-tag';

import tagStyles from 'style!./tagStyles.less';

import WebComponent from '../src';
import { name } from '../package.json';
import styles from '../src/shadow.less';
import tagNames from './tagNames';


const Group = reactify(WebComponent);
const Tag = reactify(AkTagWebComponent);

storiesOf(name, module)
  .add('tag overflow', () => (
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
  ));
