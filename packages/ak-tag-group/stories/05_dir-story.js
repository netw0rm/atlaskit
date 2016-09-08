import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
import AkTagWebComponent from 'ak-tag';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import styles from 'style!./../src/host.less';
import tagStyles from 'style!ak-tag/src/host.less';

const Group = reactify(WebComponent, {
  React,
  ReactDOM,
});

const Tag = reactify(AkTagWebComponent, {
  React,
  ReactDOM,
});

const RemovableComponent = (props) => (
  <Tag
    {...props}
    className={tagStyles.akTag}
    href="http://www.cupcakeipsum.com/"
    remove-button-text="No sweets for you!"
  />
);

const story = () => (
  <div>
    Try tabbing :)
    <hr />
    <Group className={styles.akTagGroup}>
      <RemovableComponent text="Danish chocolate" />
      <RemovableComponent text="Jelly beans" />
      <RemovableComponent text="Cheesecake" />
    </Group>
  </div>
);

storiesOf(name, module)
  .add('text direction', story)
  .addSwapped('text direction (swapped)', story)
;
