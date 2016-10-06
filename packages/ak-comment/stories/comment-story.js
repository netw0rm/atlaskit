import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkAvatar from 'ak-avatar';
import AkButton from 'ak-button';
import AkButtonGroup from 'ak-button-group';
import AkIcon from 'ak-icon';
import AkComment from '../src/index';
import React from 'react';
import { name } from '../package.json';
import transparentAvatarUrl from 'url!./face-w-transparency.png';
import hostStyles from '../src/host.less';

const Comment = reactify(AkComment);
const Avatar = reactify(AkAvatar);
const Button = reactify(AkButton);
const ButtonGroup = reactify(AkButtonGroup);
const Icon = reactify(AkIcon);
const commentClass = hostStyles.locals.akComment;

/* eslint-disable react/prop-types */
const MyComment = (props) => (
  <Comment className={commentClass} {...props}>
    <Avatar slot="avatar" src={transparentAvatarUrl} label="Ross" />
    <a is slot="author" href="#">{props.name}</a>
    <time is slot="time" datetime="2016-09-20T19:00">{props.time}</time>
    <ButtonGroup slot="actions">
      <Button appearance="subtle" compact><Icon glyph="teams" /></Button>
      <Button appearance="subtle" compact><Icon glyph="create" /></Button>
      <Button appearance="subtle" compact><Icon glyph="snippets" /></Button>
    </ButtonGroup>
    {props.children}
  </Comment>
);

storiesOf(name, module)
  .add('a simple ak-comment', () => (
    <MyComment name="John Smith" time="15 minutes ago">
      <p>Hey <a href="#">Barry</a>, how are you going?</p>
    </MyComment>
  ))
  .add('nested', () => (
    <MyComment name="John Smith" time="15 minutes ago">
      <p>Hey <a href="#">Barry</a>, how are you going?</p>
      <MyComment slot="reply" name="Barry Smith" time="3 minutes ago">
        <p>Pretty good now that I've seen these ak-comment components!</p>
      </MyComment>
    </MyComment>
  ));
