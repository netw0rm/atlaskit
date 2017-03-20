import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, CardDelete, CardClick } from '@atlaskit/media-core';
import { StoryList, createStorybookContext, defaultCollectionName } from '@atlaskit/media-test-helpers';
import { Card } from '../../src';

const collectionName = defaultCollectionName;
const wrongFileId = 'wrong-file-id';
const thumbnailNotAvailableId = '64204867-bfa6-4e16-a163-a6477d0f0112';
const successfulFileId = '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40';
const context = createStorybookContext();

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

storiesOf('Card', {})
  .add('single card', () => (
    <StoryList>
      {[{
        title: 'Normal card',
        content: <Card
          id={successfulFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
        />
      }, {
        title: 'Small card',
        content: <Card
          id={successfulFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          type={'small'}
        />
      }]}
    </StoryList>
  ))
  .add('thumbnail not available', () => (
    <StoryList>
      {[{
        title: 'Normal card',
        content: <Card
          id={thumbnailNotAvailableId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
        />
      }, {
        title: 'Small card',
        content: <Card
          id={thumbnailNotAvailableId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          type={'small'}
        />
      }]}
    </StoryList>
  ))
  .add('selectable card', () => (
    <StoryList>
      {[{
        title: 'Not selected',
        content: <Card
          id={successfulFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          selectable={true}
          selected={false}
        />
      }, {
        title: 'Selected',
        content: <Card
          id={successfulFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          selectable={true}
          selected={true}
        />
      }]}
    </StoryList>
  ))
  .add('non recoverable error', () => (
    <StoryList>
      {[{
        title: 'Normal card',
        content: <Card
          id={wrongFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          selectable={true}
          selected={false}
        />
      }, {
        title: 'Small card',
        content: <Card
          id={wrongFileId}
          mediaItemType={'file'}
          collectionName={collectionName}
          context={context}
          selectable={true}
          selected={false}
          type={'small'}
          width={200}
        />
      }]}
    </StoryList>
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
