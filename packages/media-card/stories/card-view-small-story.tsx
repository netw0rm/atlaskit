import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {CardViewSmall} from '../src';
import tallImageDataUri from './tall-image';

const onClick = (event: Event) => {
  action('click')();
};

const onRetry = () => {
  action('try again')();
};

storiesOf('CardViewSmall', {})
  .add('Document', () => (
    <CardViewSmall
      loading={false}
      mediaName="sea_creatures.mp3"
      mediaType="audio"
      mediaSize={32831}
      onClick={onClick}
    />
  ))
  .add('Image', () => (
    <CardViewSmall
      loading={false}
      mediaName="nature.png"
      mediaType="image"
      mediaSize={32831}
      dataURI={tallImageDataUri}
      onClick={onClick}
    />
  ))
  .add('Loading', () => (
    <CardViewSmall
      loading={true}
      mediaName="annual_report_2016_06_32.doc"
      mediaType="doc"
      mediaSize={32831}
      onClick={onClick}
    />
  ))
  .add('Error with handler', () => (
    <CardViewSmall
      onClick={onClick}
      error={'Could not load file'}
      onRetry={{handler: onRetry}}
    />
  ))
  .add('Error without handler', () => (
    <CardViewSmall
      onClick={onClick}
      error={'Could not load file'}
    />
  ));
