import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, ContextFactory, CardDelete, CardClick } from '@atlaskit/media-core';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers';
import { Card } from '../src';

const collectionName = 'MediaServicesSample';
const wrongFileId = 'wrong-file-id';
const thumbnailNotAvailableId = '64204867-bfa6-4e16-a163-a6477d0f0112';
const successfulFileId = '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40';
const clientId = '5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
const serviceHost = 'https://dt-api-filestore.internal.app.dev.atlassian.io';
const tokenProvider = StoryBookTokenProvider.tokenProvider;
const context = ContextFactory.create({ clientId, serviceHost, tokenProvider });

const deleteAction = CardDelete((item: MediaItem, e?: Event) => {
  action('delete')(JSON.stringify(item), e);
});

const clickAction = CardClick((item: MediaItem, e?: Event) => {
  action('click')(JSON.stringify(item), e);
});

const annotateAction = {
  label: 'Annotate',
  handler: (item: MediaItem, e?: Event) => {
    action('annotate')(JSON.stringify(item));
  }
};

const styles = {
  statesWrapper: {
    listStyle: 'none',
    display: 'inline-block'
  },
  stateTitle: {
    textAlign: 'center',
    padding: '5px'
  }
};

storiesOf('Card with File', {})
  .add('single card', () => (
    <ul style={styles.statesWrapper}>
      <li>
        <div style={styles.stateTitle}>Normal card</div>
        <Card
          id={successfulFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
        />
      </li>
      <li>
        <div style={styles.stateTitle}>Small card</div>
        <Card
          id={successfulFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          type={'small'}
        />
      </li>
    </ul>
  ))
  .add('thumbnail not available', () => (
    <ul style={styles.statesWrapper}>
      <li>
        <div style={styles.stateTitle}>Normal card</div>
        <Card
          id={thumbnailNotAvailableId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
        />
      </li>
      <li>
        <div style={styles.stateTitle}>Small card</div>
        <Card
          id={thumbnailNotAvailableId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          type={'small'}
        />
      </li>
    </ul>
  ))
  .add('selectable card', () => (
    <ul style={styles.statesWrapper}>
      <li>
        <div style={styles.stateTitle}>Not selected</div>
        <Card
          id={successfulFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          selectable={true}
          selected={false}
        />
      </li>
      <li>
        <div style={styles.stateTitle}>Selected</div>
        <Card
          id={successfulFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          selectable={true}
          selected={true}
        />
      </li>
    </ul>
  ))
  .add('non recoverable error', () => (
    <ul style={styles.statesWrapper}>
      <li>
        <div style={styles.stateTitle}>Normal card</div>
        <Card
          id={wrongFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          selectable={true}
          selected={false}
        />
      </li>
      <li>
        <div style={styles.stateTitle}>Small card</div>
        <Card
          id={wrongFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          selectable={true}
          selected={false}
          type={'small'}
          width={200}
        />
      </li>
    </ul>
  ))
  .add('multiple cards, same id and context', () => (
    <table>
      <tbody>
        <tr>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
          <td>
            <Card
              id={successfulFileId}
              mediaItemType={'file'}
              collectionName={collectionName}
              context={context}
              actions={[clickAction, deleteAction, annotateAction]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  ));
