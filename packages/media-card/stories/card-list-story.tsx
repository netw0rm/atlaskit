import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, ContextFactory, ListCardDelete, ListCardClick } from '@atlaskit/media-core';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers';
import { CardList } from '../src';

const collectionName = 'MediaServicesSample';
const wrongCollection = 'adfasdf';
const clientId = '5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
const wrongClientId = 'wrong-client-id';
const serviceHost = 'https://dt-api-filestore.internal.app.dev.atlassian.io';
const tokenProvider = StoryBookTokenProvider.tokenProvider;

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
const context = ContextFactory.create({ clientId, serviceHost, tokenProvider });
const wrongContext = ContextFactory.create({ clientId: wrongClientId, serviceHost, tokenProvider });

const styles = {
  statesWrapper: {
    listStyle: 'none',
    display: 'inline-block'
  },
  stateTitle: {
    textAlign: 'center',
    padding: '5px'
  },
  li: {
    float: 'left',
    marginLeft: '5px'
  }
};

storiesOf('CardList', {})
  .add('Normal cards', () => (
    <CardList
      context={context}
      collectionName={collectionName}
      actions={[clickAction]}
    />
  ))
  .add('Caching', () => (
    <ul style={styles.statesWrapper}>
      <li style={styles.li}>
        <div style={styles.stateTitle}>Normal card</div>
        <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
          cardType={'small'}
        />
      </li>
      <li style={styles.li}>
        <div style={styles.stateTitle}>Small card</div>
        <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
          cardType={'small'}
        />
      </li>
      <li style={styles.li}>
        <div style={styles.stateTitle}>Small card</div>
        <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
          cardType={'small'}
        />
      </li>
      <li style={styles.li}>
        <div style={styles.stateTitle}>Small card</div>
        <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
        />
      </li>
      <li style={styles.li}>
        <div style={styles.stateTitle}>Small card</div>
        <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
        />
      </li>
      <li style={styles.li}>
        <div style={styles.stateTitle}>Small card</div>
        <CardList
          context={context}
          collectionName={collectionName}
          actions={[clickAction]}
          pageSize={30}
        />
      </li>
    </ul>
  ))
  .add('Small cards', () => (
    <CardList
      context={context}
      collectionName={collectionName}
      actions={[clickAction]}
      cardType={'small'}
    />
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
    return <CardList
      context={context}
      collectionName={collectionName}
      actions={cardsActions}
      pageSize={10}
      height={500}
    />;
  })
  .add('With infinite scroll with small cards', () => {
    return <CardList
      context={context}
      collectionName={collectionName}
      actions={cardsActions}
      cardType={'small'}
      pageSize={20}
      height={500}
    />;
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
