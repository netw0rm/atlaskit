import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, MediaItemType, ListCardDelete, ListCardClick } from '@atlaskit/media-core';
import { createStorybookContext, defaultCollectionName } from '@atlaskit/media-test-helpers';
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

storiesOf('FilmStrip', {})
  .add('Default', () => {
    const items = [
      {
        id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
        mediaItemType: fileType
      },
      {
        id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
        mediaItemType: fileType
      },
      {
        id: 'cee59267-e920-4fc3-b1e9-94235fdb7065',
        mediaItemType: fileType
      }
    ];
    return (
      <FilmStrip
        context={context}
        items={items}
        collectionName={collectionName}
        actions={cardsActions}
      />
    );
  })
  .add('Fixed wrapper width', () => {
    const items = [
      {
        id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
        mediaItemType: fileType
      },
      {
        id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
        mediaItemType: fileType
      },
      {
        id: 'cee59267-e920-4fc3-b1e9-94235fdb7065',
        mediaItemType: fileType
      }
    ];
    return <div style={{ width: '250px', margin: '50px', padding: '20px', border: '2px solid #60a9ff', borderRadius: '3px' }}>
      <FilmStrip
        context={context}
        items={items}
        collectionName={collectionName}
        actions={cardsActions}
      />
    </div>;
  })
  .add('With custom card size', () => {
    const items = [
      {
        id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
        mediaItemType: fileType
      },
      {
        id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
        mediaItemType: fileType
      },
      {
        id: 'cee59267-e920-4fc3-b1e9-94235fdb7065',
        mediaItemType: fileType
      }
    ];
    return (
      <FilmStrip
        items={items}
        cardHeight={300}
        cardWidth={300}
        context={context}
        collectionName={collectionName}
        actions={cardsActions}
      />
    );
  });
