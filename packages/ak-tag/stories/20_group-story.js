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

const RemovableComponent = (props) => (
  <Component
    {...props}
    className={styles.akTag}
    remove-button-text="Remove me"
  />
);

storiesOf(name, module)
  .add('groups: left alignment', () => (
    <div>
      <RemovableComponent text="Watermelons" />
      <RemovableComponent text="Stardew valley" />
      <RemovableComponent text="Pineapple bun" />
    </div>
  ))
  .add('groups: right alignment', () => (
    <div>
      <RemovableComponent text="Watermelons" />
      <RemovableComponent text="Stardew valley" />
      <RemovableComponent text="Pineapple bun" />
    </div>
  ));
