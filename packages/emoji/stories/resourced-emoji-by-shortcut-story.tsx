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
      emojiId={{ shortcut: 'grimacing' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      emojiId={{ shortcut: 'awthanks' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      emojiId={{ shortcut: 'not-an-emoji' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
  </span>
);

storiesOf(`${name}/ResourcedEmoji by shortcut`, module)
  .add('resourced emoji shortcut', () => (
    <SampleEmojis />
  ))
  .add('skin tones', () => (
    <span>
      <ResourcedEmoji
        emojiId={{ shortcut: 'thumbsup' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortcut: 'thumbsup', modifiers: { skinTone: 1 } }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortcut: 'thumbsup', modifiers: { skinTone: 2 } }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortcut: 'thumbsup', modifiers: { skinTone: 3 } }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortcut: 'thumbsup', modifiers: { skinTone: 4 } }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortcut: 'thumbsup', modifiers: { skinTone: 5 } }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortcut: 'thumbsup', modifiers: { skinTone: 6 /* invalid - will fallback to default */ } }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
    </span>
  ))  .add('Content resourced emoji shortcut', () => (
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
  .add('slow loading emoji shortcut', () => {
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

