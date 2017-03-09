import * as React from 'react';
import {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {LinkCardTrelloView} from '../src';
import {tallImage, wideImage, wideTransparentImage, smallImage} from './images';
import {StoryList} from '@atlaskit/media-test-helpers';

storiesOf('LinkCardTrelloView', {})
  .add('Default', () => (
    <LinkCardTrelloView
      linkUrl={'https://trello.com/b/hlo7gRqs/shpxxxviii-60'}
      title={'Trello'}
      thumbnailUrl={'https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/fb4de993e22034b76539da073ea8d35c/home-hero.png'}
      iconUrl={'https://d78fikflryjgj.cloudfront.net/images/ios/0307bc39ec6c9ff499c80e18c767b8b1/apple-touch-icon-152x152-precomposed.png'}
      lists={[{
        name: 'todo',
        count: 20
      }, {
        name: 'doing',
        count: 6
      }, {
        name: 'done',
        count: 2
      }]}
      members={[
        {
          avatarUrl: 'https://robohash.org/hectorzarco.png?set=set2&size=80x80',
          username: 'hector'
        },
        {
          avatarUrl: 'https://robohash.org/michaeljames.png?set=set1&size=80x80',
          username: 'michael'
        },
        {
          avatarUrl: 'https://robohash.org/jimmyluong.png?set=set3&size=80x80',
          username: 'jimmy'
        },
        {
          avatarUrl: 'https://robohash.org/vadimkazakov.png?set=set3&size=80x80',
          username: 'vadim'
        }
      ]}
    />
  ));
