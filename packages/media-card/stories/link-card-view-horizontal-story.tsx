import * as React from 'react';
import {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {LinkCardViewHorizontal} from '../src';
import {tallImage, wideImage, wideTransparentImage, smallImage} from './images';
import StoryList from './story-list';
import styles from './styles';

const onClick = (event: Event) => {
  action('click')();
};

const onRetry = () => {
  action('try again')();
};

const menuActions = [
  {label: 'Open', handler: () => { action('open')(); }},
  {label: 'Close', handler: () => { action('close')(); }}
];

storiesOf('LinkCardViewHorizontal', {})
  .add('Media types', () => (
    <ul style={styles.statesWrapper}>
      <li style={styles.stateItem}>
        <div style={styles.stateTitle}>Image type</div>
        <LinkCardViewHorizontal
          title="Dummy title"
          description="This is some description"
          loading={false}
          onClick={onClick}
        />
      </li>
    </ul>
  ));
