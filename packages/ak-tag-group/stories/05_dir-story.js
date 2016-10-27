import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import AkTagWebComponent from 'ak-tag';

import tagStyles from 'style!./tagStyles.less';

import WebComponent from '../src';
import { name } from '../package.json';
import styles from '../src/shadow.less';

const Group = reactify(WebComponent);

const Tag = reactify(AkTagWebComponent);

const RemovableComponent = props => (
  <Tag
    {...props}
    className={tagStyles.locals.akTag}
    href="http://www.cupcakeipsum.com/"
    remove-button-text="No sweets for you!"
  />
);

storiesOf(name, module)
  .add('text direction', () => (
    <div>
      Try tabbing :)
      <hr />
      <Group className={styles.locals.akTagGroup}>
        <RemovableComponent text="Danish chocolate" />
        <RemovableComponent text="Jelly beans" />
        <RemovableComponent text="Cheesecake" />
      </Group>
    </div>
  ));
