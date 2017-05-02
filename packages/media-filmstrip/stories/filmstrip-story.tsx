import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, ListCardDelete, ListCardClick } from '@atlaskit/media-core';
import { createStorybookContext, defaultCollectionName, StoryList,
         spotifyLinkId, genericLinkId, youtubeLinkId, trelloLinkId, playerLinkId, twitterLinkId,
         imageFileId, docFileId, genericFileId, imageLinkId } from '@atlaskit/media-test-helpers';
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

const file1 = imageFileId;
const file2 = docFileId;
const file3 = genericFileId;

const fileItems = [file1, file2, file3, imageLinkId];
const styles = {
  border: '1px solid black',
  paddingLeft: 0,
  height: '180px',
  overflow: 'scroll',
  position: 'relative'
};

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
          items={[genericLinkId]}
          collectionName={collectionName}
          actions={cardsActions}
        />
      }, {
        title: 'Single player link',
        content: <FilmStrip
          context={context}
          items={[playerLinkId]}
          collectionName={collectionName}
          actions={cardsActions}
        />
      }, {
        title: 'Single twitter link',
        content: <FilmStrip
          context={context}
          items={[twitterLinkId]}
          collectionName={collectionName}
          actions={cardsActions}
        />
      }, {
        title: 'Multiple links',
        content: <FilmStrip
          context={context}
          items={[genericLinkId, youtubeLinkId, genericLinkId, spotifyLinkId]}
          collectionName={collectionName}
          actions={cardsActions}
        />
      }]}
    </StoryList>
  ))
  .add('Lazy loading (single item)', () => {
    const filmstrip = () => <FilmStrip
      context={context}
      items={[file2]}
      collectionName={collectionName}
      actions={cardsActions}
    />;
    const smallList = <ul style={styles}>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
    </ul>;
    const largeList = <ul style={{...styles, height: '400px'}}>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
    </ul>;
    const visibleList = <ul style={{...styles, height: '600px'}}>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
    </ul>;
    const autoHeight = <ul style={{...styles, height: 'auto'}}>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{filmstrip()}</li>
    </ul>;

    return <StoryList>
      {[{
        title: 'Small container',
        content: smallList
      }, {
        title: 'Large container',
        content: largeList
      }, {
        title: 'All visible',
        content: visibleList
      }, {
        title: 'Auto height',
        content: autoHeight
      }]}
    </StoryList>;
  })
  .add('Lazy loading (multiple items)', () => {
    const onlyFilesFilmstrip = () => <FilmStrip
      context={context}
      items={[file1, file3, file2, file2, file1, file3, file3, file2, file1, file2]}
      collectionName={collectionName}
      actions={cardsActions}
    />;
    const filmstrip = () => <FilmStrip
      context={context}
      items={[file1, spotifyLinkId, file3, file2, trelloLinkId, twitterLinkId, playerLinkId, genericLinkId]}
      collectionName={collectionName}
      actions={cardsActions}
    />;
    const noFilesFilmstrip = () => <FilmStrip
      context={context}
      items={[spotifyLinkId, trelloLinkId, twitterLinkId, playerLinkId, genericLinkId]}
      collectionName={collectionName}
      actions={cardsActions}
    />;
    const filesList = <ul style={styles}>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
    </ul>;
    const linksList = <ul style={styles}>
      <li>{noFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
    </ul>;
    const mixedList = <ul style={styles}>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{filmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{noFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
      <li>{onlyFilesFilmstrip()}</li>
    </ul>;

    return <StoryList>
      {[{
        title: 'Only Files',
        content: filesList
      }, {
        title: 'Only Links',
        content: linksList
      }, {
        title: 'Mixed content',
        content: mixedList
      }]}
    </StoryList>;
  })
  .add('Mixed content', () => (
    <StoryList>
      {[{
        title: 'Links + files',
        content: <FilmStrip
          context={context}
          items={[trelloLinkId, file1, spotifyLinkId, file2]}
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
