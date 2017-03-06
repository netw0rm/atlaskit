import * as React from 'react';
import { action, storiesOf } from '@kadira/storybook';

import { name } from '../package.json';
import Mention from '../src/components/Mention';
import ResourcedMention from '../src/components/Mention/ResourcedMention';
import { mentionData, mentionProvider } from '../test/_mock-mention-provider';

storiesOf(`${name}/Mention`, module)
  .add('Mention', () => (
    <Mention
      {...mentionData}
      onClick={action('onClick')}
      onMouseEnter={action('onMouseEnter')}
      onMouseLeave={action('onMouseLeave')}
    />
  ))
  .add('Highlighted mention', () => (
    <Mention
      {...mentionData}
      isHighlighted={true}
      onClick={action('onClick')}
      onMouseEnter={action('onMouseEnter')}
      onMouseLeave={action('onMouseLeave')}
    />
  ))
  .add('Resourced mention', () => (
    <ResourcedMention
      {...mentionData}
      mentionProvider={mentionProvider}
      onClick={action('onClick')}
      onMouseEnter={action('onMouseEnter')}
      onMouseLeave={action('onMouseLeave')}
    />
  ))
  .add('Highlighted resourced mention', () => (
    <ResourcedMention
      id="oscar"
      text="@Oscar Wallhult"
      mentionProvider={mentionProvider}
      onClick={action('onClick')}
      onMouseEnter={action('onMouseEnter')}
      onMouseLeave={action('onMouseLeave')}
    />
  ))
;
