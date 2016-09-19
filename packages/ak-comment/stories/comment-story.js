import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkAvatar from 'ak-avatar';
import AkButton from 'ak-button';
import AkButtonGroup from 'ak-button-group';
import AkIcon from 'ak-icon';
import AkComment from '../src/index';
import React from 'react';
import { name } from '../package.json';

const Comment = reactify(AkComment);
const Avatar = reactify(AkAvatar);
const Button = reactify(AkButton);
const ButtonGroup = reactify(AkButtonGroup);
const Icon = reactify(AkIcon);
const transparentAvatarUrl = require('url!./face-w-transparency.png');

storiesOf(name, module)
  .add('a simple ak-comment', () => (
    <Comment>
      <Avatar slot="avatar" src={transparentAvatarUrl} label="Ross" />
      <a is slot="author" href="#">Ross Somebody</a>
      <time is slot="time" datetime="2016-09-20T19:00">5 minutes ago</time>
      <ButtonGroup slot="actions">
        <Button appearance="subtle" compact><Icon glyph="teams" /></Button>
        <Button appearance="subtle" compact><Icon glyph="create" /></Button>
        <Button appearance="subtle" compact><Icon glyph="snippets" /></Button>
      </ButtonGroup>
      <p>Hello world!</p>
      <p>There would obviously <a href="#">be lots of content</a> in here</p>
      <ul>
        <li>Lists of stuff helps readability</li>
      </ul>
      <div is slot="reply">
        <p>
          Nest the ak-comments in here. We might need a comment-group component for expand/collapse
          and maybe for border separators?
        </p>
      </div>
    </Comment>
  ));
