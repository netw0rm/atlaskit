import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';
import { EmojiProvider } from '../src/api/EmojiResource';

import { getEmojiResource, lorem } from './story-data';
import TriggeredEmojiResource from './TriggeredEmojiResource';

interface SampleEmojiProps {
  emojiProvider?: Promise<EmojiProvider>;
}

// tslint:disable-next-line:variable-name
const SampleEmojis = (props: SampleEmojiProps) => (
  <span>
    <ResourcedEmoji
      emojiId={{ shortName: ':grimacing:' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':awthanks:' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':shrug:' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':disappear:' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':badpokerface:' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':freddie:' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':not-an-emoji:' }}
      emojiProvider={props.emojiProvider || getEmojiResource() as Promise<EmojiProvider>}
    />
  </span>
);

storiesOf(`${name}/ResourcedEmoji by shortName`, module)
  .add('resourced emoji shortName', () => (
    <SampleEmojis />
  ))
  .add('skin tones', () => (
    <span>
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-2:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-3:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-4:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-5:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-6:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-7:' /* invalid - will fallback to text render */ }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
      />
    </span>
  ))  .add('Content resourced emoji shortName', () => (
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
  .add('slow loading emoji shortName', () => {
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

    const handleStandardRef = (ref) => { loadStandardRef = ref; };
    const handleAtlassianRef = (ref) => { loadAtlassianRef = ref; };

    return (
      <div>
        <SampleEmojis emojiProvider={Promise.resolve(emojiResource)} />
        <div>
          <button onClick={loadStandard} ref={handleStandardRef}>Load Standard Emojis</button>
          <button onClick={loadAtlassian} ref={handleAtlassianRef}>Load Atlassian Emojis</button>
        </div>
      </div>
    );
  });

