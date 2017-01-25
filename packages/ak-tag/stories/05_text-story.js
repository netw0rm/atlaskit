import { storiesOf } from '@kadira/storybook';
import styles from 'style!./styles.less';
import React from 'react';

import Tag from '../src/index';
import { name } from '../package.json';

const MyTag = props => (
  <Tag
    {...props}
  />
);

const cupcakeipsum = 'Croissant topping tiramisu gummi bears. Bonbon chocolate bar danish soufflé';
const imports = [
  ['React', 'react'],
  ['Tag', 'ak-tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('text: simple', () => <MyTag text="Marshmallow" />, { imports })
  .addCodeExampleStory('text: maximum length (ellipsis)', () => (
    <table>
      <tbody>
        <tr>
          <th className={styles.headers}>Full text</th>
          <td>{cupcakeipsum}</td>
        </tr>
        <tr>
          <th className={styles.headers}>Text</th>
          <td>
            <MyTag text={cupcakeipsum} />
          </td>
        </tr>
        <tr>
          <th className={styles.headers}>Linked</th>
          <td>
            <MyTag
              href="http://www.cupcakeipsum.com/"
              text={cupcakeipsum}
            />
          </td>
        </tr>
        <tr>
          <th className={styles.headers}>Removable</th>
          <td>
            <MyTag
              removeButtonText="No sweets for you!"
              text={cupcakeipsum}
            />
          </td>
        </tr>
        <tr>
          <th className={styles.headers}>Removable & linked</th>
          <td>
            <MyTag
              href="http://www.cupcakeipsum.com/"
              removeButtonText="No sweets for you!"
              text={cupcakeipsum}
            />
          </td>
        </tr>
      </tbody>
    </table>
  ), { imports })
  .addBaselineAligned('baseline alignment', () => (
    <MyTag
      href="http://www.cupcakeipsum.com/"
      removeButtonText="No sweets for you!"
      text={cupcakeipsum}
    />
  ), { imports })
  .addCodeExampleStory('children', () => (
    <MyTag>
      <img
        alt="random avatar"
        height="40"
        src="https://api.adorable.io/avatars/face/eyes4/nose3/mouth7/8e8895"
        style={{ borderRadius: '50%' }}
        width="40"
      />
      some children
    </MyTag>
  ));
