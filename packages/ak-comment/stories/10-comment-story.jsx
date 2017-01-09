import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import Avatar from 'ak-avatar';

import Comment, { CommentAction, CommentAuthor, CommentTime } from '../src';
import { name } from '../package.json';
import { clickHandler, sampleText } from './_constants';
import sampleAvatarImg from './sample-avatar.png';

const sampleAvatar = <Avatar src={sampleAvatarImg} label="User avatar" />;

storiesOf(name, module)
  .add('simple ak-comment', () => (
    <Comment
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={sampleAvatar}
      time={<CommentTime>30, August 2016</CommentTime>}
      type="Author"
      content={[<p>{sampleText}</p>, <p>{sampleText}</p>]}
      actions={[
        <CommentAction onClick={clickHandler}>Reply</CommentAction>,
        <CommentAction onClick={clickHandler}>Edit</CommentAction>,
        <CommentAction onClick={clickHandler}>Delete</CommentAction>,
        <CommentAction onClick={clickHandler}>Like</CommentAction>,
      ]}
    />
  ))
  .add('ak-comment with no top and bottom bars', () => (
    <Comment avatar={sampleAvatar} content={<p>{sampleText}</p>} />
  ))
  .add('ak-comment with different mouse event handlers', () => {
    const mouseOverHandler = event => action(`${event.target.textContent} button got mouseOver.`)();
    const focusHandler = event => action(`${event.target.textContent} button got focus.`)();
    return (
      <Comment
        author={
          <CommentAuthor onClick={clickHandler} onMouseOver={mouseOverHandler}>
            John Smith (click or hover)
          </CommentAuthor>
        }
        avatar={sampleAvatar}
        time={
          <CommentTime onClick={clickHandler} onMouseOver={mouseOverHandler}>
            30, August 2016 (click or hover)
          </CommentTime>
        }
        type="Author"
        content={[<p>{sampleText}</p>, <p>{sampleText}</p>]}
        actions={[
          <CommentAction onClick={clickHandler}>Click</CommentAction>,
          <CommentAction onMouseOver={mouseOverHandler}>Hover</CommentAction>,
          <CommentAction onFocus={focusHandler}>Focus</CommentAction>,
        ]}
      />
    );
  })
  .add('ak-comment with different avatar sizes', () => {
    const avatarWithSize = size => (
      <Comment
        author={<CommentAuthor>John Smith</CommentAuthor>}
        avatar={<Avatar src={sampleAvatarImg} label="User avatar" size={size} />}
        type="Author"
        time={<CommentTime>30, August 2016</CommentTime>}
        content={<div>
          <p>{size} avatar</p>
          <p>{sampleText}</p>
        </div>}
        actions={[
          <CommentAction onClick={clickHandler}>Reply</CommentAction>,
          <CommentAction onClick={clickHandler}>Edit</CommentAction>,
          <CommentAction onClick={clickHandler}>Delete</CommentAction>,
          <CommentAction onClick={clickHandler}>Like</CommentAction>,
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
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={<img src={sampleAvatarImg} alt="img avatar" height="40" width="40" />}
      content={(<p>{sampleText}</p>)}
    />
  ));
