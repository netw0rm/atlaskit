import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {CardView} from '../src';

const tallImageDataUri = 'data:image/png;base64,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';

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

const styles = {
  statesWrapper: {
    listStyle: 'none',
    display: 'inline-block'
  },
  foo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stateTitle: {
    textAlign: 'center',
    padding: '5px'
  }
};

storiesOf('CardView', {})
  .add('Default', () => (
    <CardView
      loading={false}
      selectable={false}
      selected={false}
      mediaName="some image"
      mediaType="image"
      mediaSize={32831}
      dataURI={tallImageDataUri}
      onClick={onClick}
    />
  ))
  .add('Different name lengths', () => (
    <ul style={styles.statesWrapper}>
      <li style={styles.foo}>
        <div style={styles.stateTitle}>Sort name</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="My awesome file.tsx"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.foo}>
        <div style={styles.stateTitle}>2 lines name</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Hey guys this is my awesome file.tsx"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.foo}>
        <div style={styles.stateTitle}>Long name</div>
        <CardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum Nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat ut pariatur.js"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.foo}>
        <div style={styles.stateTitle}>Large width</div>
        <CardView
          width={380}
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat ut pariatur.json"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
      <li style={styles.foo}>
        <div style={styles.stateTitle}>Long name with large width</div>
        <CardView
          width={380}
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Lorem ipsum nulla veniam exercitation duis sit ut in sed consectetur dolore cupidatat sedconsectetur dolore cupidatat seddolore cupidatat sed sed consectetur dolore cupidatat ut pariatur.json"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
    </ul>
  ))
  .add('Custom sized', () => (
    <CardView
      height={250}
      width={380}
      loading={false}
      selectable={false}
      selected={false}
      mediaName="some image"
      mediaType="image"
      mediaSize={32831}
      dataURI={tallImageDataUri}
      onClick={onClick}
    />
  ))
  .add('With Progress', () => (
    <CardView
      loading={false}
      selectable={false}
      selected={false}
      mediaName="with_progress.png"
      mediaType="image"
      mediaSize={32831}
      dataURI={tallImageDataUri}
      progress={0.5}
      onClick={onClick}
    />
  ))
  .add('Loading states', () => (
    <ul style={styles.statesWrapper}>
      <li style={styles.foo}>
        <div style={styles.stateTitle}>Infinite loading</div>
        <CardView
          loading={true}
          selectable={false}
          selected={false}
          mediaName="loading.png"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImageDataUri}
          onClick={onClick}
        />
      </li>
    </ul>
  ))
  .add('Error', () => (
    <CardView
      mediaName="with_progress.wav"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
    />
  ))
  .add('Error with long name', () => (
    <CardView
      mediaName="Screen_shot_2016_at_10.45.32_AM.jpg"
      mediaType="image"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
    />
  ))
  .add('Error with long name and spaces', () => (
    <CardView
      mediaName="Screen Shot 2016 at 10.45.32 AM.jpg"
      mediaType="image"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
    />
  ))
  .add('Error with handler, menu actions', () => (
    <CardView
      mediaName="with_progress.wav"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
      onRetry={{handler: onRetry}}
      menuActions={menuActions}
    />
  ))
  .add('Error with handler, menu actions, custom size', () => (
    <CardView
      height={250}
      width={380}
      mediaName="with_progress.wav"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
      onRetry={{handler: onRetry}}
      menuActions={menuActions}
    />
  ))
  .add('Error with handler, no menu actions', () => (
    <CardView
      mediaName="with_progress.wav"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
      error={'Could not load file'}
      onRetry={{handler: onRetry}}
    />
  ));
