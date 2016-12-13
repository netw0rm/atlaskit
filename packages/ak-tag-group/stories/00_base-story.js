import { storiesOf } from '@kadira/storybook';
import Tag from 'ak-tag';
import React from 'react';

import Group from '../src';
import { name } from '../package.json';
import styles from '../src/styles.less';

const imports = [
  ['React', 'react'],
  ['TagGroup', 'ak-tag-group'],
  ['Tag', 'ak-tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('a simple ak-tag-group', () => (
    <Group className={styles.locals.akTagGroup}>
      <Tag text="Cupcake" />
      <Tag text="Wagon Wheel" />
      <Tag text="Jelly beans" />
      <Tag text="Chocolate" />
    </Group>
  ), { imports });
