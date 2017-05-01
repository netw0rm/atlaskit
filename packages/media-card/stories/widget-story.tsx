import * as React from 'react';
import {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {StoryList} from '@atlaskit/media-test-helpers';
import {tallImage, wideImage, wideTransparentImage, smallImage} from '@atlaskit/media-test-helpers';

import {FileCardView} from '../src/files/cardView';

const onClick = (event: Event) => {
  action('click')();
};

const onRetry = () => {
  action('try again')();
};

const actions = [
  {label: 'Open', handler: () => { action('open')(); }},
  {label: 'Close', handler: () => { action('close')(); }}
];

storiesOf('Widget', {})
  .add('Default', () => (
    <StoryList>
      {[{
        title: 'tallImage',
        content: <FileCardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Media name"
          mediaType="image"
          mediaSize={32831}
          dataURI={tallImage}
          onClick={onClick}
        />
      }, {
        title: 'wideImage',
        content: <FileCardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Media name"
          mediaType="image"
          mediaSize={32831}
          dataURI={wideImage}
          onClick={onClick}
        />
      }, {
        title: 'wideTransparentImage',
        content: <FileCardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Media name"
          mediaType="image"
          mediaSize={32831}
          dataURI={wideTransparentImage}
          onClick={onClick}
        />
      }, {
        title: 'smallImage',
        content: <FileCardView
          loading={false}
          selectable={false}
          selected={false}
          mediaName="Media name"
          mediaType="image"
          mediaSize={32831}
          dataURI={smallImage}
          onClick={onClick}
        />
      }]}
    </StoryList>
  ));
