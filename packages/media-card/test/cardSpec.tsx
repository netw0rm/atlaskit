import * as React from 'react';
import { Observable } from 'rxjs';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Card, CardProps, CardState } from '../src/card/card';
import { mount, ReactWrapper } from 'enzyme';
import { waitUntil } from './utils';
import { ContextFactory, Context } from '@atlaskit/media-core';

describe('Card', () => {
  const waitUntilCardIsLoaded = (card: ReactWrapper<CardProps, CardState>) => {
    return waitUntil(() => !card.state<boolean>('loading'));
  };
  const tokenProvider = (collection: string) => Promise.resolve('some-jwt-token');
  const toDataUri = (data: string) => {
    return 'data:;base64,' + btoa(data);
  };

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

    expect(card.find('img').length).to.eql(0);

    return waitUntilCardIsLoaded(card).then(() => {
      expect(card.find('img').first().props().src).to.eql(toDataUri('some-image'));
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
});
