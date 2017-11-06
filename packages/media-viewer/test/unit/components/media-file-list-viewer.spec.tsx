import * as React from 'react';
import { shallow, mount} from 'enzyme';
import { MediaItemType } from '@atlaskit/media-core';
import {
  MediaFileListViewer
} from '../../../src/components/media-file-list-viewer';
import { Stubs } from '../_stubs';

describe('<MediaFileListViewer />', () => {
  const token = 'some-token';
  const clientId = 'some-client-id';
  const serviceHost = 'some-service-host';
  const authProvider = jest.fn(() => Promise.resolve({token, clientId}));
  const contextConfig = {
    serviceHost,
    authProvider
  };
  const collectionName = 'some-collection';
  const basePath = 'some-base-path';
  const selectedItem = {
    id: 'some-id',
    occurrenceKey: 'some-occurrence-key',
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

  it('should construct a media viewer instance with default config', () => {
    const mediaViewerConstructor = Stubs.mediaViewerConstructor();

    shallow(
      <MediaFileListViewer
        selectedItem={selectedItem}
        list={[selectedItem]}
        context={Stubs.context(contextConfig) as any}
        collectionName={collectionName}
        MediaViewer={mediaViewerConstructor as any}
        basePath={basePath}
      />);

    expect(mediaViewerConstructor).toHaveBeenCalledTimes(1);
    let firstCall = mediaViewerConstructor.mock.calls[0];
    let firstArg = firstCall[0];
    expect(firstArg.assets).toEqual({ basePath });
    expect(firstArg.enableMiniMode).toBe(undefined);
    expect(typeof firstArg.fetchToken).toBe('function');
  });

  it('should construct a media viewer instance with custom config', () => {
    const mediaViewerConstructor = Stubs.mediaViewerConstructor();
    const additionalConfiguration = { enableMiniMode: true };

    shallow(
      <MediaFileListViewer
        selectedItem={selectedItem}
        list={[selectedItem]}
        context={Stubs.context(contextConfig) as any}
        collectionName={collectionName}
        mediaViewerConfiguration={additionalConfiguration}
        MediaViewer={mediaViewerConstructor as any}
        basePath={basePath}
      />);

    expect(mediaViewerConstructor).toHaveBeenCalledTimes(1);
    let firstCall = mediaViewerConstructor.mock.calls[0];
    let firstArg = firstCall[0];
    expect(firstArg.assets).toEqual({ basePath });
    expect(firstArg.enableMiniMode).toBe(true);
    expect(typeof firstArg.fetchToken).toBe('function');
  });

  it('should construct a media viewer with no collectionName provided', () => {
    const context = Stubs.context(contextConfig) as any;
    const mediaViewerConstructor = Stubs.mediaViewerConstructor();
    const additionalConfiguration = { enableMiniMode: true };
    mount(
      <MediaFileListViewer
        selectedItem={selectedItem}
        list={list}
        context={context}
        mediaViewerConfiguration={additionalConfiguration}
        MediaViewer={mediaViewerConstructor as any}
        basePath={basePath}
      />);
    expect(context.getMediaItemProvider).toHaveBeenCalledTimes(3);
    expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id', 'file', undefined);
    expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id-2', 'file', undefined);
    expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id-3', 'file', undefined);
  });

  it('should construct a media viewer with a collectionName', () => {
    const context = Stubs.context(contextConfig) as any;
    const mediaViewerConstructor = Stubs.mediaViewerConstructor();
    const additionalConfiguration = { enableMiniMode: true };
    mount(
      <MediaFileListViewer
        selectedItem={selectedItem}
        list={list}
        context={context}
        collectionName={collectionName}
        mediaViewerConfiguration={additionalConfiguration}
        MediaViewer={mediaViewerConstructor as any}
        basePath={basePath}
      />);
    expect(context.getMediaItemProvider).toHaveBeenCalledTimes(3);
    expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id', 'file', 'some-collection');
    expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id-2', 'file', 'some-collection');
    expect(context.getMediaItemProvider).toHaveBeenCalledWith('some-id-3', 'file', 'some-collection');
  });
});
