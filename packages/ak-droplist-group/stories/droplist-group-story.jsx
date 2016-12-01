import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Item from 'ak-droplist-item';
import styles from 'style!./story-styles.less';

import Group from '../src';
import { name } from '../package.json';

/* eslint-disable react/prop-types */
const GropsWrapper = props => <div className={styles.storyesContainer}>{props.children}</div>;
const DropImitation = props => <div className={styles.itemsContainer}>{props.children}</div>;
/* eslint-enable react/prop-types */

storiesOf(name, module)
  .add('simple groups with headings', () => (
    <GropsWrapper>
      <DropImitation>
        <Group heading="Australia">
          <Item>Sydney</Item>
          <Item>Melbourne</Item>
          <Item>Perth</Item>
          <Item>Adelaide</Item>
          <Item>Canberra</Item>
        </Group>
        <Group heading="UK">
          <Item>London</Item>
          <Item>Cardiff</Item>
          <Item>Edinburgh</Item>
          <Item>Aberdeen</Item>
        </Group>
      </DropImitation>
    </GropsWrapper>
  ))
  .add('simple groups without headings', () => (
    <GropsWrapper>
      <DropImitation>
        <Group>
          <Item>Sydney</Item>
          <Item>Melbourne</Item>
          <Item>Perth</Item>
          <Item>Adelaide</Item>
          <Item>Canberra</Item>
        </Group>
        <Group>
          <Item>London</Item>
          <Item>Cardiff</Item>
          <Item>Edinburgh</Item>
          <Item>Aberdeen</Item>
        </Group>
      </DropImitation>
    </GropsWrapper>
  ));
