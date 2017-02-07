import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import CardView from '../src/index';
import * as tallImageBase64 from 'base64!./images/tall.png';

const tallImageDataUri = 'data:image/png;base64,' + tallImageBase64;
const onClick = (event: Event) => {
  action('click');
};

storiesOf('CardView', {})
  .add('Default', () => (
    <CardView
      loading={false}
      selectable={false}
      selected={false}
      mediaName='some image'
      mediaType='image'
      mediaSize={32831}
      dataURI={tallImageDataUri}
      onClick={onClick}
    />
  ))
  .add('Custom sized', () => (
    <CardView
      height={250}
      width={380}
      loading={false}
      selectable={false}
      selected={false}
      mediaName='some image'
      mediaType='image'
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
      mediaName='with_progress.png'
      mediaType='image'
      mediaSize={32831}
      dataURI={tallImageDataUri}
      progress={0.5}
      onClick={onClick}
    />
  ));
