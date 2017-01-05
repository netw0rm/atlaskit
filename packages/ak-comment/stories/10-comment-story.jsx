import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from 'ak-avatar';

import Comment from '../src';
import { name } from '../package.json';
import { clickHandler, sampleText } from './_constants';
import sampleAvatarImg from './sample-avatar.png';

const sampleAvatar = <Avatar src={sampleAvatarImg} label="User avatar" />;

storiesOf(name, module)
  .add('simple ak-comment', () => (
    <Comment
      avatar={sampleAvatar}
      author="John Smith"
      type="Author"
      datetime="30, August 2016"
      content={[<p>{sampleText}</p>, <p>{sampleText}</p>]}
      actions={[
        { content: 'Reply', onClick: clickHandler },
        { content: 'Edit', onClick: clickHandler },
        { content: 'Delete', onClick: clickHandler },
        { content: 'Like', onClick: clickHandler },
      ]}
    />
  ))
  .add('a simple ak-comment with no top and bottom bars', () => (
    <Comment avatar={sampleAvatar} content={<p>{sampleText}</p>} />
  ))
  .add('ak-comment with different avatar sizes', () => {
    const avatarWithSize = size => (
      <Comment
        avatar={<Avatar src={sampleAvatarImg} label="User avatar" size={size} />}
        author="John Smith"
        type="Author"
        datetime="30, August 2016"
        content={<div>
          <p>{size} avatar</p>
          <p>{sampleText}</p>
        </div>}
        actions={[
          { content: 'Reply', onClick: clickHandler },
          { content: 'Edit', onClick: clickHandler },
          { content: 'Delete', onClick: clickHandler },
          { content: 'Like', onClick: clickHandler },
        ]}
      />
    );
    return (
      <div>
        {['small', 'medium', 'large', 'xlarge'].map(size => avatarWithSize(size))}
      </div>
    );
  })
  .add('ak-comment with img avatar', () => (
    <Comment
      avatar={<img src={sampleAvatarImg} alt="img avatar" height="40" width="40" />}
      content={(<p>{sampleText}</p>)}
    />
  ));
