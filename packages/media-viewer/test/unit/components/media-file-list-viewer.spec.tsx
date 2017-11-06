import * as React from 'react';
import { shallow } from 'enzyme';
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

  it('should construct a media viewer instance with default config', () => {
    const mediaViewerConstructor = Stubs.mediaViewerConstructor();

    shallow(
      <MediaFileListViewer
        selectedItem={selectedItem}
        surroundingItems={[selectedItem]}
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
    const additionalConfiguration = {
      enableMiniMode: true
    };

    shallow(
      <MediaFileListViewer
        selectedItem={selectedItem}
        surroundingItems={[selectedItem]}
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
});
