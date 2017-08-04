import { storiesOf, action } from '@kadira/storybook';

import * as React from 'react';

import { customCategory } from '../src/constants';
import { name } from '../package.json';
import { EmojiDescription, EmojiId, OnEmojiEvent, OptionalEmojiDescription } from '../src/types';

import { ResourcedEmojiList, ResourcedFilteredEmojiList } from './demo-resourced-emoji-list';
import ResourcedEmojiControl from './demo-resource-control';
import ResourcedEmojiById from './demo-resourced-emoji-by-id';
import EmojiPickerTextInput from './demo-emoji-picker-text-input';
import ResourceEmojiControlShowingUsage, { UsagePeekEmojiResource } from './demo-emoji-picker-showing-usage';
import EmojiTypeAheadTextInput from './demo-emoji-typeahead-text-input';
import { getEmojiResource } from '../src/support/story-data';
import EmojiResource, { EmojiResourceConfig } from '../src/api/EmojiResource';

declare var require: {
    <T>(path: string): T;
};

let emojiConfig;
try {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  emojiConfig = require('../local-config')['default'];
} catch (e) {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  emojiConfig = require('../local-config-example')['default'];
}

const defaultEmojiProvider = Promise.resolve(getEmojiResource());

const defaultResourceRefresher = (config: EmojiResourceConfig) =>  new EmojiResource(config);

storiesOf(`${name}/external-emoji`, module)
  .add('resourced picker', () => {
    const picker = (
      <EmojiPickerTextInput
        onSelection={action('emoji selected')}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiResource={new EmojiResource(emojiConfig)}
        resourceRefresher={defaultResourceRefresher}
        emojiConfig={emojiConfig}
        children={picker}
      />
    );
  })
  .add('resourced picker - allow uploads', () => {
    const picker = (
      <EmojiPickerTextInput
        onSelection={action('emoji selected')}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiResource={new EmojiResource(emojiConfig)}
        resourceRefresher={defaultResourceRefresher}
        emojiConfig={{
          ...emojiConfig,
          allowUpload: true,
        }}
        children={picker}
      />
    );
  })
  .add('resourced typeahead', () => {
    const typeAhead = (
      <EmojiTypeAheadTextInput
        label="Emoji search"
        onSelection={action('emoji selected')}
        position="below"
        afterContent={true}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiResource={new EmojiResource(emojiConfig)}
        resourceRefresher={defaultResourceRefresher}
        emojiConfig={emojiConfig}
        children={typeAhead}
      />
    );
  })
  .add('resource emoji', () => {
    const emojiIds: EmojiId[] = [
      { shortName: ':grimacing:', id: '1f62c' },
      { shortName: ':disappear:', id: 'atlassian-disappear' },
      { shortName: ':not-known:', id: 'bogus-not-known' },
    ];
    const emojiList = (
      <ResourcedEmojiList
        emojiIds={emojiIds}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiResource={new EmojiResource(emojiConfig)}
        resourceRefresher={defaultResourceRefresher}
        emojiConfig={emojiConfig}
        children={emojiList}
      />
    );
  })
  .add('resource emoji - all media api', () => {
    const filter = (emoji: EmojiDescription) => (emoji.category === customCategory);
    const emojiList = (
      <ResourcedFilteredEmojiList
        filter={filter}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiResource={new EmojiResource(emojiConfig)}
        resourceRefresher={defaultResourceRefresher}
        emojiConfig={emojiConfig}
        children={emojiList}
      />
    );
  })
  .add('resource emoji - by id', () => {
    const emojiById = (
      <ResourcedEmojiById
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <div>

        <ResourcedEmojiControl
          emojiResource={new EmojiResource(emojiConfig)}
          resourceRefresher={defaultResourceRefresher}
          emojiConfig={emojiConfig}
          children={emojiById}
        />
      </div>
    );
  })
  .add('resourced picker with recording of used emoji', () => {

    const emojiResource = new UsagePeekEmojiResource(emojiConfig);

    const recordEmojiUsage: OnEmojiEvent = (emojiId: EmojiId, emoji: OptionalEmojiDescription) => {
      if (emoji) {
        action(`Recording selection of emoji: id=${emojiId.id}, shortName=${emojiId.shortName}`);
        emojiResource.recordSelection(emoji);
      } else {
        action(`Not recording selection of emoji: id=${emojiId.id}, shortName=${emojiId.shortName}. No EmojiDescription`);
      }
    };

    const picker = (
      <EmojiPickerTextInput
        onSelection={recordEmojiUsage}
        emojiProvider={defaultEmojiProvider}
      />
    );

    return (
      <ResourceEmojiControlShowingUsage
        emojiResource={emojiResource}
        emojiConfig={emojiConfig}
        children={picker}
      />
    );
  });
