import { storiesOf, action } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';

import {
  MediaGroup,
  Media,
} from '../../src/renderer/react/nodes';
import { EventHandlers } from '../../src/ui/Renderer';

import { CardEvent } from '@atlaskit/media-card';

import ProviderFactory from '../../src/providerFactory';
import { storyMediaProviderFactory, storyDecorator } from '../../src/test-helper';

import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';

import {
  videoFileId,
  audioFileId,
  imageFileId,
  unknownFileId,
  youtubeLinkId,
  spotifyLinkId,
  genericLinkId,
  imageLinkId,
  trelloLinkId,
} from '@atlaskit/media-test-helpers';

const mediaProvider = storyMediaProviderFactory({
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
});

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('nodes/media', () => {
    const providerFactory = new ProviderFactory();
    providerFactory.setProvider('mediaProvider', mediaProvider);
    const eventHandlers: EventHandlers = {
      media: {
        onClick: (result: CardEvent) => {
          // json-safe-stringify does not handle cyclic references in the react mouse click event
          return action('Media click')('[react.MouseEvent]', result.mediaItemDetails);
        }
      }
    };

    return (
      <div>
        <h3>A single media file</h3>
        <MediaGroup>
          <Media
            id={imageFileId.id}
            type={imageFileId.mediaItemType}
            collection={imageFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
        </MediaGroup>
        <h3>Multiple files in a strip</h3>
        <MediaGroup>
          <Media
            id={imageFileId.id}
            type={imageFileId.mediaItemType}
            collection={imageFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={videoFileId.id}
            type={videoFileId.mediaItemType}
            collection={videoFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={audioFileId.id}
            type={audioFileId.mediaItemType}
            collection={audioFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={unknownFileId.id}
            type={unknownFileId.mediaItemType}
            collection={unknownFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
        </MediaGroup>
        <h3>A single media link</h3>
        <MediaGroup>
          <Media
            id={youtubeLinkId.id}
            type={youtubeLinkId.mediaItemType}
            collection={youtubeLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
        </MediaGroup>
        <br/>
        <MediaGroup>
          <Media
            id={imageLinkId.id}
            type={imageLinkId.mediaItemType}
            collection={imageLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
        </MediaGroup>
        <br/>
        <MediaGroup>
          <Media
            id="80e2bd90-3d97-4e8c-b38d-79ee0e40bbf3"
            type="link"
            collection={genericLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
        </MediaGroup>
        <h3>Multiple media links</h3>
        <MediaGroup>
          <Media
            id={spotifyLinkId.id}
            type={spotifyLinkId.mediaItemType}
            collection={spotifyLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={imageLinkId.id}
            type={imageLinkId.mediaItemType}
            collection={imageLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={genericLinkId.id}
            type={genericLinkId.mediaItemType}
            collection={genericLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id="80e2bd90-3d97-4e8c-b38d-79ee0e40bbf3"
            type="link"
            collection={genericLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={trelloLinkId.id}
            type={trelloLinkId.mediaItemType}
            collection={trelloLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={youtubeLinkId.id}
            type={youtubeLinkId.mediaItemType}
            collection={youtubeLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
        </MediaGroup>
        <h3>Mixed media files and links in the same group</h3>
        <MediaGroup>
          <Media
            id={imageFileId.id}
            type={imageFileId.mediaItemType}
            collection={imageFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={videoFileId.id}
            type={videoFileId.mediaItemType}
            collection={videoFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={genericLinkId.id}
            type={genericLinkId.mediaItemType}
            collection={genericLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={audioFileId.id}
            type={audioFileId.mediaItemType}
            collection={audioFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id="80e2bd90-3d97-4e8c-b38d-79ee0e40bbf3"
            type="link"
            collection={genericLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={imageLinkId.id}
            type={imageLinkId.mediaItemType}
            collection={imageLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={trelloLinkId.id}
            type={trelloLinkId.mediaItemType}
            collection={trelloLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={unknownFileId.id}
            type={unknownFileId.mediaItemType}
            collection={unknownFileId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
          <Media
            id={youtubeLinkId.id}
            type={youtubeLinkId.mediaItemType}
            collection={youtubeLinkId.collectionName}
            providers={providerFactory}
            eventHandlers={eventHandlers}
          />
        </MediaGroup>
      </div>
    );
  })
;
