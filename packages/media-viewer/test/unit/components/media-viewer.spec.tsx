import * as React from 'react';
import { mount } from 'enzyme';
import { MediaItemType } from '@atlaskit/media-core';
import { MediaViewer } from '../../../src/components/media-viewer';
import { Stubs } from '../_stubs';

describe('<MediaViewer />', () => {
  const token = 'some-token';
  const clientId = 'some-client-id';
  const serviceHost = 'some-service-host';
  const authProvider = jest.fn(() => Promise.resolve({token, clientId}));
  const contextConfig = {
    serviceHost,
    authProvider
  };
  const occurrenceKey = 'some-occurence-key';
  const id = 'some-media-id';
  const collectionName = 'some-collection';
  const basePath = 'some-base-path';
  const selectedItem = {
    id,
    occurrenceKey,
    type: 'file' as MediaItemType
  };
  const list = [
    {
      id: 'some-id',
      occurrenceKey: 'some-occurrence-key',
      type: 'file' as MediaItemType
    },
    {
      id: 'some-id-2',
      occurrenceKey: 'some-occurrence-key-2',
      type: 'file' as MediaItemType
    },
    {
      id: 'some-id-3',
      occurrenceKey: 'some-occurrence-key-3',
      type: 'file' as MediaItemType
    }
  ];
  const collectionDataSource = { collectionName };
  const listDataSource = { list };

  describe('with collection data source', () => {
    it('should get the correct collection provider', () => {
      const context = Stubs.context(contextConfig);
      mount(
        <MediaViewer
          context={context as any}
          selectedItem={selectedItem}
          dataSource={collectionDataSource}
          collectionName={collectionName}
          MediaViewer={Stubs.mediaViewerConstructor() as any}
          basePath={basePath}
        />);
      expect(context.getMediaCollectionProvider).toHaveBeenCalledTimes(1);
      expect(context.getMediaCollectionProvider).toHaveBeenCalledWith(collectionName, 10);

      expect(context.getMediaItemProvider).not.toHaveBeenCalled();
    });
  });

  describe('with media list data source', () => {
    it('should get the correct collection provider', () => {
      const context = Stubs.context(contextConfig);
      mount(
        <MediaViewer
          context={context as any}
          selectedItem={selectedItem}
          dataSource={listDataSource}
          collectionName={collectionName}
          MediaViewer={Stubs.mediaViewerConstructor() as any}
          basePath={basePath}
        />);
      expect(context.getMediaItemProvider).toHaveBeenCalledTimes(3);
      expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id', 'file', 'some-collection');
      expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id-2', 'file', 'some-collection');
      expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id-3', 'file', 'some-collection');

      expect(context.getMediaCollectionProvider).not.toHaveBeenCalled();
    });
  });
});
