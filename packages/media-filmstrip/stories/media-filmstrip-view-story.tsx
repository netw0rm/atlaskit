/* tslint:disable:variable-name */
import styled from 'styled-components';
import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import {FilmStripView, FilmStripViewItem, FilmStripCardClickEvent} from '../src';
import {ListActionCreator, CardActionType, ListEventHandler} from '@atlaskit/media-core';
import {deleteAction, tallImage} from '@atlaskit/media-test-helpers';

export const ListCardDelete: ListActionCreator = (eventHander: ListEventHandler) => {
  return {
    label: 'Delete',
    type: CardActionType.delete,
    handler: eventHander
  };
};

const clickAction = (event: FilmStripCardClickEvent) => {
  action('click')(event.item, event.items);
};

const menuActions = [deleteAction];
const ChatWrapper = styled.div`
  border: 2px solid #60a9ff;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  margin: 10p;
`;

const defaultItem: FilmStripViewItem = {
  dataURI: tallImage,
  mediaName: 'some image',
  mediaType: 'image',
  mediaSize: 8041
};

storiesOf('FilmStripView', {})
  .add('Fixed width', () => {
    const items: Array<FilmStripViewItem> = [
      {
        loading: true,
        mediaName: 'loading...',
        mediaType: 'image',
        mediaSize: 8041
      },
      {
        id: '2323r23-r23fsdfsd-few32r2r23-fsdfsdfs',
        progress: 0.75,
        dataURI: tallImage,
        mediaName: 'Lorem ipsum Cillum magna velit fugiat ut commodo laborum sint nisi adipisicing culpa sunt magna ex do commodo in nisi ullamco.',
        mediaType: 'image',
        mediaSize: 8041
      },
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem
    ];
    return <ChatWrapper>
            <FilmStripView
              items={items}
              onCardClick={clickAction}
              menuActions={menuActions}
              width={550}
            />
           </ChatWrapper>;
  }).add('Auto width with few cards', () => {
    const items: Array<FilmStripViewItem> = [
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem
    ];
    return (
      <FilmStripView
        items={items}
        onCardClick={clickAction}
        menuActions={menuActions}
      />
    );
  }).add('Auto width with a lot of cards', () => {
    const items: Array<FilmStripViewItem> = [
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem,
      defaultItem
    ];
    return (
      <FilmStripView
        items={items}
        onCardClick={clickAction}
        menuActions={menuActions}
      />
    );
  }).add('Only one item', () => {
    const items: Array<FilmStripViewItem> = [defaultItem];
    const SmallChatWrapper = styled(ChatWrapper)`
      width: 50px;
    `;

    return <SmallChatWrapper>
      <FilmStripView
        items={items}
        onCardClick={clickAction}
        menuActions={menuActions}
      />
    </SmallChatWrapper>;
  });

