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

const sweets = 'Liquorice bear claw liquorice croissant cotton candy caramels. Lollipop jelly sweet roll marzipan biscuit oat cake lollipop. Icing cookie sesame snaps gingerbread gummi bears jelly-o. Apple pie oat cake oat cake liquorice brownie gummies pudding jelly-o. Cookie gummies jelly beans carrot cake. Jelly-o candy canes toffee cheesecake. Candy jelly-o gingerbread jelly. Sugar plum powder powder fruitcake cheesecake jelly-o fruitcake candy cake. Dessert chocolate cake chocolate bar chocolate cake liquorice apple pie. Gummi bears chocolate bar chocolate cake. Tart sweet roll jelly-o gingerbread chupa chups soufflé. Carrot cake sesame snaps tootsie roll chocolate bar danish marshmallow sweet roll sesame snaps. Danish wafer pie dessert sugar plum.'; // eslint-disable-line max-len

const overflowStory = () => (
  <div style={{ border: '1px solid black' }}>
    <Group className={styles.akTagGroup}>
      {sweets.split(/[\s\.]+/).map((sweet, i) => (
        <Tag
          className={tagStyles.akTag}
          href="http://www.cupcakeipsum.com/"
          key={i}
          text={sweet}
        />))}
    </Group>
  </div>
);

storiesOf(name, module)
  .add('tag overflow', overflowStory)
  .addRTL('tag overflow (RTL)', overflowStory);
