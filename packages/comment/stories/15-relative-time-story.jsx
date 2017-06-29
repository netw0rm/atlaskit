import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';

import Comment, { CommentAction, CommentAuthor, CommentTime } from '../src';
import { name } from '../package.json';
import { clickHandler, sampleText } from './_constants';
import sampleAvatarImg from './sample-avatar.png';

const sampleAvatar = <Avatar src={sampleAvatarImg} label="User avatar" />;

const CommentWithRelativeTime = ({ timestamp }) => (
  <Comment
    author={<CommentAuthor>John Smith</CommentAuthor>}
    avatar={sampleAvatar}
    time={<CommentTime timestamp={timestamp} />}
    content={<div><p>{sampleText}</p></div>}
    actions={[
      <CommentAction onClick={clickHandler}>Reply</CommentAction>,
      <CommentAction onClick={clickHandler}>Edit</CommentAction>,
      <CommentAction onClick={clickHandler}>Delete</CommentAction>,
      <CommentAction onClick={clickHandler}>Like</CommentAction>,
    ]}
  />
);

const now = Date.now();
const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
const oneWeek = 7 * oneDay;

const timestamps = [
  now - (3 * oneSecond), // Just now
  now - (5 * oneMinute), // 5 minutes ago
  now - (2 * oneHour), // 2 hours ago
  now - (oneDay), // Yesterday
  now - (6 * oneDay), // 6 days ago
  now - (2 * oneWeek), // A long time ago (will use absolute time)
];

storiesOf(name, module)
  .add('comments with relative time', () => (
    <div style={{ width: 500 }}>
      {timestamps.map(timestamp => (
        <CommentWithRelativeTime key={timestamp} timestamp={timestamp} />
      ))}
    </div>
));
