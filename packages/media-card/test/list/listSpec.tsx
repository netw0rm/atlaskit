/* tslint:disable:no-unused-expression */
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {shallow, mount} from 'enzyme';

import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';

import {fakeContext} from '@atlaskit/media-test-helpers';
import {MediaCollectionFileItem, FileDetails} from '@atlaskit/media-core';

import {CardList, CardListProps, CardListState} from '../../src/list';
import {MediaCard} from '../../src/mediaCard';
import {InfiniteScroll} from '../../src/list/infiniteScroll';

describe('CardList', () => {
  it('should create a MediaItemProvider for each MediaItem in the collection', () => {
    const collectionName = 'MyMedia';

    const expectedMediaItems = [
      {
        type: 'link',
        details: {
          id: 'abcd',
          type: 'link'
        }
      },
      {
        type: 'file',
        details: {
          id: 'efgh',
          type: 'file'
        }
      }
    ];

    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.of({
            items: expectedMediaItems,
            nextInclusiveStartKey: 'xyz'
          });
        }
      },
      getMediaItemProvider: {
        observable() {
          return Observable.of(expectedMediaItems[0]);
        }
      }
    }) as any;

    mount(<CardList context={context} collectionName={collectionName}/>);

    expect(context.getMediaCollectionProvider.callCount).to.be.equal(1);
    expect(context.getMediaItemProvider.callCount).to.be.equal(expectedMediaItems.length);
    expect(context.getMediaItemProvider.calledWithExactly(expectedMediaItems[0].details.id, expectedMediaItems[0].type, collectionName, expectedMediaItems[0])).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(expectedMediaItems[1].details.id, expectedMediaItems[1].type, collectionName, expectedMediaItems[1])).to.be.true;
  });

  it('should pass a provider to MediaCard', () => {
    const collectionName = 'MyMedia';

    const expectedMediaItems = [
      {
        type: 'link',
        details: {
          id: 'abcd',
          type: 'link'
        }
      },
      {
        type: 'file',
        details: {
          id: 'efgh',
          type: 'file'
        }
      }
    ];

    const expectedMediaItemProvider = {
      observable() {
        return Observable.of(expectedMediaItems[0]);
      }
    };

    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.of({
            items: expectedMediaItems,
            nextInclusiveStartKey: 'xyz'
          });
        }
      },
      getMediaItemProvider: expectedMediaItemProvider
    });

    const card = mount(<CardList context={context} collectionName={collectionName}/>);

    // re-render now that we've subscribed (relying on the stubbed provider being synchronous)
    card.update();

    card.find(MediaCard).forEach(mediaCard => expect(mediaCard.prop('provider')).to.be.equal(expectedMediaItemProvider));
  });

  it('should be loading=true when mounted', () => {
    const context = fakeContext();
    const collectionName = 'MyMedia';
    const card = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>);
    expect(card.state().loading).to.be.true;
  });

  it('should be loading=false when we start loading the next page', () => {
    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.create(observer => {
            observer.next({
              items: [],
              nextInclusiveStartKey: 'xyz'
            });
          });
        }
      }
    });
    const collectionName = 'MyMedia';
    const card = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
    card.setState({loading: false, loadNextPage: sinon.spy()});
    card.instance().loadNextPage();
    expect(card.state().loading).to.be.false;
  });

  it('should fire onCardClick handler with updated MediaItemDetails when a Card in the list is clicked', () => {
    const oldItem: MediaCollectionFileItem = {
      type: 'file',
      details: {
        id: 'some-file/link-id',
        occurrenceKey: 'some-occurrence-key',
        processingStatus: 'pending'
      }
    };

    const newItemDetails: FileDetails = {
      processingStatus: 'succeeded'
    };

    const newItem: MediaCollectionFileItem = {
      type: 'file',
      details: {
        ...oldItem.details,
        ...newItemDetails
      }
    };

    const collection = {items: [oldItem, oldItem, oldItem], nextInclusiveStartKey: 'xyz'};

    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.create(observer => {
            observer.next(collection);
          });
        }
      },
      getMediaItemProvider: {
        observable() {
          return Observable.create(observer => {
            observer.next(newItemDetails);
          });
        }
      }
    });

    const collectionName = 'MyMedia';

    const onCardClickHandler = sinon.spy();

    const wrapper = mount<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName} onCardClick={onCardClickHandler} />) as any;
    wrapper.setState({loading: false, error: undefined, collection});
    wrapper.find(MediaCard).first().simulate('click');

    expect(onCardClickHandler.calledOnce).to.be.true;
    expect(onCardClickHandler.firstCall.args[0].mediaCollectionItem).to.deep.equal(newItem);
    expect(onCardClickHandler.firstCall.args[0].collectionName).to.deep.equal(collectionName);
  });

  describe('.render()', () => {
    it('should render the loading view when the list is loading', () => {
      const context = fakeContext();
      const collectionName = 'MyMedia';
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
      list.setState({loading: true});
      expect(list.children().text()).to.contain('loading...');
    });

    it('should render the empty view when the list is not loading and the error is an axios response with a status of 404', () => {
      const context = fakeContext();
      const collectionName = 'MyMedia';
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
      list.setState({loading: false, error: {response: {status: 404}}});
      expect(list.children().text()).to.contain('No items');
    });

    it('should render the error view when the the list is not loading and the error is not an axios response with a status of 404', () => {
      const context = fakeContext();
      const collectionName = 'MyMedia';
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
      list.setState({loading: false, error: new Error()});
      expect(list.children().text()).to.contain('ERROR');
    });

    // TODO: when would this even occur? loading=true is set when the collection is set! and error=xyz is set when the collection is undefined
    it('should render the loading view when the the list is not loading, there is no error and the collection has not been retrieved', () => {
      const context = fakeContext();
      const collectionName = 'MyMedia';
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
      list.setState({loading: false, error: undefined, collection: undefined});
      expect(list.children().text()).to.contain('loading...');
    });

    it('should render wrapped in an <InfiniteScroll> when useInfiniteScroll=true', () => {
      const context = fakeContext();
      const collectionName = 'MyMedia';
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName} useInfiniteScroll={true}/>) as any;
      list.setState({loading: false, error: undefined, collection: {items: []}});
      expect(list.is(InfiniteScroll)).to.be.true;
    });

    it('should not render wrapped in an <InfiniteScroll> when useInfiniteScroll=false', () => {
      const context = fakeContext();
      const collectionName = 'MyMedia';
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName} useInfiniteScroll={false}/>) as any;
      list.setState({loading: false, error: undefined, collection: {items: []}});
      expect(list.is(InfiniteScroll)).to.be.false;
    });
  });
});
