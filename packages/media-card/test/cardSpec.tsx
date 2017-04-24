import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { fakeContext } from '@atlaskit/media-test-helpers';

import { Card, UrlPreviewIdentifier, MediaIdentifier } from '../src';
import { MediaCard } from '../src/mediaCard';

describe('Card', function() {
  it('should render media card with UrlPreviewProvider when passed a UrlPreviewIdentifier', function() {
    const dummyUrl = 'http://some.url.com';
    const mediaItemType = 'link';

    const identifier: UrlPreviewIdentifier = {
      url: dummyUrl,
      mediaItemType
    };

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getUrlPreviewProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={context} identifier={identifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getUrlPreviewProvider.calledOnce).to.be.true;
    expect(context.getUrlPreviewProvider.calledWithExactly(dummyUrl)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });

  it('should render media card with MediaItemProvider when passed a MediaIdentifier with mediaItemType "link"', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'link',
      collectionName: 'some-collection-name'
    };

    const {id, mediaItemType, collectionName} = identifier;

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getMediaItemProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={context} identifier={identifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getMediaItemProvider.calledOnce).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });

  it('should render media card with MediaItemProvider when passed a MediaIdentifier with mediaItemType "file"', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const {id, mediaItemType, collectionName} = identifier;

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getMediaItemProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={context} identifier={identifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getMediaItemProvider.calledOnce).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });

  it('should render media card with a new MediaItemProvider when the context changes', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const dummyProvider = 'second provider';

    const firstContext = fakeContext({
      getMediaItemProvider: 'first provider'
    });

    const secondContext = fakeContext({
      getMediaItemProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={firstContext} identifier={identifier} />);
    card.setProps({context: secondContext, identifier});
    const mediaCard = card.find(MediaCard);

    const {id, mediaItemType, collectionName} = identifier;
    expect(secondContext.getMediaItemProvider.calledOnce).to.be.true;
    expect(secondContext.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.equal(dummyProvider);
  });

  it('should render media card with a new MediaItemProvider when the identifier changes', function() {
    const firstIdentifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const secondIdentifier: MediaIdentifier = {
      id: 'some-other-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getMediaItemProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={context} identifier={firstIdentifier} />);
    card.setProps({context, identifier: secondIdentifier});
    const mediaCard = card.find(MediaCard);

    const {id, mediaItemType, collectionName} = secondIdentifier;
    expect(context.getMediaItemProvider.calledTwice).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.equal(dummyProvider);
  });

});
