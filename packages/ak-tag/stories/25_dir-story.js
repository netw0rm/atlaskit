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
    href="http://www.cupcakeipsum.com/"
    remove-button-text="No sweets for you!"
  />
);

storiesOf(name, module)
  .add('text direction: RTL', () => (
    <div>
      Try tabbing :)
      <hr />
      <div dir="rtl">
        <RemovableComponent text="Candy canes" />
        <RemovableComponent text="Tiramisu" />
        <RemovableComponent text="Gummi bears" />
      </div>
    </div>
  ))
  .add('text direction: LTR', () => (
    <div>
      Try tabbing :)
      <hr />
      <div dir="ltr">
        <RemovableComponent text="Danish chocolate" />
        <RemovableComponent text="Jelly beans" />
        <RemovableComponent text="Cheesecake" />
      </div>
    </div>
  ));
