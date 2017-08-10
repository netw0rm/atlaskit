import { storiesOf, action } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyMediaProviderFactory, storyDecorator } from '../../src/test-helper';

import {
  Emoji,
  Mention,
  Media,
  MediaGroup,
  Paragraph,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '../../src/renderer/react/nodes';

import { EmojiProps } from '../../src/renderer/react/nodes/emoji';
import ProviderFactory from '../../src/providerFactory';
import { storyData as  emojiStoryData, testData as emojiTestData } from '@atlaskit/emoji/src/support';
import { toEmojiId } from '@atlaskit/emoji';

import {
  imageFileId
} from '@atlaskit/media-test-helpers';

import { EventHandlers } from '../../src/ui/Renderer';
import { CardEvent } from '@atlaskit/media-card';
import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('nodes/table', () => {
    const emojiProvider = emojiStoryData.getEmojiResource();
    const mediaProvider = storyMediaProviderFactory({
      defaultClientId,
      defaultServiceHost,
      defaultCollectionName,
      StoryBookTokenProvider,
    });
    const providerFactory = new ProviderFactory();
    providerFactory.setProvider('emojiProvider', emojiProvider);
    providerFactory.setProvider('mediaProvider', mediaProvider);

    const evilBurnsEmojiProps: EmojiProps = {
      ...toEmojiId(emojiTestData.evilburnsEmoji),
      providers: providerFactory
    };

    const eventHandlers: EventHandlers = {
      media: {
        onClick: (result: CardEvent) => {
          // json-safe-stringify does not handle cyclic references in the react mouse click event
          return action('Media click')('[react.MouseEvent]', result.mediaItemDetails);
        }
      }
    };

    return (
      <Table>
        <TableRow>
          <TableHeader>
            <Paragraph>This is a emoji</Paragraph>
          </TableHeader>
          <TableHeader>
            <Paragraph>This is a mention</Paragraph>
          </TableHeader>
          <TableHeader>
            <Paragraph>This is a media</Paragraph>
          </TableHeader>
        </TableRow>
        <TableRow>
          <TableCell>
            <Emoji {...evilBurnsEmojiProps}/>
          </TableCell>
          <TableCell>
            <Mention id="abcd-abcd-abcd" text="@Oscar Wallhult"/>
          </TableCell>
          <TableCell>
            <MediaGroup>
              <Media
                id={imageFileId.id}
                type={imageFileId.mediaItemType}
                collection={imageFileId.collectionName}
                providers={providerFactory}
                eventHandlers={eventHandlers}
              />
            </MediaGroup>
          </TableCell>
        </TableRow>
      </Table>
    );
  })
;
