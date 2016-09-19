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
      <div is slot="avatar">
        <a href="#"><Avatar src={transparentAvatarUrl} label="Ross" /></a>
      </div>
      <div is slot="author">
        <a href="#">Ross Somebody</a>
      </div>
      <div is slot="time">
        5 minutes ago
      </div>
      <div is slot="reply">
        <p>
          Nest the ak-comments in here. We might need a comment-group component for expand/collapse
          and maybe for border separators?
        </p>
      </div>
      <div is slot="actions">
        <ButtonGroup>
          <Button appearance="subtle" compact><Icon glyph="teams" /></Button>
          <Button appearance="subtle" compact><Icon glyph="create" /></Button>
          <Button appearance="subtle" compact><Icon glyph="snippets" /></Button>
        </ButtonGroup>
      </div>
      <p>Hello world!</p>
      <p>There would obviously <a href="#">be lots of content</a> in here</p>
      <ul>
        <li>Lists of stuff helps readability</li>
      </ul>
    </Comment>
  ));
