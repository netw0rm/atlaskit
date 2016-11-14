import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkTagWebComponent from 'ak-tag';
import React from 'react';

import tagStyles from 'style!./tagStyles.less';

import WebComponent from '../src';
import { name } from '../package.json';
import styles from '../src/shadow.less';


const Group = reactify(WebComponent);

const Tag = reactify(AkTagWebComponent);

storiesOf(name, module)
  .add('a simple ak-tag-group', () => (
    <Group className={styles.locals.akTagGroup}>
      <Tag text="Cupcake" />
      <Tag text="Wagon Wheel" />
      <Tag text="Jelly beans" />
      <Tag text="Chocolate" />
    </Group>
  ));
