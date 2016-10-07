import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Tag from '../src/index';
import React from 'react';
import { name } from '../package.json';
import styles from '../src/shadow.less';

const Component = reactify(Tag);

storiesOf(name, module)
  .add('href: custom link', () => (
    <Component
      className={styles.akTag}
      href="https://www.atlassian.com/search?query=Carrot%20cake"
      text="Carrot cake"
    />
  ));
