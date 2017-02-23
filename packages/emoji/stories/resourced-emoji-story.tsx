import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';
import { EmojiProvider } from '../src/api/EmojiResource';

// import { MockEmojiResourceConfig } from '../test/MockEmojiResource';
import { getEmojiResource, lorem } from './story-data';
import TriggeredEmojiResource from './TriggeredEmojiResource';

interface SampleEmojiProps {
  emojiProvider?: Promise<EmojiProvider>;
}

// tslint:disable-next-line:variable-name
const SampleEmojis = (props: SampleEmojiProps) => (
  <span>
    <ResourcedEmoji
      id={{id: '1f62c'/* grimacing */}}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      id={{id: 'atlassian-awthanks'}}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      id={{id: 'not-an-emoji'}}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
  </span>
);

storiesOf(`${name}/Resourced Emoji`, module)
  .add('resourced emoji', () => (
    <SampleEmojis />
  ))
  .add('Content resourced emoji', () => (
    <div>
      <h1>Heading 1 <SampleEmojis /></h1>
      <h2>Heading 2 <SampleEmojis /></h2>
      <h3>Heading 3 <SampleEmojis /></h3>
      <h4>Heading 4 <SampleEmojis /></h4>
      <h5>Heading 5 <SampleEmojis /></h5>
      <h6>Heading 6 <SampleEmojis /></h6>
      <p>Paragraph <SampleEmojis /></p>
      <code>Code <SampleEmojis /></code>
      <p>{lorem} <SampleEmojis /> {lorem} <SampleEmojis /> {lorem} <SampleEmojis /> {lorem}</p>
    </div>
  ))
  .add('slow loading emoji', () => {
    let loadStandardRef;
    let loadAtlassianRef;
    const emojiResource: TriggeredEmojiResource = new TriggeredEmojiResource();

    const loadStandard = () => {
      emojiResource.triggerStandardLoaded();
      if (loadStandardRef) {
        loadStandardRef.disabled = 'disabled';
      }
    };

    const loadAtlassian = () => {
      emojiResource.triggerAtlassianLoaded();
      if (loadAtlassianRef) {
        loadAtlassianRef.disabled = 'disabled';
      }
    };

    return (
      <div>
        <SampleEmojis emojiProvider={Promise.resolve(emojiResource)} />
        <div>
          <button onClick={loadStandard} ref={(ref) => { loadStandardRef = ref; }}>Load Standard Emojis</button>
          <button onClick={loadAtlassian} ref={(ref) => { loadAtlassianRef = ref; }}>Load Atlassian Emojis</button>
        </div>
      </div>
    );
  });

