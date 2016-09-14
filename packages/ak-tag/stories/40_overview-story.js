import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Tag from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Component = reactify(Tag, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('overview', () => (
    <div>
      <Component
        className={styles.akTag}
        text="Text only"
      />
      <Component
        className={styles.akTag}
        href="https://some.link"
        text="Linked text"
      />
      <Component
        className={styles.akTag}
        text="Removable"
        remove-button-text="Remove me"
      />
      <Component
        className={styles.akTag}
        href="https://some.link"
        text="Removable & linked"
        remove-button-text="Remove me"
      />
      <Component
        className={styles.akTag}
        text="Overflowing text that will be cut off"
      />
      <Component
        className={styles.akTag}
        text="Text with button that will be cut off"
        remove-button-text="Remove me"
      />
    </div>
  ));
