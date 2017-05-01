import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import * as deepcopy from 'deepcopy';
import {MediaItemType, MediaItemDetails, FileDetails, UrlPreview, CardActionType} from '@atlaskit/media-core';
import {
  StoryList,

  // link details
  genericUrlPreview,
  genericLinkDetails,

  // file details
  genericFileDetails,
  videoFileDetails,
  audioFileDetails,
  docFileDetails,
  imageFileDetails,
  unknownFileDetails,

  gifDataUri,

  // dataURIs for file cards
  tallImage,
  wideImage,
  wideTransparentImage,
  smallImage,
  smallTransparentImage
} from '@atlaskit/media-test-helpers';

import {CardAppearance} from '../src';
import {CardView} from '../src/cardView';

const createErrorAndLoadingCards = (appearance: CardAppearance, mediaItemType: MediaItemType) => {
  return [
    {
      title: 'Loading',
      content: <CardView appearance={appearance} status="loading" mediaItemType={mediaItemType} />
    }, {
      title: 'Error',
      content: <CardView appearance={appearance} status="error" mediaItemType={mediaItemType} />
    }
  ];
};

const createMenuActionCards = (appearance: CardAppearance, metadata: MediaItemDetails) => {
  const actions = [
    {label: 'Open', type: undefined, handler: () => { action('open')(); }},
    {label: 'Close', type: undefined, handler: () => { action('close')(); }},
    {label: 'Delete', type: CardActionType.delete, handler: () => { action('delete')(); }}
  ];

  return [
    {
      title: 'Single menu action',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} actions={actions.slice(0, 1)} />
    },
    {
      title: 'Multiple menu actions',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} actions={actions} />
    },
    {
      title: 'Delete action',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} actions={actions.filter(a => a.type === CardActionType.delete)} />
    }
  ];
};

const createFileCardsWithDifferentDataURIs = (appearance: CardAppearance) => {
  const dataURIs = [
    {name: 'tall image', dataURI: tallImage},
    {name: 'wide image', dataURI: wideImage},
    {name: 'wide transparent image', dataURI: wideTransparentImage},
    {name: 'small image', dataURI: smallImage},
    {name: 'small transparent image', dataURI: smallTransparentImage},
  ];

  return Object.keys(dataURIs).map(key => {
    const {name, dataURI} = dataURIs[key];

    return {
      title: name,
      content: <CardView appearance={appearance} status="complete" metadata={genericFileDetails} dataURI={dataURI} />
    };
  });
};

const createMissingMetadataFileCards = (appearance: CardAppearance) => {
  const minimumDetails: FileDetails = {};

  const missingNameDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingNameDetails.name;

  const missingFileSizeDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingFileSizeDetails.size;

  const missingMediaTypeDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingMediaTypeDetails.mediaType;

  return [
    {
      title: 'No details',
      content: <CardView appearance={appearance} status="complete" metadata={minimumDetails} />
    },
    {
      title: 'Missing name',
      content: <CardView appearance={appearance} status="complete" metadata={missingNameDetails} dataURI={gifDataUri} />
    },
    {
      title: 'Missing file size',
      content: <CardView appearance={appearance} status="complete" metadata={missingFileSizeDetails} dataURI={gifDataUri} />
    },
    {
      title: 'Missing media type',
      content: <CardView appearance={appearance} status="complete" metadata={missingMediaTypeDetails} dataURI={gifDataUri} />
    },
    {
      title: 'Missing data uri',
      content: <CardView appearance={appearance} status="complete" metadata={missingMediaTypeDetails} />
    }
  ];
};

const createSelectableCards = (appearance: CardAppearance, metadata: MediaItemDetails, mediaItemType: MediaItemType) => {
  const dataURI = mediaItemType === 'file' ? gifDataUri : undefined;

  return [
    {
      title: 'Selectable',
      content: <CardView appearance={appearance} status="complete" metadata={metadata} dataURI={dataURI} selectable={true} />
    }, {
      title: 'Selected',
      content: <CardView appearance={appearance} status="complete" metadata={metadata}  dataURI={dataURI} selectable={true} selected={true} />
    }
  ];
};

