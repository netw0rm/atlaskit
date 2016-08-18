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
  .add('href: custom link', () => (
    <Component
      className={styles.akTag}
      href="https://www.atlassian.com/search?query=jira"
      text="jira"
    />
  ));
