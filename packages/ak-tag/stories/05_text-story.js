import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Tag from '../src/index';
import React from 'react';
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Component = reactify(Tag);

const cupcakeipsum = 'Croissant topping tiramisu gummi bears. Bonbon chocolate bar danish soufflé';

storiesOf(name, module)
  .add('text: simple', () => (
    <Component
      className={styles.akTag}
      text="Marshmallow"
    />
  ))
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
            <Component
              className={styles.akTag}
              text={cupcakeipsum}
            />
          </td>
        </tr>
        <tr>
          <th>Linked</th>
          <td>
            <Component
              className={styles.akTag}
              text={cupcakeipsum}
              href="http://www.cupcakeipsum.com/"
            />
          </td>
        </tr>
        <tr>
          <th>Removable</th>
          <td>
            <Component
              className={styles.akTag}
              text={cupcakeipsum}
              remove-button-text="No sweets for you!"
            />
          </td>
        </tr>
        <tr>
          <th>Removable & linked</th>
          <td>
            <Component
              className={styles.akTag}
              text={cupcakeipsum}
              remove-button-text="No sweets for you!"
              href="http://www.cupcakeipsum.com/"
            />
          </td>
        </tr>
      </tbody>
    </table>
  ));