const generateStoriesForFilesWithAppearance = (appearance: CardAppearance) => {
  const fileCards = createFileCardsWithDifferentDataURIs(appearance);

  const fileMediaTypeCards = [
    {
      title: 'Image',
      content: <CardView appearance={appearance} status="complete" metadata={imageFileDetails} />
    }, {
      title: 'Video',
      content: <CardView appearance={appearance} status="complete" metadata={videoFileDetails} />
    }, {
      title: 'Audio',
      content: <CardView appearance={appearance} status="complete" metadata={audioFileDetails} />
    }, {
      title: 'Doc',
      content: <CardView appearance={appearance} status="complete" metadata={docFileDetails} />
    }, {
      title: 'Unknown',
      content: <CardView appearance={appearance} status="complete" metadata={unknownFileDetails} />
    }
  ];

  // error and loading state
  const fileLoadingAndErrorCards = createErrorAndLoadingCards(appearance, 'file');

  // menu actions
  const fileMenuActionsCards = createMenuActionCards(appearance, imageFileDetails);

  // upload progress
  const uploadProgressCards = [
    {title: '10%', content: <CardView status="complete" appearance={appearance} metadata={genericFileDetails} dataURI={gifDataUri} progress={0.1} />},
    {title: '50%', content: <CardView status="complete" appearance={appearance} metadata={genericFileDetails} dataURI={gifDataUri} progress={0.5} />},
    {title: '90%', content: <CardView status="complete" appearance={appearance} metadata={genericFileDetails} dataURI={gifDataUri} progress={0.9} />}
  ];

  // selectable
  const fileSelectableCards = createSelectableCards(appearance, imageFileDetails, 'file');

  // missing metadata and/or data uri
  const fileMissingMetadataOrDataUriCards = createMissingMetadataFileCards(appearance);

  return (
    <div>
      <h3>Files</h3>
      <StoryList>{fileCards}</StoryList>

      <h4>Media Types - no placeholders</h4>
      <StoryList>{fileMediaTypeCards}</StoryList>

      <h4>Loading and error states</h4>
      <StoryList>{fileLoadingAndErrorCards}</StoryList>

      <h4>Menu actions</h4>
      <StoryList>{fileMenuActionsCards}</StoryList>

      {appearance === 'image' || appearance === 'auto' ? (
          <div>
            <h4>Upload progress</h4>
            <StoryList>{uploadProgressCards}</StoryList>
          </div>
        ) : null}

      {appearance === 'image' || appearance === 'auto' ? (
          <div>
            <h4>Seletable</h4>
            <StoryList>{fileSelectableCards}</StoryList>
          </div>
        ) : null}

      <h4>Missing metadata or data uri</h4>
      <StoryList>{fileMissingMetadataOrDataUriCards}</StoryList>
    </div>
  );
};

const createMissingMetadataLinkCards = (appearance: CardAppearance) => {
  const minimumDetails: UrlPreview = {
    type: 'link',
    url: 'some-url',
    title: 'Some url title'
  };

  const missingDescriptionPreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingDescriptionPreview.description;

  const missingSitePreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingSitePreview.site;

  const missingResourcesPreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingResourcesPreview.resources;

  const missingThumbnailPreview: UrlPreview = deepcopy(genericUrlPreview);
  missingThumbnailPreview.resources && delete missingThumbnailPreview.resources.thumbnail;

  const missingIconPreview: UrlPreview = deepcopy(genericUrlPreview);
  missingIconPreview.resources && delete missingIconPreview.resources.icon;

  return [
    {
      title: 'No details',
      content: <CardView appearance={appearance} status="complete" metadata={minimumDetails} />
    },
    {
      title: 'Missing description',
      content: <CardView appearance={appearance} status="complete" metadata={missingDescriptionPreview} />
    },
    {
      title: 'Missing site',
      content: <CardView appearance={appearance} status="complete" metadata={missingSitePreview} />
    },
    {
      title: 'Missing resources',
      content: <CardView appearance={appearance} status="complete" metadata={missingResourcesPreview} />
    },
    {
      title: 'Missing thumbnail',
      content: <CardView appearance={appearance} status="complete" metadata={missingThumbnailPreview} />
    },
    {
      title: 'Missing icon',
      content: <CardView appearance={appearance} status="complete" metadata={missingIconPreview} />
    }
  ];
};

const generateStoriesForLinksWithAppearance = (appearance: CardAppearance) => {
  const linkCard = [
    {
      title: `Link card "${appearance}"`,
      content: <CardView appearance={appearance} status="complete" metadata={genericLinkDetails} />
    }
  ];

  // loading and error
  const linkLoadingAndErrorCards = createErrorAndLoadingCards(appearance, 'link');

  // menu actions
  const linkMenuActionsCards = createMenuActionCards(appearance, genericLinkDetails);

  // missing metadata
  const linkMissingMetadataCards = createMissingMetadataLinkCards(appearance);

  return (
    <div>
      <h3>Links</h3>
      <StoryList>{linkCard}</StoryList>

      <h4>Loading and error states</h4>
      <StoryList>{linkLoadingAndErrorCards}</StoryList>

      <h4>Menu actions</h4>
      <StoryList>{linkMenuActionsCards}</StoryList>

      <h4>Missing metadata</h4>
      <StoryList>{linkMissingMetadataCards}</StoryList>
    </div>
  );
};

const generateStoriesForAppearance = (appearance: CardAppearance) => {
  const fileCardStories =  appearance !== 'square' && appearance !== 'horizontal'
    ? generateStoriesForFilesWithAppearance(appearance)
    : null;

  const linkCardStories = generateStoriesForLinksWithAppearance(appearance);

  return () => (
    <div>
      <h1 style={{margin: '10px 20px'}}>Small cards</h1>
      <div style={{margin: '20px 40px'}}>
        {fileCardStories}
        {linkCardStories}
      </div>
    </div>
  );
};

storiesOf('CardView', {})
  .add('Auto cards', generateStoriesForAppearance('auto'))
  .add('Small cards', generateStoriesForAppearance('small'))
  .add('Image cards', generateStoriesForAppearance('image'))
  .add('Horizontal cards', generateStoriesForAppearance('horizontal'))
  .add('Square cards', generateStoriesForAppearance('square'));
