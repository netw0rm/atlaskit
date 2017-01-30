import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Tag from 'ak-tag';

import Group from '../src';
import { name } from '../package.json';
import styles from '../src/styles.less';

const imports = [
  ['React', 'react'],
  ['TagGroup', 'ak-tag-group'],
  ['Tag', 'ak-tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('text direction', () => (
    <div>
      Try tabbing :)
      <hr />
      <Group className={styles.locals.akTagGroup}>
        <Tag href="http://www.cupcakeipsum.com/" removeButtonText="No sweets for you!" text="Danish chocolate" />
        <Tag href="http://www.cupcakeipsum.com/" removeButtonText="No sweets for you!" text="Jelly beans" />
        <Tag href="http://www.cupcakeipsum.com/" removeButtonText="No sweets for you!" text="Cheesecake" />
      </Group>
    </div>
  ), { imports });
