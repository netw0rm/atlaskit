import * as React from 'react';
import { Observable } from 'rxjs';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mount, ReactWrapper } from 'enzyme';
import { ContextFactory, Context } from '@atlaskit/media-core';
import { waitUntil, fakeContextFrom } from '@atlaskit/media-test-helpers';

import { Card, CardProps, CardState, CardOverlay } from '../../src';

describe('Card', () => {
  const waitUntilCardIsLoaded = (card: ReactWrapper<CardProps, CardState>) => {
    return waitUntil(() => !card.state<boolean>('loading'));
  };
  const tokenProvider = (collection: string) => Promise.resolve('some-jwt-token');
  const toDataUri = (data: string) => {
    return 'data:;base64,' + btoa(data);
  };
  // TODO: Use fakeContextFrom here
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

  const fakeMediaItemProvider = {
    observable() {
      return Observable.of(fakeMediaItem);
    }
  };

  const fakeDataUriService = {
    fetchImageDataUri() {
      return Promise.resolve(toDataUri('some-image'));
    }
  };

  const fakeContext: Context = {
    getMediaItemProvider: sinon.stub().returns(fakeMediaItemProvider),
    getDataUriService: sinon.stub().returns(fakeDataUriService),
    getMediaCollectionProvider: sinon.spy(),
    getUrlPreviewProvider: sinon.spy()
  };

  it('should display an image when loaded', function() {
    const card = mount<CardProps, CardState>(
      <Card
        context={fakeContext}
        id={'some-image'}
        mediaItemType={'file'}
      />
    );

    expect(card.find('.media-card').length).to.eql(0);

    return waitUntilCardIsLoaded(card).then(() => {
      expect(card.find('.media-card').first().props().style.backgroundImage).to.contain(toDataUri('some-image'));
    });
  });

  it('should display a spinner while loading', () => {
    const context = ContextFactory.create({
      clientId: 'some-client',
      serviceHost: 'some-service',
      tokenProvider
    });
    const component = mount<CardProps, CardState>(
      <Card
        context={context}
        id={'some-image'}
        mediaItemType={'file'}
      />);

    expect(component.state<boolean>('loading')).to.eql(true);
    expect(component.find('FileIcon').first().props().label).to.eql('loading');
  });

  it('should not display error fallback for gif images if there is no preview image', () => {
    const context = fakeContextFrom({
      getMediaItemProvider: {
        type: 'file',
        details: {
          mimeType: 'image/gif',
          name: 'some-image.jpg',
          processingStatus: 'succeeded'
        }
      }
    });
    context.getDataUriService = () => ({
      fetchOriginalDataUri(mediaItem) {
        expect(mediaItem.details.name).to.equal('some-image.jpg');
        return Promise.reject();
      }
    });

    const card = mount(
      <Card context={context} id={'some-image'} mediaItemType={'file'} />
    );

    waitUntilCardIsLoaded(card).then(() => {
      expect(card.find(CardOverlay).first().props().mediaName).to.equal('some-image.jpg');
    });
  });
});
