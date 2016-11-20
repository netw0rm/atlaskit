import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Tag from '../src/index';
import { name } from '../package.json';
import styles from '../src/styles.less';

const MyTag = props => (
  <Tag
    className={styles.locals.akTag}
    {...props}
  />
);

const cupcakeipsum = 'Croissant topping tiramisu gummi bears. Bonbon chocolate bar danish soufflé';

storiesOf(name, module)
  .add('text: simple', () => <MyTag text="Marshmallow" />)
  .add('text: maximum length (ellipsis)', () => (
    <table>
      <tbody>
        <tr>
          <th>Full text</th>
          <td>{cupcakeipsum}</td>
        </tr>
        <tr>
          <th>Text</th>
          <td>
            <MyTag text={cupcakeipsum} />
          </td>
        </tr>
        <tr>
          <th>Linked</th>
          <td>
            <MyTag
              text={cupcakeipsum}
              href="http://www.cupcakeipsum.com/"
            />
          </td>
        </tr>
        <tr>
          <th>Removable</th>
          <td>
            <MyTag
              text={cupcakeipsum}
              removeButtonText="No sweets for you!"
            />
          </td>
        </tr>
        <tr>
          <th>Removable & linked</th>
          <td>
            <MyTag
              text={cupcakeipsum}
              removeButtonText="No sweets for you!"
              href="http://www.cupcakeipsum.com/"
            />
          </td>
        </tr>
      </tbody>
    </table>
  ))
  .addBaselineAligned('baseline alignment', () => (
    <MyTag
      text={cupcakeipsum}
      removeButtonText="No sweets for you!"
      href="http://www.cupcakeipsum.com/"
    />
  ));
