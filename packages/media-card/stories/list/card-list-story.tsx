import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, ContextFactory, ListCardDelete, ListCardClick } from '@atlaskit/media-core';
import { StoryBookTokenProvider, defaultServiceHost, defaultCollectionName } from '@atlaskit/media-test-helpers';
import { CardList } from '../../src';
import {StoryList, createStorybookContext} from '@atlaskit/media-test-helpers';

const collectionName = defaultCollectionName;
const wrongCollection = 'adfasdf';
const wrongClientId = 'wrong-client-id';

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
const wrongContext = createStorybookContext(wrongClientId);

storiesOf('CardList', {})
  .add('Normal cards', () => (
    <CardList
      context={context}
      collectionName={collectionName}
      actions={[clickAction]}
    />
  ))
  .add('Caching', () => (
    <StoryList>
      {[{
        title: 'Normal card',
        content: <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
          cardType={'small'}
        />
      }, {
        title: 'Small card',
        content: <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
          cardType={'small'}
        />
      }, {
        title: 'Small card',
        content: <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
          cardType={'small'}
        />
      }, {
        title: 'Normal Card',
        content: <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
        />
      }, {
        title: 'Normal card',
        content: <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
        />
      }, {
        title: 'Normal card',
        content: <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
        />
      }]}
    </StoryList>
  ))
  .add('Small cards', () => (
    <StoryList>
      {[{
        title: 'Adapt parent width',
        content: <div style={{border: '1px solid', width: '200px', overflow: 'hidden'}}>
          <CardList
            context={context}
            collectionName={collectionName}
            actions={[clickAction]}
            cardType={'small'}
          />
        </div>
      }, {
        title: 'Small parent width',
        content: <div style={{border: '1px solid', width: '100px', overflow: 'hidden'}}>
          <CardList
            context={context}
            collectionName={collectionName}
            actions={[clickAction]}
            cardType={'small'}
          />
        </div>
      }, {
        title: 'Default',
        content: <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          cardType={'small'}
        />
      }]}
    </StoryList>
  ))
  .add('Custom actions dropdown', () => (
    <CardList
      context={context}
      collectionName={collectionName}
      actions={cardsActions}
    />
  ))
  .add('Custom loading state', () => {
    const customLoadingComponent = <div>loading...</div>;
    return <CardList
      context={context}
      loadingComponent={customLoadingComponent}
      collectionName={collectionName}
      actions={cardsActions}
    />;
  })
  .add('Custom error state', () => {
    const style = {
      color: 'red',
      fontSize: '30px'
    };
    const customErrorComponent = <div style={style}>Something went wrong :\</div>;
    return <CardList
      context={wrongContext}
      errorComponent={customErrorComponent}
      collectionName={wrongCollection}
      actions={cardsActions}
    />;
  })
  .add('Custom empty state', () => {
    const customEmptyComponent = <div>No items (this is a custom component)</div>;
    return <CardList
      context={context}
      emptyComponent={customEmptyComponent}
      collectionName={wrongCollection}
      actions={cardsActions}
    />;
  })
  .add('With pageSize (3)', () => {
    return <CardList
      context={context}
      collectionName={collectionName}
      actions={cardsActions}
      pageSize={3}
    />;
  })
  .add('With Card Width and Height', () => {
    return <CardList
      context={context}
      collectionName={collectionName}
      cardWidth={200}
      cardHeight={100}
      actions={cardsActions}
      pageSize={3}
    />;
  })
  .add('With infinite scroll', () => {
    return <div style={{display: 'inline-block'}}>
      <CardList
        context={context}
        collectionName={collectionName}
        actions={cardsActions}
        pageSize={10}
        height={500}
      />
    </div>;
  })
  .add('With infinite scroll with small cards', () => {
    return <div style={{display: 'inline-block', width: '300px', background: 'white', border: '2px solid'}}>
      <CardList
        context={context}
        collectionName={collectionName}
        actions={cardsActions}
        cardType={'small'}
        pageSize={20}
        height={500}
      />
    </div>;
  })
  .add('With infinite scroll and card width', () => {
    return <CardList
      context={context}
      collectionName={collectionName}
      cardWidth={200}
      cardHeight={100}
      actions={cardsActions}
      pageSize={10}
      height={500}
    />;
  });
