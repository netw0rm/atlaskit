/* tslint:disable */ //:no-unused-expressions
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { fakeContext } from '@atlaskit/media-test-helpers';

import { Card, UrlPreviewIdentifier, MediaIdentifier, CardEvent } from '../src';
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

  it('should fire onClick when passed in as a prop and MediaCard fires onClick', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const context = fakeContext() as any;
    const clickHandler = sinon.spy();

    const card = shallow(<Card context={context} identifier={identifier} onClick={clickHandler} />);
    const mediaCardOnClick = card.find(MediaCard).props().onClick;

    if (!mediaCardOnClick) {
      throw new Error('MediaCard onClick was undefined');
    }

    expect(clickHandler.called).to.be.false;

    mediaCardOnClick({} as any);
    expect(clickHandler.calledOnce).to.be.true;
  });

  it('should pass onMouseEnter to MediaCard', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const context = fakeContext() as any;
    const hoverHandler = (result: CardEvent) => {};
    const card = shallow(<Card context={context} identifier={identifier} onMouseEnter={hoverHandler} />);

    expect(card.find(MediaCard).props().onMouseEnter).to.deep.equal(hoverHandler);
  });

  it('should set selected state to false when selectable prop is falsey', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const context = fakeContext() as any;
    const card = shallow(<Card context={context} identifier={identifier} selected={true} />);
    expect(card.find(MediaCard).props().selected).to.be.false;
  });

  it('should initialise and render Card with correct selected state when seletable prop is true', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const context = fakeContext() as any;
    const card = shallow(<Card context={context} identifier={identifier} selectable={true} selected={true} />);
    expect(card.find(MediaCard).props().selected).to.be.true;
  });

  it('should update and render Cards selected state when a different selected state is passed in', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const context = fakeContext() as any;
    const card = shallow(<Card context={context} identifier={identifier} selectable={true} selected={true} />);
    expect(card.find(MediaCard).props().selected).to.be.true;

    card.setProps({selected: false});
    expect(card.find(MediaCard).props().selected).to.be.false;
  });

  it('should fire onSelectChange when Card is clicked and it is selectable', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const context = fakeContext() as any;

    const selectChangeHandler = sinon.spy();

    const card = shallow(<Card context={context} identifier={identifier} onSelectChange={selectChangeHandler} selectable={true} />);
    const mediaCardOnClick = card.find(MediaCard).props().onClick;

    if (!mediaCardOnClick) {
      throw new Error('MediaCard onClick was undefined');
    }

    mediaCardOnClick({} as any);
    expect(selectChangeHandler.calledOnce).to.be.true;
    expect(selectChangeHandler.firstCall.args[0].selected).to.be.true;

    mediaCardOnClick({} as any);
    expect(selectChangeHandler.calledTwice).to.be.true;
    expect(selectChangeHandler.secondCall.args[0].selected).to.be.false;
  });

  it('should NOT fire onSelectChange Card is clicked and it is NOT seletable', function() {
    const identifier: MediaIdentifier = {
      id: 'some-random-id',
      mediaItemType: 'file',
      collectionName: 'some-collection-name'
    };

    const context = fakeContext() as any;
    const selectChangeHandler = sinon.spy();

    const card = shallow(<Card context={context} identifier={identifier} onSelectChange={selectChangeHandler} />);
    const mediaCardOnClick = card.find(MediaCard).props().onClick;

    if (!mediaCardOnClick) {
      throw new Error('MediaCard onClick was undefined');
    }

    mediaCardOnClick({} as any);
    expect(selectChangeHandler.called).to.be.false;
  });
});
