import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Comment from '../src';
import { name } from '../package.json';
import { sampleText } from './_constants';

const clickHandler = (event) => {
  console.log(`${event.target.textContent} button was clicked.`);
};

storiesOf(name, module)
  .add('a simple ak-comment', () => (
    <Comment
      avatarLabel="User avatar"
      avatarSrc=""
      author="John Smith"
      type="Author"
      datetime="30, August 2016"
      content={(<p>{sampleText}</p>)}
      actions={[
        { content: 'Reply', onClick: clickHandler },
        { content: 'Edit', onClick: clickHandler },
        { content: 'Delete', onClick: clickHandler },
        { content: 'Like', onClick: clickHandler },
      ]}
    />
  ))
  .add('a simple ak-comment with no top and bottom bars', () => (
    <Comment content={(<p>{sampleText}</p>)} />
  ))
  .add('ak-comment with nested comments', () => (
    <Comment
      avatarLabel="User avatar"
      avatarSrc=""
      author="John Smith"
      type="Author"
      datetime="30, August 2016"
      content="Root-level comment"
      actions={[
        { content: 'Reply', onClick: clickHandler },
        { content: 'Edit', onClick: clickHandler },
        { content: 'Delete', onClick: clickHandler },
        { content: 'Like', onClick: clickHandler },
      ]}
    >
      <Comment
        avatarLabel="User avatar"
        avatarSrc=""
        author="John Smith"
        type="Author"
        datetime="31, August 2016"
        content="Child comment"
        actions={[
          { content: 'Reply', onClick: clickHandler },
          { content: 'Edit', onClick: clickHandler },
          { content: 'Delete', onClick: clickHandler },
          { content: 'Like', onClick: clickHandler },
        ]}
      >
        <Comment
          avatarLabel="User avatar"
          avatarSrc=""
          author="John Smith"
          type="Author"
          datetime="1, September 2016"
          content="3rd-level child comment"
          actions={[
            { content: 'Reply', onClick: clickHandler },
            { content: 'Edit', onClick: clickHandler },
            { content: 'Delete', onClick: clickHandler },
            { content: 'Like', onClick: clickHandler },
          ]}
        />
      </Comment>
      <Comment
        avatarLabel="User avatar"
        avatarSrc=""
        author="John Smith"
        type="Author"
        datetime="31, August 2016"
        content="Child comment 2"
        actions={[
          { content: 'Reply', onClick: clickHandler },
          { content: 'Edit', onClick: clickHandler },
          { content: 'Delete', onClick: clickHandler },
          { content: 'Like', onClick: clickHandler },
        ]}
      />
    </Comment>
  ));
