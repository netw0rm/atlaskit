import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkBadge from '../src/index';
import React from 'react';
import { name } from '../package.json';
import styles from '../src/shadow.less';

const Badge = reactify(AkBadge);

const badgeClass = styles.akBadge;

storiesOf(name, module)
  .add('with a value', () => (
    <div>
      <Badge id="myComponent" className={badgeClass} value="5" />
      <Badge id="myComponent" className={badgeClass} appearance="primary" value="-5" />
      <Badge id="myComponent" className={badgeClass} appearance="important" value="25" />
      <Badge id="myComponent" className={badgeClass} appearance="added" value="3000" max="99" />
      <Badge id="myComponent" className={badgeClass} appearance="removed" />
    </div>
  ))
  .add('with no value', () => (
    <Badge id="myComponent" className={badgeClass} />
  ))
  .add('with a negative value', () => (
    <Badge id="myComponent" className={badgeClass} value="-5" />
  ))
  .add('with a max value', () => (
    <Badge id="myComponent" className={badgeClass} value="500" max="99" />
  ))
  .add('with value <= max value', () => (
    <Badge id="myComponent" className={badgeClass} value="50" max="99" />
  ))
  .add('with value === max value', () => (
    <Badge id="myComponent" className={badgeClass} value="99" max="99" />
  ));
