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
    });

    const card = shallow(<Card context={context} identifier={identifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getUrlPreviewProvider.calledOnce).to.be.true;
    expect(context.getUrlPreviewProvider.calledWithExactly(dummyUrl)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().type).to.deep.equal(mediaItemType);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });

  it('should load render media card with MediaItemProvider when passed a MediaIdentifier with mediaItemType "link"', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'link',
      collectionName: 'some-collection-name'
    };

    const {id, mediaItemType, collectionName} = identifier;

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getMediaItemProvider: dummyProvider
    });

    const card = shallow(<Card context={context} identifier={identifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getMediaItemProvider.calledOnce).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().type).to.deep.equal(mediaItemType);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });

  it('should load render media card with MediaItemProvider when passed a MediaIdentifier with mediaItemType "file"', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const {id, mediaItemType, collectionName} = identifier;

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getMediaItemProvider: dummyProvider
    });

    const card = shallow(<Card context={context} identifier={identifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getMediaItemProvider.calledOnce).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().type).to.deep.equal(mediaItemType);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });
});
