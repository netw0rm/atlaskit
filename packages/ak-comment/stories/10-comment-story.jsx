import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Comment from '../src';
import { name } from '../package.json';
import { clickHandler, sampleText } from './_constants';

storiesOf(name, module)
  .add('a simple ak-comment', () => (
    <Comment
      avatarLabel="User avatar"
      avatarSrc=""
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
    <Comment content={<p>{sampleText}</p>} />
  ));
