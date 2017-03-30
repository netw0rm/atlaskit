import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, MediaItemType, ListCardDelete, ListCardClick } from '@atlaskit/media-core';
import { createStorybookContext, defaultCollectionName, StoryList } from '@atlaskit/media-test-helpers';
import {FilmStrip} from '../src';

const collectionName = defaultCollectionName;

const deleteAction = ListCardDelete((item: MediaItem, items: Array<{ id: string }>, e?: Event) => {
  action('delete')(item, items);
});

const clickAction = ListCardClick((item: MediaItem, items: Array<{ id: string }>, e?: Event) => {
  action('click')(item, items);
});

const annotateAction = {
  label: 'Annotate',
  handler: (item: MediaItem, items: Array<{ id: string }>, e?: Event) => {
    action('annotate')(item, items);
  }
};

const cardsActions = [deleteAction, clickAction, annotateAction];
const context = createStorybookContext();

const fileType: MediaItemType = 'file';
const linkType: MediaItemType = 'link';

const link1 = {
  id: 'fd119e6a-7881-4aac-8d31-daee546679ca',
  mediaItemType: linkType
};
const link2 = {
  id: 'e2365f30-1e08-4259-9372-56247303d1ec',
  mediaItemType: linkType
};
const linkPlayer = {
  id: '9cbceb52-c2b8-4573-8f02-7fa7b1fede89',
  mediaItemType: linkType
};
const file1 = {
  id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
  mediaItemType: fileType
};
const file2 = {
  id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
  mediaItemType: fileType
};
const file3 = {
  id: 'cee59267-e920-4fc3-b1e9-94235fdb7065',
  mediaItemType: fileType
};
const fileItems = [file1, file2, file3];

storiesOf('FilmStrip', {})
  .add('Default', () => (
    <FilmStrip
      context={context}
      items={fileItems}
      collectionName={collectionName}
      actions={cardsActions}
    />
  ))
  .add('Fixed wrapper width', () => (
    <div style={{ width: '250px', margin: '50px', padding: '20px', border: '2px solid #60a9ff', borderRadius: '3px' }}>
      <FilmStrip
        context={context}
        items={fileItems}
        collectionName={collectionName}
        actions={cardsActions}
      />
    </div>
  ))
  .add('Link support', () => (
    <StoryList>
      {[{
        title: 'Single generic link',
        content: <FilmStrip
          context={context}
          items={[link1]}
          collectionName={collectionName}
          actions={cardsActions}
        />
      }, {
        title: 'Single player link',
        content: <FilmStrip
          context={context}
          items={[linkPlayer]}
          collectionName={collectionName}
          actions={cardsActions}
        />
      }, {
        title: 'Multiple links',
        content: <FilmStrip
          context={context}
          items={[link1, link2]}
          collectionName={collectionName}
          actions={cardsActions}
        />
      }]}
    </StoryList>
  ))
  .add('Mixed content', () => (
    <StoryList>
      {[{
        title: 'Links + files',
        content: <FilmStrip
          context={context}
          items={[link1, file1, link2, file2]}
          collectionName={collectionName}
          actions={cardsActions}
        />
      }]}
    </StoryList>
  ))
  .add('With custom card size', () => (
    <FilmStrip
      items={fileItems}
      cardDimensions={{width: 300, height: 300}}
      context={context}
      collectionName={collectionName}
      actions={cardsActions}
    />
  ));
