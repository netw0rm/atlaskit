import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';

import {
  Media,
} from '../../src/renderer/react/nodes';

import ProviderFactory from '../../src/providerFactory';
import { storyMediaProviderFactory, storyDecorator } from '../../src/test-helper';

import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';

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

    return (
      <Media
        id={'5556346b-b081-482b-bc4a-4faca8ecd2de'}
        type={'file'}
        collection={'MediaServicesSample'}
        providers={providerFactory}
      />
    );
  })
;
