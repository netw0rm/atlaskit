import * as React from 'react';
import { Observable } from 'rxjs';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mount, ReactWrapper } from 'enzyme';
import { ContextFactory, Context } from '@atlaskit/media-core';
import { waitUntil, fakeContext } from '@atlaskit/media-test-helpers';

import { FileCard, FileCardProps, FileCardState, CardOverlay } from '../../src';

describe('FileCard', () => {
  const waitUntilCardIsLoaded = (card: ReactWrapper<FileCardProps, FileCardState>) => {
    return waitUntil(() => !card.state<boolean>('loading'));
  };

  const tokenProvider = (collection: string) => Promise.resolve('some-jwt-token');

  const toDataUri = (data: string) => {
    return 'data:;base64,' + btoa(data);
  };

  it('should display an image when loaded', function() {
    const fakeMediaItem = {
        type: 'file',
        details: {
          id: 'some-image',
          mediaType: 'image',
          mimeType: 'image/jpeg',
          name: 'some-image.jpg',
          processingStatus: 'succeeded',
          size: 123456,
          artifacts: {}
        }
    };

    const context = fakeContext({
      getMediaItemProvider: {observable: () => Observable.of(fakeMediaItem)},
      getDataUriService: {
        fetchImageDataUri() {
          return Promise.resolve(toDataUri('some-image'));
        }
      }
    });

    const card = mount<FileCardProps, FileCardState>(
      <FileCard
        context={context}
        id={'some-image'}
      />
    );

    expect(card.find('.media-card').length).to.eql(0);

    return waitUntilCardIsLoaded(card).then(() => {
      expect(card.find('.media-card').first().props().style.backgroundImage).to.contain(toDataUri('some-image'));
      card.unmount();
    });
  });

  it('should display a spinner while loading', () => {
    const context = ContextFactory.create({
      clientId: 'some-client',
      serviceHost: 'some-service',
      tokenProvider
    });
    const component = mount<FileCardProps, FileCardState>(
      <FileCard
        context={context}
        id={'some-image'}
      />);

    expect(component.state<boolean>('loading')).to.eql(true);
    expect(component.find('FileIcon').first().props().label).to.eql('loading');
    component.unmount();
  });

  it('should not display error fallback for gif images if there is no preview image', () => {
    const fakeObservable = Observable.of({
        type: 'file',
        details: {
          mimeType: 'image/gif',
          name: 'some-image.jpg',
          processingStatus: 'succeeded'
        }
      });

    const context = fakeContext({
      getMediaItemProvider: {observable: () => fakeObservable},
      getDataUriService: {
        fetchOriginalDataUri(mediaItem) {
          expect(mediaItem.details.name).to.equal('some-image.jpg');
          return Promise.reject();
        }
      }
    });

    const card = mount<FileCardProps, FileCardState>(
      <FileCard context={context} id="some-image"/>
    );

    waitUntilCardIsLoaded(card).then(() => {
      expect(card.find(CardOverlay).first().props().mediaName).to.equal('some-image.jpg');
      card.unmount();
    });
  });
});
